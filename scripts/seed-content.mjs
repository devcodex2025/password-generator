import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Pool } = pg;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
}

function shouldUseSsl(connectionString) {
  if (process.env.DATABASE_SSL) {
    return process.env.DATABASE_SSL === 'true';
  }
  return connectionString.includes('supabase.co');
}

function readPayload(filePath) {
  const absolute = path.resolve(process.cwd(), filePath);
  const projectRoot = path.resolve(process.cwd());
  if (!absolute.startsWith(projectRoot + path.sep) && absolute !== projectRoot) {
    throw new Error(`File path must be inside the project directory: ${filePath}`);
  }
  const raw = fs.readFileSync(absolute, 'utf8');
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.items)) return parsed.items;

  throw new Error('Expected JSON array or object with "items" array.');
}

function normalizeArticle(item) {
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid record: item must be an object.');
  }

  const required = ['slug', 'locale', 'title', 'excerpt', 'seoTitle', 'seoDescription', 'sections'];
  for (const key of required) {
    if (!item[key]) {
      throw new Error(`Invalid record: missing "${key}" for slug "${item.slug || 'unknown'}".`);
    }
  }

  if (!Array.isArray(item.sections)) {
    throw new Error(`Invalid record: "sections" must be array for slug "${item.slug}".`);
  }

  return {
    slug: String(item.slug),
    locale: String(item.locale),
    category: item.category ? String(item.category) : 'Security',
    readingMinutes: Number(item.readingMinutes || 6),
    author: item.author ? String(item.author) : 'GeneratePasswordTo Team',
    updatedAt: item.updatedAt ? String(item.updatedAt) : new Date().toISOString().slice(0, 10),
    title: String(item.title),
    excerpt: String(item.excerpt),
    seoTitle: String(item.seoTitle),
    seoDescription: String(item.seoDescription),
    keywords: Array.isArray(item.keywords) ? item.keywords.map((v) => String(v)) : [],
    sections: item.sections.map((section, idx) => ({
      sortOrder: idx + 1,
      heading: String(section.heading || ''),
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.map((v) => String(v)) : [],
      bullets: Array.isArray(section.bullets) ? section.bullets.map((v) => String(v)) : [],
    })),
  };
}

async function upsertArticle(client, article) {
  const articleResult = await client.query(
    `
    insert into content_articles (slug, category, reading_minutes, author, updated_at)
    values ($1, $2, $3, $4, $5::timestamptz)
    on conflict (slug)
    do update set
      category = excluded.category,
      reading_minutes = excluded.reading_minutes,
      author = excluded.author,
      updated_at = excluded.updated_at
    returning id
    `,
    [article.slug, article.category, article.readingMinutes, article.author, article.updatedAt],
  );

  const articleId = articleResult.rows[0].id;

  const localeResult = await client.query(
    `
    insert into content_article_locales (
      article_id, locale, title, excerpt, seo_title, seo_description, keywords
    )
    values ($1, $2, $3, $4, $5, $6, $7::text[])
    on conflict (article_id, locale)
    do update set
      title = excluded.title,
      excerpt = excluded.excerpt,
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description,
      keywords = excluded.keywords,
      updated_at = now()
    returning id
    `,
    [
      articleId,
      article.locale,
      article.title,
      article.excerpt,
      article.seoTitle,
      article.seoDescription,
      article.keywords,
    ],
  );

  const articleLocaleId = localeResult.rows[0].id;

  await client.query('delete from content_article_sections where article_locale_id = $1', [articleLocaleId]);

  for (const section of article.sections) {
    await client.query(
      `
      insert into content_article_sections (
        article_locale_id, sort_order, heading, paragraphs, bullets
      )
      values ($1, $2, $3, $4::text[], $5::text[])
      `,
      [articleLocaleId, section.sortOrder, section.heading, section.paragraphs, section.bullets],
    );
  }
}

async function main() {
  const filePath = process.argv[2] || 'docs/content-agent-output.sample.json';
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL or SUPABASE_DB_URL is not set.');
  }

  const rows = readPayload(filePath).map(normalizeArticle);

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: shouldUseSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
  });

  const client = await pool.connect();
  try {
    await client.query('begin');
    for (const row of rows) {
      await upsertArticle(client, row);
    }
    await client.query('commit');
    console.log(`Seeded ${rows.length} localized article records.`);
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
