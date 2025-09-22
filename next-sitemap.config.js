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
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  additionalPaths: async (config) => {
    return availableLanguages.map((langCode) => {
      // Не припускаємось, що '/' завжди англійська
      return {
        loc: `/${langCode}`, // завжди явно /ua, /en тощо
        changefreq: 'weekly',
        priority: 0.9,
      };
    });
  },
};
