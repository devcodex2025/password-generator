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
];

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
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
    }));

    const guideIndexPages = availableLanguages.map((langCode) => ({
      loc: `/${langCode}/guides`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    const guideArticlePages = availableLanguages.flatMap((langCode) =>
      guideSlugs.map((slug) => ({
        loc: `/${langCode}/guides/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }))
    );

    return [...localePages, ...guideIndexPages, ...guideArticlePages];
  },
  transform: async (config, path) => {
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
