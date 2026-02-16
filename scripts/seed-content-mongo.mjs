import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { MongoClient } from 'mongodb';

function readPayload(filePath) {
  const absolute = path.resolve(process.cwd(), filePath);
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
    image: item.image ? String(item.image) : `/images/guides/${String(item.slug)}.webp`,
    category: item.category ? String(item.category) : 'security-basics',
    ...(item.readingMinutes ? { readingMinutes: Number(item.readingMinutes) } : {}),
    author: item.author ? String(item.author) : 'GeneratePasswordTo Editorial Team',
    updatedAt: item.updatedAt ? new Date(String(item.updatedAt)) : new Date(),
    title: String(item.title),
    excerpt: String(item.excerpt),
    seoTitle: String(item.seoTitle),
    seoDescription: String(item.seoDescription),
    keywords: Array.isArray(item.keywords) ? item.keywords.map((v) => String(v)) : [],
    sections: item.sections.map((section) => ({
      heading: String(section.heading || ''),
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.map((v) => String(v)) : [],
      bullets: Array.isArray(section.bullets) ? section.bullets.map((v) => String(v)) : [],
    })),
  };
}

async function main() {
  const filePath = process.argv[2] || 'docs/content-agent-output.sample.json';
  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'generatepassword';
  const collectionName = process.env.MONGODB_COLLECTION || 'content_guides';

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set.');
  }

  const rows = readPayload(filePath).map(normalizeArticle);

  const client = new MongoClient(mongoUri);
  await client.connect();

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.createIndex({ slug: 1, locale: 1 }, { unique: true });
    await collection.createIndex({ locale: 1, updatedAt: -1 });

    let updated = 0;
    for (const row of rows) {
      const setPayload = {
        ...row,
        touchedAt: new Date(),
      };
      const unsetPayload = {};
      if (!Object.prototype.hasOwnProperty.call(row, 'readingMinutes')) {
        unsetPayload.readingMinutes = '';
      }

      const result = await collection.updateOne(
        { slug: row.slug, locale: row.locale },
        {
          $set: setPayload,
          ...(Object.keys(unsetPayload).length ? { $unset: unsetPayload } : {}),
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true },
      );

      if (result.upsertedCount || result.modifiedCount) {
        updated += 1;
      }
    }

    console.log(`Upserted ${updated} of ${rows.length} localized records into ${dbName}.${collectionName}.`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
