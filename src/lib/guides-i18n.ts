const GUIDE_UI_DICTIONARY = {
  en: { home: 'Home', guides: 'Guides', guidesTitle: 'Security Guides', readGuide: 'Read guide' },
  ua: { home: 'Головна', guides: 'Гайди', guidesTitle: 'Гайди з безпеки', readGuide: 'Читати гід' },
  es: { home: 'Inicio', guides: 'Guías', guidesTitle: 'Guías de seguridad', readGuide: 'Leer guía' },
  fr: { home: 'Accueil', guides: 'Guides', guidesTitle: 'Guides de sécurité', readGuide: 'Lire le guide' },
  de: { home: 'Start', guides: 'Leitfäden', guidesTitle: 'Sicherheitsleitfäden', readGuide: 'Leitfaden lesen' },
  it: { home: 'Home', guides: 'Guide', guidesTitle: 'Guide alla sicurezza', readGuide: 'Leggi la guida' },
  pt: { home: 'Início', guides: 'Guias', guidesTitle: 'Guias de segurança', readGuide: 'Ler guia' },
  ru: { home: 'Главная', guides: 'Гайды', guidesTitle: 'Гайды по безопасности', readGuide: 'Читать гайд' },
  zh: { home: '首页', guides: '指南', guidesTitle: '安全指南', readGuide: '阅读指南' },
  ja: { home: 'ホーム', guides: 'ガイド', guidesTitle: 'セキュリティガイド', readGuide: 'ガイドを読む' },
  pl: { home: 'Strona główna', guides: 'Poradniki', guidesTitle: 'Poradniki bezpieczeństwa', readGuide: 'Czytaj poradnik' },
} as const;

type GuideUiLocale = keyof typeof GUIDE_UI_DICTIONARY;

export function getGuidesUiLabels(locale: string) {
  const key = (locale in GUIDE_UI_DICTIONARY ? locale : 'en') as GuideUiLocale;
  return GUIDE_UI_DICTIONARY[key];
}

const GUIDE_CATEGORY_DICTIONARY = {
  en: {
    'security-basics': 'Security basics',
    policy: 'Policy',
    implementation: 'Implementation',
    'incident-response': 'Incident response',
  },
  ua: {
    'security-basics': 'Основи безпеки',
    policy: 'Політики',
    implementation: 'Впровадження',
    'incident-response': 'Реагування на інциденти',
  },
  es: {
    'security-basics': 'Fundamentos de seguridad',
    policy: 'Políticas',
    implementation: 'Implementación',
    'incident-response': 'Respuesta a incidentes',
  },
  fr: {
    'security-basics': 'Bases de la sécurité',
    policy: 'Politiques',
    implementation: 'Mise en oeuvre',
    'incident-response': 'Réponse aux incidents',
  },
  de: {
    'security-basics': 'Sicherheitsgrundlagen',
    policy: 'Richtlinien',
    implementation: 'Implementierung',
    'incident-response': 'Vorfallreaktion',
  },
  it: {
    'security-basics': 'Fondamenti di sicurezza',
    policy: 'Policy',
    implementation: 'Implementazione',
    'incident-response': 'Risposta agli incidenti',
  },
  pt: {
    'security-basics': 'Fundamentos de segurança',
    policy: 'Políticas',
    implementation: 'Implementação',
    'incident-response': 'Resposta a incidentes',
  },
  ru: {
    'security-basics': 'Основы безопасности',
    policy: 'Политики',
    implementation: 'Внедрение',
    'incident-response': 'Реагирование на инциденты',
  },
  zh: {
    'security-basics': '安全基础',
    policy: '策略',
    implementation: '实施',
    'incident-response': '事件响应',
  },
  ja: {
    'security-basics': 'セキュリティの基礎',
    policy: 'ポリシー',
    implementation: '実装',
    'incident-response': 'インシデント対応',
  },
  pl: {
    'security-basics': 'Podstawy bezpieczeństwa',
    policy: 'Polityki',
    implementation: 'Wdrożenie',
    'incident-response': 'Reagowanie na incydenty',
  },
} as const;

function toHumanLabel(value: string): string {
  return value
    .split('-')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

export function getGuideCategoryLabel(locale: string, category: string): string {
  const key = (locale in GUIDE_CATEGORY_DICTIONARY ? locale : 'en') as keyof typeof GUIDE_CATEGORY_DICTIONARY;
  const localized = GUIDE_CATEGORY_DICTIONARY[key][category as keyof (typeof GUIDE_CATEGORY_DICTIONARY)[typeof key]];
  return localized || toHumanLabel(category);
}
