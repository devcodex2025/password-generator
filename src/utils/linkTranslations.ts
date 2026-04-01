export type LinkLabelKey =
  | 'generator'
  | 'guides'
  | 'nist'
  | 'pci'
  | 'afterBreach'
  | 'sitemap'
  | 'github'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'contact';

export const linkTranslations: Record<LinkLabelKey, Record<string, string>> = {
  generator: {
    ua: 'Генератор',
    en: 'Generator',
    es: 'Generador',
    fr: 'Générateur',
    de: 'Generator',
    it: 'Generatore',
    pt: 'Gerador',
    ru: 'Генератор',
    zh: '生成器',
    ja: 'ジェネレーター',
    pl: 'Generator',
  },
  guides: {
    ua: 'Гайди',
    en: 'Guides',
    es: 'Guias',
    fr: 'Guides',
    de: 'Leitfäden',
    it: 'Guide',
    pt: 'Guias',
    ru: 'Гайды',
    zh: '指南',
    ja: 'ガイド',
    pl: 'Poradniki',
  },
  nist: {
    ua: 'NIST',
    en: 'NIST',
    es: 'NIST',
    fr: 'NIST',
    de: 'NIST',
    it: 'NIST',
    pt: 'NIST',
    ru: 'NIST',
    zh: 'NIST',
    ja: 'NIST',
    pl: 'NIST',
  },
  pci: {
    ua: 'PCI DSS',
    en: 'PCI DSS',
    es: 'PCI DSS',
    fr: 'PCI DSS',
    de: 'PCI DSS',
    it: 'PCI DSS',
    pt: 'PCI DSS',
    ru: 'PCI DSS',
    zh: 'PCI DSS',
    ja: 'PCI DSS',
    pl: 'PCI DSS',
  },
  afterBreach: {
    ua: 'Після витоку пароля',
    en: 'After Password Breach',
    es: 'Después de una filtración',
    fr: 'Après une fuite',
    de: 'Nach Passwortleck',
    it: 'Dopo una violazione',
    pt: 'Após vazamento',
    ru: 'После утечки пароля',
    zh: '密码泄露后',
    ja: '漏えい後',
    pl: 'Po wycieku hasła',
  },
  sitemap: {
    ua: 'Карта сайту',
    en: 'Sitemap',
    es: 'Mapa del sitio',
    fr: 'Plan du site',
    de: 'Sitemap',
    it: 'Mappa del sito',
    pt: 'Mapa do site',
    ru: 'Карта сайта',
    zh: '站点地图',
    ja: 'サイトマップ',
    pl: 'Mapa strony',
  },
  github: {
    ua: 'GitHub',
    en: 'GitHub',
    es: 'GitHub',
    fr: 'GitHub',
    de: 'GitHub',
    it: 'GitHub',
    pt: 'GitHub',
    ru: 'GitHub',
    zh: 'GitHub',
    ja: 'GitHub',
    pl: 'GitHub',
  },
  privacyPolicy: {
    ua: 'Політика конфіденційності',
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    fr: 'Politique de Confidentialité',
    de: 'Datenschutz',
    it: 'Privacy Policy',
    pt: 'Política de Privacidade',
    ru: 'Политика конфиденциальности',
    zh: '隐私政策',
    ja: 'プライバシーポリシー',
    pl: 'Polityka Prywatności',
  },
  termsOfService: {
    ua: 'Умови використання',
    en: 'Terms of Service',
    es: 'Términos del Servicio',
    fr: 'Conditions d’Utilisation',
    de: 'Nutzungsbedingungen',
    it: 'Termini di Servizio',
    pt: 'Termos de Serviço',
    ru: 'Условия использования',
    zh: '服务条款',
    ja: '利用規約',
    pl: 'Warunki Korzystania',
  },
  contact: {
    ua: 'Контакти',
    en: 'Contact',
    es: 'Contacto',
    fr: 'Contact',
    de: 'Kontakt',
    it: 'Contatti',
    pt: 'Contato',
    ru: 'Контакты',
    zh: '联系我们',
    ja: 'お問い合わせ',
    pl: 'Kontakt',
  },
};

export const getLinkLabel = (key: LinkLabelKey, locale?: string) => {
  const normalizedLocale = locale || 'en';
  const translations = linkTranslations[key];
  return translations[normalizedLocale] || translations.en;
};
