import { getAvailableLanguages } from '../utils/languageUtils';
const semanticCore = require('../../docs/semantic-core.json');

// Побудова SEO-даних із семантичного ядра
const BRAND = 'generatepasswordto.me';

function getK(lang, tier, index) {
  const byLang = semanticCore.keywords[lang] || semanticCore.keywords['en'];
  const arr = byLang?.[tier] || [];
  return arr[index] || '';
}

function capitalizeFirst(input) {
  if (!input || typeof input !== 'string') return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function buildTitle(lang) {
  const h0 = getK(lang, 'high', 0);
  const h1 = getK(lang, 'high', 1);
  const h2 = getK(lang, 'high', 2);
  const left = [h0, h1].filter(Boolean).join(' — ');
  const tail = h2 ? `, ${h2}` : '';
  const raw = `${left}${tail} | ${BRAND}`.trim();
  return capitalizeFirst(raw);
}

function buildDescription(lang) {
  const h0 = getK(lang, 'high', 0);
  const h1 = getK(lang, 'high', 1);
  const m0 = getK(lang, 'medium', 0);
  const m1 = getK(lang, 'medium', 1);
  const l0 = getK(lang, 'low', 0);

  const templates = {
    en: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. NIST 800-63B, PCI DSS. ${l0}.`,
    ua: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Відповідність NIST 800-63B та PCI DSS. ${l0}.`,
    es: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Cumple NIST 800-63B y PCI DSS. ${l0}.`,
    fr: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Conforme NIST 800-63B et PCI DSS. ${l0}.`,
    de: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. NIST 800-63B, PCI DSS konform. ${l0}.`,
    it: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Conforme a NIST 800-63B e PCI DSS. ${l0}.`,
    pt: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Em conformidade com NIST 800-63B e PCI DSS. ${l0}.`,
    ru: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Соответствие NIST 800-63B и PCI DSS. ${l0}.`,
    zh: `${BRAND} — ${h0}、${h1}。${m0}、${m1}。符合 NIST 800-63B 与 PCI DSS。${l0}。`,
    ja: `${BRAND} — ${h0}、${h1}。${m0}、${m1}。NIST 800-63B・PCI DSS 準拠。${l0}。`,
    pl: `${BRAND} — ${h0}, ${h1}. ${m0}, ${m1}. Zgodność z NIST 800-63B i PCI DSS. ${l0}.`,
  };
  return templates[lang] || templates.en;
}

const seoDataMap = semanticCore.languages.reduce((acc, lang) => {
  acc[lang] = {
    title: buildTitle(lang),
    description: buildDescription(lang),
  };
  return acc;
}, {});

// Функція для автоматичного генерування SEO даних
const generateSeoData = () => {
  const availableLanguages = getAvailableLanguages();
  
  return availableLanguages.map(language => ({
    language,
    title: seoDataMap[language]?.title || seoDataMap.en.title,
    description: seoDataMap[language]?.description || seoDataMap.en.description,
  }));
};

// Експортуємо автоматично згенеровані дані
const seoData = generateSeoData();

export default seoData;
