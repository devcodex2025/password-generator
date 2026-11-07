'use strict';

/**
 * Per-URL `<lastmod>` values for sitemap.xml.
 *
 * Rule: the value is the day the page's *content* last changed, never the build
 * time. A timestamp that moves on every deploy teaches Google to ignore
 * `<lastmod>` for the whole sitemap, which is one of the reasons pages stay in
 * "Crawled - currently not indexed" for months.
 *
 * Bump a date here (and `updatedAt` in src/content/articles.ts for guides) only
 * when the visible copy of that page changes. `src/lib/sitemap-lastmod.test.mjs`
 * keeps the two sources in sync and fails when a date is missing or in the
 * future.
 */

/** Static pages and page hubs, keyed by their first path segment after the locale. */
const PAGE_UPDATED = {
  home: '2026-11-02',
  about: '2026-11-03',
  contact: '2026-11-03',
  'privacy-policy': '2026-11-03',
  'terms-of-service': '2026-11-03',
  guides: '2026-11-07',
  'best-password-managers-2026': '2026-11-07',
  'password-statistics-2026': '2026-11-03',
};

/**
 * Guide articles. Must mirror `ARTICLE_CATALOG[].updatedAt` in
 * src/content/articles.ts; the unit test fails on drift.
 */
const ARTICLE_UPDATED = {
  'how-to-create-strong-passwords': '2026-11-07',
  'password-manager-vs-manual-storage': '2026-11-07',
  'passphrase-vs-password-entropy': '2026-11-07',
  'nist-800-63b-password-rules': '2026-11-07',
  'pci-dss-password-requirements': '2026-11-07',
  'what-to-do-after-password-breach': '2026-11-07',
  'two-factor-authentication-basics': '2026-11-07',
  'common-password-mistakes': '2026-11-07',
  'team-password-policy-template': '2026-11-07',
  'secure-password-generator-guide': '2026-11-07',
  'vpn-security-privacy-guide': '2026-11-07',
  'wifi-password-guide': '2026-11-07',
};

const LOCALE_SEGMENT = /^[a-z]{2}$/;

/**
 * Resolve the last content change for a locale-prefixed path.
 * `/`, `/en`, `/en/guides/foo` and `/ua` are all handled.
 */
function lastmodForPath(pathname) {
  const segments = String(pathname).split('/').filter(Boolean);
  if (segments.length > 0 && LOCALE_SEGMENT.test(segments[0])) {
    segments.shift();
  }
  if (segments.length === 0) {
    return PAGE_UPDATED.home;
  }
  const [head, slug] = segments;
  if (head === 'guides') {
    return slug ? ARTICLE_UPDATED[slug] || PAGE_UPDATED.guides : PAGE_UPDATED.guides;
  }
  return PAGE_UPDATED[head] || PAGE_UPDATED.home;
}

/** True when the value is a real calendar date in YYYY-MM-DD form. */
function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

module.exports = {
  PAGE_UPDATED,
  ARTICLE_UPDATED,
  lastmodForPath,
  isValidDate,
};
