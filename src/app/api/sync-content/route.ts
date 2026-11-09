import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { checkRequestToken } from '@/lib/api-auth';
import {
  ARTICLE_CATALOG,
  SUPPORTED_CONTENT_LANGUAGES,
  type ContentLanguage,
} from '@/content/articles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

/**
 * POST /api/sync-content
 *
 * Synchronises the TypeScript article catalog (ARTICLE_CATALOG) into the
 * configured MongoDB collection.  This is the recommended way to push
 * improved translations that live in the codebase to the production
 * database after a deployment.
 *
 * Protection: requires `CONTENT_HEALTH_TOKEN` in the `Authorization: Bearer`
 * header (or the legacy `x-health-token` header). Query-string tokens are not
 * accepted because they leak into logs and browser history.
 * If the env-var is unset, the endpoint fails closed with 503.
 *
 * Query params:
 *   ?dryRun=true  – validate without writing (default: false)
 *   ?locale=es    – sync only one locale (default: all)
 *   ?slug=...     – sync only one article (default: all)
 */
export async function POST(request: Request) {
  // ── Auth (fail closed) ────────────────────────────────────────────
  const auth = checkRequestToken(request, process.env.CONTENT_HEALTH_TOKEN);
  if (auth === 'not-configured') {
    return NextResponse.json(
      { error: 'CONTENT_HEALTH_TOKEN is not configured' },
      { status: 503 },
    );
  }
  if (auth !== 'authorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse options ─────────────────────────────────────────────────
  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === 'true';
  const filterLocale = url.searchParams.get('locale') || null;
  const filterSlug = url.searchParams.get('slug') || null;

  // ── Check MongoDB availability ────────────────────────────────────
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    return NextResponse.json(
      {
        ok: false,
        error: 'MONGODB_URI is not configured. Cannot sync.',
      },
      { status: 503 },
    );
  }

  const dbName = process.env.MONGODB_DB_NAME || 'generatepassword';
  const collectionName = process.env.MONGODB_COLLECTION || 'content_guides';
  let client: { close: () => Promise<void> } | null = null;

  try {
    // ── Connect to MongoDB ────────────────────────────────────────────
    const nodeRequire = eval('require') as NodeRequire;
    const { MongoClient } = nodeRequire('mongodb') as {
      MongoClient: new (
        uri: string,
        options?: { serverSelectionTimeoutMS?: number },
      ) => {
        connect: () => Promise<void>;
        close: () => Promise<void>;
        db: (name: string) => {
          collection: (name: string) => {
            updateOne: (
              filter: Record<string, unknown>,
              update: Record<string, unknown>,
              options?: { upsert?: boolean },
            ) => Promise<{ upsertedCount: number; modifiedCount: number; matchedCount: number }>;
            createIndex: (
              spec: Record<string, number>,
              options?: { unique?: boolean },
            ) => Promise<string>;
          };
        };
      };
    };

    const mongoClient = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10_000,
    });
    client = mongoClient;
    await mongoClient.connect();

    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    // Ensure indexes exist
    await collection.createIndex({ slug: 1, locale: 1 }, { unique: true });
    await collection.createIndex({ locale: 1, updatedAt: -1 });

    // ── Build records from TS catalog ─────────────────────────────────
    const articles = filterSlug
      ? ARTICLE_CATALOG.filter((a) => a.slug === filterSlug)
      : ARTICLE_CATALOG;

    const locales = filterLocale
      ? [filterLocale as ContentLanguage]
      : [...SUPPORTED_CONTENT_LANGUAGES];

    let upserted = 0;
    let modified = 0;
    let skipped = 0;
    const errors: Array<{ slug: string; locale: string; error: string }> = [];

    for (const article of articles) {
      for (const locale of locales) {
        const content = article.content[locale];
        if (!content) {
          skipped++;
          continue;
        }

        const doc = {
          slug: article.slug,
          locale,
          image: `/images/guides/${article.slug}.webp`,
          category: article.category,
          author: article.author,
          updatedAt: new Date(article.updatedAt),
          title: content.title,
          excerpt: content.excerpt,
          seoTitle: content.seoTitle,
          seoDescription: content.seoDescription,
          keywords: content.keywords,
          sections: content.sections.map((s) => ({
            heading: s.heading,
            paragraphs: s.paragraphs,
            bullets: s.bullets || [],
          })),
        };

        if (dryRun) {
          upserted++;
          continue;
        }

        try {
          const result = await collection.updateOne(
            { slug: doc.slug, locale: doc.locale },
            {
              $set: { ...doc, touchedAt: new Date() },
              $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true },
          );

          if (result.upsertedCount) upserted++;
          else if (result.modifiedCount) modified++;
        } catch (err) {
          errors.push({
            slug: article.slug,
            locale,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    // ── Bust ISR cache so pages serve fresh content immediately ────
    if (!dryRun && (upserted > 0 || modified > 0)) {
      for (const locale of locales) {
        revalidatePath(`/${locale}/guides`, 'page');
        for (const article of articles) {
          revalidatePath(`/${locale}/guides/${article.slug}`, 'page');
        }
      }
      revalidateTag('guides', 'max');
    }

    return NextResponse.json(
      {
        ok: true,
        dryRun,
        timestamp: new Date().toISOString(),
        source: 'ARTICLE_CATALOG (TypeScript)',
        cacheRevalidated: !dryRun && (upserted > 0 || modified > 0),
        summary: {
          totalArticles: articles.length,
          totalLocales: locales.length,
          expectedRecords: articles.length * locales.length,
          upserted,
          modified,
          skipped,
          errors: errors.length,
        },
        ...(errors.length > 0 ? { errors } : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  } finally {
    if (client) {
      try {
        await client.close();
      } catch {
        // The sync result is more useful than a close error; do not mask it.
      }
    }
  }
}

/**
 * GET /api/sync-content?locale=ja&slug=how-to-create-strong-passwords
 *
 * Diagnostic endpoint: returns the raw content from the bundled
 * ARTICLE_CATALOG without writing anything. Useful for checking
 * whether CJK content survives the Vercel build/minification step.
 */
export async function GET(request: Request) {
  // ── Auth (fail closed, header only) ──────────────────────────────
  const auth = checkRequestToken(request, process.env.CONTENT_HEALTH_TOKEN);
  if (auth === 'not-configured') {
    return NextResponse.json(
      { error: 'CONTENT_HEALTH_TOKEN is not configured' },
      { status: 503 },
    );
  }
  if (auth !== 'authorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const locale = (url.searchParams.get('locale') || 'ja') as ContentLanguage;
  const slug = url.searchParams.get('slug') || 'how-to-create-strong-passwords';

  const article = ARTICLE_CATALOG.find((a) => a.slug === slug);
  if (!article) {
    return NextResponse.json({ error: `Article "${slug}" not found` }, { status: 404 });
  }

  const content = article.content[locale];
  if (!content) {
    return NextResponse.json(
      { error: `No content for locale "${locale}" in article "${slug}"` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    diagnostic: true,
    slug,
    locale,
    title: content.title,
    seoTitle: content.seoTitle,
    excerpt: content.excerpt,
    firstSectionHeading: content.sections[0]?.heading ?? null,
    titleLength: content.title.length,
    titleCodePoints: [...content.title].map((ch) => ch.codePointAt(0)?.toString(16)).join(' '),
  });
}
