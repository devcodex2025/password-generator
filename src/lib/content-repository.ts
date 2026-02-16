import { ARTICLE_CATALOG, ContentLanguage, getArticleBySlug, getLocalizedArticle } from '@/content/articles';
import { getMongoDb } from '@/lib/mongodb';
import { getPostgresPool } from '@/lib/postgres';

export interface GuideArticleDTO {
  slug: string;
  locale: string;
  image: string;
  category: string;
  readingMinutes: number;
  updatedAt: string;
  author: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export interface ContentRepository {
  listGuides(locale: string): Promise<GuideArticleDTO[]>;
  getGuide(slug: string, locale: string): Promise<GuideArticleDTO | null>;
}

function localeCandidates(locale: string): string[] {
  const normalized = (locale || 'en').toLowerCase();
  const candidates = [normalized];
  if (normalized === 'ua') candidates.push('uk');
  if (normalized === 'uk') candidates.push('ua');
  if (!candidates.includes('en')) candidates.push('en');
  return candidates;
}

function countWords(value: string): number {
  const tokens = value.match(/[\p{L}\p{N}]+/gu);
  return tokens ? tokens.length : 0;
}

function estimateReadingMinutes(input: {
  title: string;
  excerpt: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
}): number {
  const sectionText = input.sections
    .map((section) => {
      const bullets = section.bullets || [];
      return [section.heading, ...section.paragraphs, ...bullets].join(' ');
    })
    .join(' ');

  // Use body-first estimate to avoid inflated values from SEO/meta fields.
  const totalWords = countWords(sectionText || [input.title, input.excerpt].join(' '));
  const wordsPerMinute = 260;
  return Math.max(1, Math.round(totalWords / wordsPerMinute));
}

function normalizeUpdatedAt(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
}

class JsonContentRepository implements ContentRepository {
  async listGuides(locale: string): Promise<GuideArticleDTO[]> {
    return ARTICLE_CATALOG.map((article) => {
      const localized = getLocalizedArticle(article, locale as ContentLanguage);

      return {
        slug: article.slug,
        locale,
        image: `/images/guides/${article.slug}.webp`,
        category: article.category,
        readingMinutes: estimateReadingMinutes({
          title: localized.title,
          excerpt: localized.excerpt,
          sections: localized.sections,
        }),
        updatedAt: article.updatedAt,
        author: article.author,
        title: localized.title,
        excerpt: localized.excerpt,
        seoTitle: localized.seoTitle,
        seoDescription: localized.seoDescription,
        keywords: localized.keywords,
        sections: localized.sections,
      };
    });
  }

  async getGuide(slug: string, locale: string): Promise<GuideArticleDTO | null> {
    const article = getArticleBySlug(slug);
    if (!article) return null;

    const localized = getLocalizedArticle(article, locale as ContentLanguage);
    return {
      slug: article.slug,
      locale,
      image: `/images/guides/${article.slug}.webp`,
      category: article.category,
      readingMinutes: estimateReadingMinutes({
        title: localized.title,
        excerpt: localized.excerpt,
        sections: localized.sections,
      }),
      updatedAt: article.updatedAt,
      author: article.author,
      title: localized.title,
      excerpt: localized.excerpt,
      seoTitle: localized.seoTitle,
      seoDescription: localized.seoDescription,
      keywords: localized.keywords,
      sections: localized.sections,
    };
  }
}

class DatabaseContentRepository implements ContentRepository {
  private async queryList(locale: string) {
    const pool = getPostgresPool();

    return pool.query<{
      slug: string;
      category: string;
      reading_minutes: number;
      updated_at: string;
      author: string;
      title: string;
      excerpt: string;
      seo_title: string;
      seo_description: string;
      keywords: string[];
      sections_json: Array<{
        heading: string;
        paragraphs: string[];
        bullets: string[];
      }>;
    }>(
      `
      select
        a.slug,
        a.category,
        a.reading_minutes,
        a.updated_at::text as updated_at,
        a.author,
        l.title,
        l.excerpt,
        l.seo_title,
        l.seo_description,
        l.keywords,
        coalesce(
          (
            select json_agg(
              json_build_object(
                'heading', s.heading,
                'paragraphs', s.paragraphs,
                'bullets', s.bullets
              )
              order by s.sort_order
            )
            from content_article_sections s
            where s.article_locale_id = l.id
          ),
          '[]'::json
        ) as sections_json
      from content_articles a
      join content_article_locales l on l.article_id = a.id
      where l.locale = $1
      order by a.updated_at desc, a.id desc
      `,
      [locale],
    );
  }

  private async queryOne(slug: string, locale: string) {
    const pool = getPostgresPool();

    return pool.query<{
      slug: string;
      category: string;
      reading_minutes: number;
      updated_at: string;
      author: string;
      title: string;
      excerpt: string;
      seo_title: string;
      seo_description: string;
      keywords: string[];
      sections_json: Array<{
        heading: string;
        paragraphs: string[];
        bullets: string[];
      }>;
    }>(
      `
      select
        a.slug,
        a.category,
        a.reading_minutes,
        a.updated_at::text as updated_at,
        a.author,
        l.title,
        l.excerpt,
        l.seo_title,
        l.seo_description,
        l.keywords,
        coalesce(
          (
            select json_agg(
              json_build_object(
                'heading', s.heading,
                'paragraphs', s.paragraphs,
                'bullets', s.bullets
              )
              order by s.sort_order
            )
            from content_article_sections s
            where s.article_locale_id = l.id
          ),
          '[]'::json
        ) as sections_json
      from content_articles a
      join content_article_locales l on l.article_id = a.id
      where a.slug = $1 and l.locale = $2
      limit 1
      `,
      [slug, locale],
    );
  }

  async listGuides(locale: string): Promise<GuideArticleDTO[]> {
    let rows = { rows: [] as Awaited<ReturnType<DatabaseContentRepository['queryList']>>['rows'] };
    let effectiveLocale = locale;
    for (const candidate of localeCandidates(locale)) {
      rows = await this.queryList(candidate);
      if (rows.rows.length > 0) {
        effectiveLocale = candidate;
        break;
      }
    }

    return rows.rows.map((row) => ({
      slug: row.slug,
      locale: effectiveLocale,
      image: `/images/guides/${row.slug}.webp`,
      category: row.category,
      readingMinutes:
        estimateReadingMinutes({
          title: row.title,
          excerpt: row.excerpt,
          sections: row.sections_json || [],
        }) || row.reading_minutes,
      updatedAt: row.updated_at.slice(0, 10),
      author: row.author,
      title: row.title,
      excerpt: row.excerpt,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      keywords: row.keywords || [],
      sections: row.sections_json || [],
    }));
  }

  async getGuide(slug: string, locale: string): Promise<GuideArticleDTO | null> {
    let result = { rows: [] as Awaited<ReturnType<DatabaseContentRepository['queryOne']>>['rows'] };
    let effectiveLocale = locale;
    for (const candidate of localeCandidates(locale)) {
      result = await this.queryOne(slug, candidate);
      if (result.rows.length > 0) {
        effectiveLocale = candidate;
        break;
      }
    }

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    return {
      slug: row.slug,
      locale: effectiveLocale,
      image: `/images/guides/${row.slug}.webp`,
      category: row.category,
      readingMinutes:
        estimateReadingMinutes({
          title: row.title,
          excerpt: row.excerpt,
          sections: row.sections_json || [],
        }) || row.reading_minutes,
      updatedAt: row.updated_at.slice(0, 10),
      author: row.author,
      title: row.title,
      excerpt: row.excerpt,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      keywords: row.keywords || [],
      sections: row.sections_json || [],
    };
  }
}

type MongoGuideDocument = {
  slug: string;
  locale: string;
  image?: string;
  category?: string;
  readingMinutes?: number;
  updatedAt?: string | Date;
  author?: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  sections?: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

class MongoContentRepository implements ContentRepository {
  private collectionName = process.env.MONGODB_COLLECTION || 'content_guides';

  async listGuides(locale: string): Promise<GuideArticleDTO[]> {
    const db = await getMongoDb();
    let docs: MongoGuideDocument[] = [];
    let effectiveLocale = locale;
    for (const candidate of localeCandidates(locale)) {
      docs = await db
        .collection<MongoGuideDocument>(this.collectionName)
        .find({ locale: candidate })
        .sort({ updatedAt: -1 })
        .toArray();
      if (docs.length > 0) {
        effectiveLocale = candidate;
        break;
      }
    }

    return docs.map((doc) => {
      const sections = doc.sections || [];
      return {
        slug: doc.slug,
        locale: effectiveLocale,
        image: doc.image || `/images/guides/${doc.slug}.webp`,
        category: doc.category || 'security-basics',
        readingMinutes:
          doc.readingMinutes ||
          estimateReadingMinutes({
            title: doc.title,
            excerpt: doc.excerpt,
            sections,
          }),
        updatedAt: normalizeUpdatedAt(doc.updatedAt),
        author: doc.author || 'GeneratePasswordTo Editorial Team',
        title: doc.title,
        excerpt: doc.excerpt,
        seoTitle: doc.seoTitle,
        seoDescription: doc.seoDescription,
        keywords: doc.keywords || [],
        sections,
      };
    });
  }

  async getGuide(slug: string, locale: string): Promise<GuideArticleDTO | null> {
    const db = await getMongoDb();
    let doc: MongoGuideDocument | null = null;
    let effectiveLocale = locale;
    for (const candidate of localeCandidates(locale)) {
      doc = await db.collection<MongoGuideDocument>(this.collectionName).findOne({ slug, locale: candidate });
      if (doc) {
        effectiveLocale = candidate;
        break;
      }
    }
    if (!doc) {
      return null;
    }

    const sections = doc.sections || [];
    return {
      slug: doc.slug,
      locale: effectiveLocale,
      image: doc.image || `/images/guides/${doc.slug}.webp`,
      category: doc.category || 'security-basics',
      readingMinutes:
        doc.readingMinutes ||
        estimateReadingMinutes({
          title: doc.title,
          excerpt: doc.excerpt,
          sections,
        }),
      updatedAt: normalizeUpdatedAt(doc.updatedAt),
      author: doc.author || 'GeneratePasswordTo Editorial Team',
      title: doc.title,
      excerpt: doc.excerpt,
      seoTitle: doc.seoTitle,
      seoDescription: doc.seoDescription,
      keywords: doc.keywords || [],
      sections,
    };
  }
}

class SafeFallbackRepository implements ContentRepository {
  constructor(
    private readonly primary: ContentRepository,
    private readonly fallback: ContentRepository,
  ) {}

  async listGuides(locale: string): Promise<GuideArticleDTO[]> {
    try {
      return await this.primary.listGuides(locale);
    } catch (error) {
      console.error('[content] Primary provider failed in listGuides, using JSON fallback.', error);
      return this.fallback.listGuides(locale);
    }
  }

  async getGuide(slug: string, locale: string): Promise<GuideArticleDTO | null> {
    try {
      return await this.primary.getGuide(slug, locale);
    } catch (error) {
      console.error('[content] Primary provider failed in getGuide, using JSON fallback.', error);
      return this.fallback.getGuide(slug, locale);
    }
  }
}

function createContentRepository(): ContentRepository {
  const explicitSource = process.env.CONTENT_SOURCE?.toLowerCase();
  const autoDetectedSource = process.env.MONGODB_URI
    ? 'mongodb'
    : process.env.DATABASE_URL || process.env.SUPABASE_DB_URL
      ? 'database'
      : 'json';
  const source = explicitSource || autoDetectedSource;
  const jsonRepo = new JsonContentRepository();

  if (source === 'database') {
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL || process.env.SUPABASE_DB_URL);
    if (!hasDatabaseUrl) {
      console.warn(
        '[content] CONTENT_SOURCE=database but DATABASE_URL/SUPABASE_DB_URL is missing. Falling back to JSON.',
      );
      return jsonRepo;
    }
    return new SafeFallbackRepository(new DatabaseContentRepository(), jsonRepo);
  }
  if (source === 'mongodb' || source === 'mongo') {
    if (!process.env.MONGODB_URI) {
      console.warn('[content] CONTENT_SOURCE=mongodb but MONGODB_URI is missing. Falling back to JSON.');
      return jsonRepo;
    }
    return new SafeFallbackRepository(new MongoContentRepository(), jsonRepo);
  }
  return jsonRepo;
}

export const contentRepository: ContentRepository = createContentRepository();
