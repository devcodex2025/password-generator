import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const { PAGE_UPDATED, ARTICLE_UPDATED, lastmodForPath, isValidDate } = require(
  path.join(repoRoot, 'sitemap-lastmod.js')
);

const today = new Date().toISOString().slice(0, 10);

function readArticleDates() {
  const source = fs.readFileSync(path.join(repoRoot, 'src', 'content', 'articles.ts'), 'utf8');
  const matches = [...source.matchAll(/slug:\s*'([^']+)',[\s\S]*?updatedAt:\s*'([^']+)'/g)];
  return Object.fromEntries(matches.map((match) => [match[1], match[2]]));
}

test('every guide date is valid and not in the future', () => {
  for (const [slug, value] of Object.entries(ARTICLE_UPDATED)) {
    assert.ok(isValidDate(value), `${slug}: invalid date ${value}`);
    assert.ok(value <= today, `${slug}: date ${value} is in the future`);
  }
});

test('every static page date is valid and not in the future', () => {
  for (const [key, value] of Object.entries(PAGE_UPDATED)) {
    assert.ok(isValidDate(value), `${key}: invalid date ${value}`);
    assert.ok(value <= today, `${key}: date ${value} is in the future`);
  }
});

test('sitemap guide dates mirror ARTICLE_CATALOG.updatedAt', () => {
  const catalog = readArticleDates();
  assert.equal(
    Object.keys(catalog).length,
    Object.keys(ARTICLE_UPDATED).length,
    'article count drifted between articles.ts and sitemap-lastmod.js'
  );
  for (const [slug, updatedAt] of Object.entries(catalog)) {
    assert.equal(
      ARTICLE_UPDATED[slug],
      updatedAt,
      `${slug}: sitemap-lastmod.js has ${ARTICLE_UPDATED[slug]}, articles.ts has ${updatedAt}`
    );
  }
});

test('lastmod resolves for every locale prefix and page type', () => {
  const cases = [
    ['/', PAGE_UPDATED.home],
    ['/en', PAGE_UPDATED.home],
    ['/ua', PAGE_UPDATED.home],
    ['/vi', PAGE_UPDATED.home],
    ['/en/guides', PAGE_UPDATED.guides],
    ['/vi/guides', PAGE_UPDATED.guides],
    ['/en/guides/nist-800-63b-password-rules', ARTICLE_UPDATED['nist-800-63b-password-rules']],
    ['/ua/guides/wifi-password-guide', ARTICLE_UPDATED['wifi-password-guide']],
    ['/en/about', PAGE_UPDATED.about],
    ['/de/privacy-policy', PAGE_UPDATED['privacy-policy']],
    ['/vi/password-statistics-2026', PAGE_UPDATED['password-statistics-2026']],
  ];
  for (const [input, expected] of cases) {
    assert.equal(lastmodForPath(input), expected, `unexpected lastmod for ${input}`);
  }
});

test('sitemap dates are not a single build timestamp', () => {
  const unique = new Set([...Object.values(PAGE_UPDATED), ...Object.values(ARTICLE_UPDATED)]);
  assert.ok(unique.size > 1, 'all pages share one lastmod, which Google will treat as unreliable');
});
