const lang = require('./src/components/lang.json');
const { lastmodForPath } = require('./sitemap-lastmod.js');

/**
 * Locales with fully translated routes and content. `vi` is part of the same
 * set as the others: every page it exists for is listed, and every hreflang
 * cluster that points at a `vi` URL lists it back. Asymmetric clusters (a page
 * declaring `vi` as an alternate while the `vi` page does not declare it) are
 * one of the things Search Console flags and Google resolves by ignoring the
 * cluster.
 */
const SITEMAP_LANGUAGES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const ALL_LANGUAGES = [...SITEMAP_LANGUAGES, 'vi'];

const siteUrl = 'https://www.generatepasswordto.me';
const guideSlugs = [
  'how-to-create-strong-passwords',
  'password-manager-vs-manual-storage',
  'passphrase-vs-password-entropy',
  'nist-800-63b-password-rules',
  'pci-dss-password-requirements',
  'what-to-do-after-password-breach',
  'two-factor-authentication-basics',
  'common-password-mistakes',
  'team-password-policy-template',
  'secure-password-generator-guide',
  'vpn-security-privacy-guide',
  'wifi-password-guide',
];
const staticPageSlugs = ['privacy-policy', 'terms-of-service', 'contact', 'about', 'best-password-managers-2026'];

/**
 * Guides that exist in a subset of locales. A guide is published only where a
 * reviewed translation exists; missing locales are excluded from the sitemap
 * and from that guide's hreflang alternates.
 */
const guideLocaleAvailability = {
  'wifi-password-guide': ALL_LANGUAGES,
};
const guideAvailableIn = (slug, langCode) =>
  (guideLocaleAvailability[slug] || ALL_LANGUAGES).includes(langCode);

/**
 * Guides that have a Vietnamese `vi` export in src/content/articles/<slug>.ts.
 * Keep this list in sync when translating a guide. Everything under
 * /vi/guides/<slug> is excluded from the sitemap until its slug is listed here,
 * because untranslated bodies fall back to English and are noindexed.
 */
const viTranslatedGuideSlugs = [
  'how-to-create-strong-passwords',
  'common-password-mistakes',
  'nist-800-63b-password-rules',
  'passphrase-vs-password-entropy',
  'what-to-do-after-password-breach',
  'password-manager-vs-manual-storage',
  'two-factor-authentication-basics',
  'secure-password-generator-guide',
  'pci-dss-password-requirements',
  'team-password-policy-template',
  'vpn-security-privacy-guide',
  'wifi-password-guide',
];

/* Map locale codes to hreflang values (ua → uk for Ukrainian) */
const hreflangMap = { ua: 'uk' };
const toHreflang = (code) => hreflangMap[code] || code;

/** Locales a specific page exists in. Everything except the data page is 12/12. */
const DATA_PAGE_LANGUAGES = ['en', 'ua', 'vi'];
const languagesForPage = (pathSuffix) =>
  pathSuffix === '/password-statistics-2026' ? DATA_PAGE_LANGUAGES : ALL_LANGUAGES;

/** Locales a guide article exists in: reviewed translation required. */
const languagesForGuide = (slug) =>
  ALL_LANGUAGES.filter(
    (langCode) =>
      guideAvailableIn(slug, langCode) &&
      (langCode !== 'vi' || viTranslatedGuideSlugs.includes(slug)),
  );

/**
 * Build xhtml:link alternateRefs for a given path suffix.
 * e.g. suffix = '/guides' → alternates for /en/guides, /ua/guides, …
 *
 * `x-default` always points at the English URL (the root for the home page).
 */
function buildAlternateRefs(pathSuffix, langs) {
  const refs = langs.map((langCode) => ({
    // The English home lives at `/`; its `/en` alias is redirected.
    href:
      langCode === 'en' && pathSuffix === ''
        ? siteUrl
        : `${siteUrl}/${langCode}${pathSuffix}`,
    hreflang: toHreflang(langCode),
    hrefIsAbsolute: true,
  }));
  refs.push({
    href: pathSuffix === '' ? siteUrl : `${siteUrl}/en${pathSuffix}`,
    hreflang: 'x-default',
    hrefIsAbsolute: true,
  });
  return refs;
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml', '**/opengraph-image', '**/opengraph-image/**'],
  robotsTxtOptions: {
    transformRobotsTxt: async (_config, robotsTxt) =>
      `${robotsTxt.trimEnd()}\n\n# AdSense crawler (needed for ad targeting)\nUser-agent: Mediapartners-Google\nAllow: /\n`,
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          // Only the build assets Googlebot needs to render a page. Everything else under
          // /_next/ (data payloads, manifests, dev endpoints) stays blocked.
          // Next 16 + Turbopack emits /_next/static/immutable/; the other three cover
          // the stable webpack layout and are harmless if unused.
          '/_next/static/immutable/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/media/',
          // next/image optimizer URLs referenced by srcset.
          '/_next/image',
        ],
        disallow: ['/api/', '/_next/', '/server-sitemap.xml'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
    ],
  },
  additionalPaths: async (config) => {
    const localePages = ALL_LANGUAGES
      .filter((langCode) => langCode !== 'en')
      .map((langCode) => ({
        loc: `/${langCode}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: lastmodForPath('/'),
        alternateRefs: buildAlternateRefs('', languagesForPage('')),
      }));

    const guideIndexPages = ALL_LANGUAGES.map((langCode) => ({
      loc: `/${langCode}/guides`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: lastmodForPath('/guides'),
      alternateRefs: buildAlternateRefs('/guides', languagesForPage('/guides')),
    }));

    const guideArticlePages = ALL_LANGUAGES.flatMap((langCode) =>
      guideSlugs
        .filter((slug) => languagesForGuide(slug).includes(langCode))
        .map((slug) => ({
          loc: `/${langCode}/guides/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: lastmodForPath(`/guides/${slug}`),
          alternateRefs: buildAlternateRefs(`/guides/${slug}`, languagesForGuide(slug)),
        }))
    );

    const staticPages = ALL_LANGUAGES.flatMap((langCode) =>
      staticPageSlugs.map((slug) => ({
        loc: `/${langCode}/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: lastmodForPath(`/${slug}`),
        alternateRefs: buildAlternateRefs(`/${slug}`, languagesForPage(`/${slug}`)),
      }))
    );

    // Link-worthy data page (published in EN, UA and VI).
    const dataPages = DATA_PAGE_LANGUAGES.map((langCode) => ({
      loc: `/${langCode}/password-statistics-2026`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: lastmodForPath('/password-statistics-2026'),
      alternateRefs: buildAlternateRefs(
        '/password-statistics-2026',
        languagesForPage('/password-statistics-2026'),
      ),
    }));

    // Root URL (English home, served via middleware rewrite) — no page.tsx generates it anymore.
    const rootPage = {
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: lastmodForPath('/'),
      alternateRefs: buildAlternateRefs('', languagesForPage('')),
    };

    return [rootPage, ...localePages, ...guideIndexPages, ...guideArticlePages, ...staticPages, ...dataPages];
  },
  transform: async (config, path) => {
    // `/en` redirects to `/`; only the canonical URL belongs in the sitemap.
    if (path === '/en' || path === '/en/') return null;
    // Never list generated OG-image routes as pages — they are PNG endpoints,
    // not indexable HTML. Keeps crawl budget on real pages only.
    if (/\/opengraph-image(\/|$)/.test(path)) return null;
    // Only translated Vietnamese guide articles belong in the sitemap.
    const viGuideMatch = path.match(/^\/vi\/guides\/([^/]+)$/);
    if (viGuideMatch && !viTranslatedGuideSlugs.includes(viGuideMatch[1])) return null;

    const localePathMatch = path.match(/^\/([a-z]{2})$/i);
    const locale = localePathMatch ? localePathMatch[1] : null;

    return {
      loc: path,
      changefreq: 'weekly',
      priority: locale ? 0.9 : 0.8,
      lastmod: lastmodForPath(path),
    };
  },
};
