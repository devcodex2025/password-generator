const lang = require('./src/components/lang.json');

const getAvailableLanguages = () => {
  const firstKeyWithLanguages = Object.keys(lang).find(
    key => typeof lang[key] === 'object' && lang[key] !== null
  );
  if (!firstKeyWithLanguages) return [];
  return Object.keys(lang[firstKeyWithLanguages]);
};

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
];
const staticPageSlugs = ['privacy-policy', 'terms-of-service', 'contact', 'best-password-managers-2026'];

/* Map locale codes to hreflang values (ua → uk for Ukrainian) */
const hreflangMap = { ua: 'uk' };
const toHreflang = (code) => hreflangMap[code] || code;

/**
 * Build xhtml:link alternateRefs for a given path suffix.
 * e.g. suffix = '/guides' → alternates for /en/guides, /ua/guides, …
 */
function buildAlternateRefs(pathSuffix) {
  return availableLanguages.map((langCode) => ({
    href: `${siteUrl}/${langCode}${pathSuffix}`,
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
        allow: '/',
        disallow: ['/api/', '/_next/', '/server-sitemap.xml'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
    ],
  },
  additionalPaths: async (config) => {
    const localePages = availableLanguages.map((langCode) => ({
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

    const guideArticlePages = availableLanguages.flatMap((langCode) =>
      guideSlugs.map((slug) => ({
        loc: `/${langCode}/guides/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: buildAlternateRefs(`/guides/${slug}`),
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

    return [...localePages, ...guideIndexPages, ...guideArticlePages, ...staticPages];
  },
  transform: async (config, path) => {
    // Never list generated OG-image routes as pages — they are PNG endpoints,
    // not indexable HTML. Keeps crawl budget on real pages only.
    if (/\/opengraph-image(\/|$)/.test(path)) return null;

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
