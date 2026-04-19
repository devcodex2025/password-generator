import { NextResponse } from 'next/server';
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
 * Protection: requires `CONTENT_HEALTH_TOKEN` as Bearer token or
 * `?token=` query param (same token used by /api/content-health).
 * If the env-var is unset, the endpoint is open (same policy as
 * content-health).
 *
 * Query params:
 *   ?dryRun=true  – validate without writing (default: false)
 *   ?locale=es    – sync only one locale (default: all)
 *   ?slug=...     – sync only one article (default: all)
 */
export async function POST(request: Request) {
  // ── Auth ──────────────────────────────────────────────────────────
  const token = process.env.CONTENT_HEALTH_TOKEN;
  if (token) {
    const url = new URL(request.url);
    const provided =
      url.searchParams.get('token') ??
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
      request.headers.get('x-health-token');
    if (provided !== token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
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

    const client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10_000,
    });
    await client.connect();

    const db = client.db(dbName);
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

    await client.close();

    return NextResponse.json(
      {
        ok: true,
        dryRun,
        timestamp: new Date().toISOString(),
        source: 'ARTICLE_CATALOG (TypeScript)',
        target: `mongodb://${dbName}.${collectionName}`,
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
  }
}
