import { getAvailableLanguages } from '../utils/languageUtils';

const semanticCore = require('../../docs/semantic-core.json');

const BRAND = 'generatepasswordto.me';
const SEO_SEPARATOR = ' - ';
const COMPLIANCE_NOTE = 'NIST 800-63B, PCI DSS.';
const LONG_TAIL_BY_LANG = {
  en: ['free password generator', 'online password generator', 'strong password generator'],
  ua: ['безкоштовний генератор паролів', 'онлайн генератор паролів', 'генератор складних паролів'],
  es: ['generador de contraseñas gratis', 'generador de contraseñas online', 'generador de contraseñas seguras'],
  fr: ['générateur de mots de passe gratuit', 'générateur de mots de passe en ligne', 'générateur de mots de passe sécurisé'],
  de: ['kostenloser Passwort Generator', 'Online Passwort Generator', 'sicherer Passwort Generator'],
  it: ['generatore password gratis', 'generatore password online', 'generatore password sicure'],
  pt: ['gerador de senhas grátis', 'gerador de senhas online', 'gerador de senhas seguras'],
  ru: ['бесплатный генератор паролей', 'онлайн генератор паролей', 'генератор сложных паролей'],
  zh: ['免费密码生成器', '在线密码生成器', '安全密码生成器'],
  ja: ['無料 パスワード 生成', 'オンライン パスワード 生成', '安全な パスワード 生成'],
  pl: ['darmowy generator haseł', 'generator haseł online', 'generator silnych haseł'],
};

function getK(lang, tier, index) {
  const byLang = semanticCore.keywords[lang] || semanticCore.keywords.en;
  const arr = byLang?.[tier] || [];
  return arr[index] || '';
}

function getKeywordsByTier(lang, tier) {
  const byLang = semanticCore.keywords[lang] || semanticCore.keywords.en;
  return Array.isArray(byLang?.[tier]) ? byLang[tier] : [];
}

function cleanMetaText(input) {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/вЂ”|вЂ“|вЂ/g, '-')
    .replace(/[?]{2,}/g, '?')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalizeFirst(input) {
  if (!input || typeof input !== 'string') return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function buildTitle(lang) {
  const h0 = getK(lang, 'high', 0);
  const h1 = getK(lang, 'high', 1);
  const h2 = getK(lang, 'high', 2);

  const left = [h0, h1].filter(Boolean).join(SEO_SEPARATOR);
  const tail = h2 ? `, ${h2}` : '';
  const raw = `${left}${tail} | ${BRAND}`.trim();

  return capitalizeFirst(cleanMetaText(raw));
}

function buildDescription(lang) {
  const h0 = getK(lang, 'high', 0);
  const h1 = getK(lang, 'high', 1);
  const m0 = getK(lang, 'medium', 0);
  const m1 = getK(lang, 'medium', 1);
  const l0 = getK(lang, 'low', 0);

  const raw = `${BRAND}${SEO_SEPARATOR}${h0}, ${h1}. ${m0}, ${m1}. ${COMPLIANCE_NOTE} ${l0}.`;
  return cleanMetaText(raw);
}

function buildKeywords(lang) {
  const high = getKeywordsByTier(lang, 'high');
  const medium = getKeywordsByTier(lang, 'medium');
  const low = getKeywordsByTier(lang, 'low');
  const longTail = LONG_TAIL_BY_LANG[lang] || LONG_TAIL_BY_LANG.en;

  const core = [...high, ...medium, ...low].map(cleanMetaText).filter(Boolean);
  const extras = [...longTail, 'NIST 800-63B', 'PCI DSS', BRAND];

  return Array.from(new Set([...core, ...extras]));
}

const seoDataMap = semanticCore.languages.reduce((acc, lang) => {
  acc[lang] = {
    title: buildTitle(lang),
    description: buildDescription(lang),
    keywords: buildKeywords(lang),
  };
  return acc;
}, {});

const generateSeoData = () => {
  const availableLanguages = getAvailableLanguages();

  return availableLanguages.map((language) => ({
    language,
    title: seoDataMap[language]?.title || seoDataMap.en.title,
    description: seoDataMap[language]?.description || seoDataMap.en.description,
    keywords: seoDataMap[language]?.keywords || seoDataMap.en.keywords,
  }));
};

const seoData = generateSeoData();

export default seoData;
