/**
 * Export all article translations from TypeScript source files to a JSON file
 * compatible with the MongoDB seed script (seed-content-mongo.mjs).
 *
 * Usage:
 *   npx tsx scripts/export-articles-to-json.ts [output-path]
 *
 * Default output: docs/content-articles-export.json
 *
 * The output JSON array contains one object per (slug, locale) pair with the
 * structure expected by seed-content-mongo.mjs:
 *   { slug, locale, category, author, updatedAt, title, excerpt,
 *     seoTitle, seoDescription, keywords, sections }
 */

import path from 'node:path';
import fs from 'node:fs';
import { ARTICLE_CATALOG, SUPPORTED_CONTENT_LANGUAGES, type ContentLanguage } from '../src/content/articles';

const cwd = process.cwd();

function main() {
  const outputPath = process.argv[2] || 'docs/content-articles-export.json';
  const abs = path.resolve(cwd, outputPath);

  const items: Array<Record<string, unknown>> = [];

  for (const article of ARTICLE_CATALOG) {
    for (const locale of SUPPORTED_CONTENT_LANGUAGES) {
      const content = article.content[locale as ContentLanguage];
      if (!content) continue;

      items.push({
        slug: article.slug,
        locale,
        image: `/images/guides/${article.slug}.webp`,
        category: article.category,
        readingMinutes: article.readingMinutes,
        author: article.author,
        updatedAt: article.updatedAt,
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
      });
    }
  }

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(items, null, 2), 'utf8');

  const locales = [...new Set(items.map((i) => i.locale))];
  console.log(
    `Exported ${items.length} records (${ARTICLE_CATALOG.length} articles × ${locales.length} locales) → ${outputPath}`,
  );
  console.log(`Locales: ${locales.join(', ')}`);
  console.log(
    `\nTo update MongoDB run:\n  MONGODB_URI="<uri>" node scripts/seed-content-mongo.mjs ${outputPath}`,
  );
}

main();
