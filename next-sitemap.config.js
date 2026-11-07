const lang = require('./src/components/lang.json');

/**
 * Locales that have fully translated routes and content. `vi` is handled
 * separately below: its home/legal pages are always listed, while guide pages
 * are listed only for slugs with a Vietnamese translation.
 */
const SITEMAP_LANGUAGES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];

const getAvailableLanguages = () => SITEMAP_LANGUAGES;

const siteUrl = 'https://www.generatepasswordto.me';
const availableLanguages = getAvailableLanguages();
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
  'wifi-password-guide': ['en'],
};
const guideAvailableIn = (slug, langCode) =>
  (guideLocaleAvailability[slug] || SITEMAP_LANGUAGES).includes(langCode);

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
];

/* Map locale codes to hreflang values (ua → uk for Ukrainian) */
const hreflangMap = { ua: 'uk' };
const toHreflang = (code) => hreflangMap[code] || code;

/**
 * Build xhtml:link alternateRefs for a given path suffix.
 * e.g. suffix = '/guides' → alternates for /en/guides, /ua/guides, …
 */
function buildAlternateRefs(pathSuffix, langs = availableLanguages) {
  return langs.map((langCode) => ({
    // The English home lives at `/`; its `/en` alias is redirected.
    href:
      langCode === 'en' && pathSuffix === ''
        ? siteUrl
        : `${siteUrl}/${langCode}${pathSuffix}`,
    hreflang: toHreflang(langCode),
    hrefIsAbsolute: true,
  }));
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
    // `vi` has routes and translated home/legal pages. Vietnamese guide articles
    // are listed only for slugs that have a translated `vi` export.
    const allLanguages = [...availableLanguages, 'vi'];
    const viStaticSlugs = ['privacy-policy', 'terms-of-service', 'contact', 'about', 'best-password-managers-2026'];

    const localePages = allLanguages
      .filter((langCode) => langCode !== 'en')
      .map((langCode) => ({
        loc: `/${langCode}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
        alternateRefs: buildAlternateRefs(''),
      }));

    const guideIndexPages = availableLanguages.map((langCode) => ({
      loc: `/${langCode}/guides`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: buildAlternateRefs('/guides'),
    }));

    const viGuideIndexPage = {
      loc: '/vi/guides',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        ...buildAlternateRefs('/guides'),
        { href: `${siteUrl}/vi/guides`, hreflang: 'vi', hrefIsAbsolute: true },
        { href: `${siteUrl}/en/guides`, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    };

    const guideArticlePages = availableLanguages.flatMap((langCode) =>
      guideSlugs
        .filter((slug) => guideAvailableIn(slug, langCode))
        .map((slug) => ({
          loc: `/${langCode}/guides/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: buildAlternateRefs(
            `/guides/${slug}`,
            availableLanguages.filter((lang) => guideAvailableIn(slug, lang)),
          ),
        }))
    );

    const staticPages = availableLanguages.flatMap((langCode) =>
      staticPageSlugs.map((slug) => ({
        loc: `/${langCode}/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
        alternateRefs: buildAlternateRefs(`/${slug}`),
      }))
    );

    const viStaticPages = viStaticSlugs.map((slug) => ({
      loc: `/vi/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        ...buildAlternateRefs(`/${slug}`),
        { href: `${siteUrl}/vi/${slug}`, hreflang: 'vi', hrefIsAbsolute: true },
        { href: `${siteUrl}/en/${slug}`, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    }));

    const viGuideArticlePages = viTranslatedGuideSlugs.map((slug) => ({
      loc: `/vi/guides/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        ...buildAlternateRefs(`/guides/${slug}`),
        { href: `${siteUrl}/vi/guides/${slug}`, hreflang: 'vi', hrefIsAbsolute: true },
        { href: `${siteUrl}/en/guides/${slug}`, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    }));

    // Link-worthy data page (published in EN, UA and VI).
    const dataPages = ['en', 'ua', 'vi'].map((langCode) => ({
      loc: `/${langCode}/password-statistics-2026`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `${siteUrl}/en/password-statistics-2026`, hreflang: 'en', hrefIsAbsolute: true },
        { href: `${siteUrl}/ua/password-statistics-2026`, hreflang: 'uk', hrefIsAbsolute: true },
        { href: `${siteUrl}/vi/password-statistics-2026`, hreflang: 'vi', hrefIsAbsolute: true },
        { href: `${siteUrl}/en/password-statistics-2026`, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    }));

    // Root URL (English home, served via middleware rewrite) — no page.tsx generates it anymore.
    const rootPage = {
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: siteUrl, hreflang: 'en', hrefIsAbsolute: true },
        ...availableLanguages
          .filter((langCode) => langCode !== 'en')
          .map((langCode) => ({
            href: `${siteUrl}/${langCode}`,
            hreflang: toHreflang(langCode),
            hrefIsAbsolute: true,
          })),
        { href: siteUrl, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    };

    return [rootPage, ...localePages, ...guideIndexPages, viGuideIndexPage, ...guideArticlePages, ...staticPages, ...viStaticPages, ...viGuideArticlePages, ...dataPages];
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
      lastmod: new Date().toISOString(),
    };
  },
};
