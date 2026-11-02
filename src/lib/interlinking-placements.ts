export const PLACEMENT_TRANSLATIONS: Record<string, Record<string, string>> = {
  intro: {
    en: 'Need-to-know reading',
    ua: 'Обов’язкове для розуміння',
    es: 'Lectura imprescindible',
    fr: 'Lecture essentielle',
    de: 'Wissenswert',
    it: 'Lettura fondamentale',
    pt: 'Leitura essencial',
    ru: 'Обязательно к прочтению',
    zh: '必读内容',
    ja: '押さえておきたい',
    pl: 'Warto przeczytać',
    vi: 'Cần đọc trước',
  },
  body: {
    en: 'Related guidance',
    ua: 'Супутні матеріали',
    es: 'Orientación relacionada',
    fr: 'Conseils associés',
    de: 'Verwandte Hinweise',
    it: 'Approfondimenti correlati',
    pt: 'Orientação relacionada',
    ru: 'Связанные рекомендации',
    zh: '相关指南',
    ja: '関連ガイド',
    pl: 'Powiązane wskazówki',
    vi: 'Hướng dẫn liên quan',
  },
  conclusion: {
    en: 'Next steps',
    ua: 'Наступні кроки',
    es: 'Próximos pasos',
    fr: 'Étapes suivantes',
    de: 'Nächste Schritte',
    it: 'Prossimi passi',
    pt: 'Próximos passos',
    ru: 'Следующие шаги',
    zh: '下一步',
    ja: '次のステップ',
    pl: 'Kolejne kroki',
    vi: 'Bước tiếp theo',
  },
};

export function getPlacementLabel(locale: string, placement: string): string {
  const translations = PLACEMENT_TRANSLATIONS[placement];
  if (!translations) {
    return placement;
  }
  return translations[locale] || translations.en;
}
