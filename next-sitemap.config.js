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

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml'],
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
    return availableLanguages.map((langCode) => {
      return {
        loc: `/${langCode}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    });
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};
