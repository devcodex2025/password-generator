const GUIDE_LOCALE_MAP: Record<string, string> = {
  ua: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  ru: 'ru-RU',
  zh: 'zh-CN',
  ja: 'ja-JP',
  pl: 'pl-PL',
};

type GuideUiCopy = {
  minRead: (minutes: number) => string;
  updatedLabel: string;
  authorLabel: string;
  loadingLabel: string;
};

const GUIDE_UI_COPY: Record<string, GuideUiCopy> = {
  en: {
    minRead: (minutes) => `${minutes} min read`,
    updatedLabel: 'Updated',
    authorLabel: 'Author',
    loadingLabel: 'Loading...',
  },
  ua: {
    minRead: (minutes) => `${minutes} хв читання`,
    updatedLabel: 'Оновлено',
    authorLabel: 'Автор',
    loadingLabel: 'Завантаження...',
  },
  es: {
    minRead: (minutes) => `${minutes} min de lectura`,
    updatedLabel: 'Actualizado',
    authorLabel: 'Autor',
    loadingLabel: 'Cargando...',
  },
  fr: {
    minRead: (minutes) => `${minutes} min de lecture`,
    updatedLabel: 'Mis à jour',
    authorLabel: 'Auteur',
    loadingLabel: 'Chargement...',
  },
  de: {
    minRead: (minutes) => `${minutes} Min. Lesezeit`,
    updatedLabel: 'Aktualisiert',
    authorLabel: 'Autor',
    loadingLabel: 'Wird geladen...',
  },
  it: {
    minRead: (minutes) => `${minutes} min di lettura`,
    updatedLabel: 'Aggiornato',
    authorLabel: 'Autore',
    loadingLabel: 'Caricamento...',
  },
  pt: {
    minRead: (minutes) => `${minutes} min de leitura`,
    updatedLabel: 'Atualizado',
    authorLabel: 'Autor',
    loadingLabel: 'Carregando...',
  },
  ru: {
    minRead: (minutes) => `${minutes} мин чтения`,
    updatedLabel: 'Обновлено',
    authorLabel: 'Автор',
    loadingLabel: 'Загрузка...',
  },
  zh: {
    minRead: (minutes) => `阅读 ${minutes} 分钟`,
    updatedLabel: '更新于',
    authorLabel: '作者',
    loadingLabel: '加载中...',
  },
  ja: {
    minRead: (minutes) => `読了 ${minutes} 分`,
    updatedLabel: '更新日',
    authorLabel: '著者',
    loadingLabel: '読み込み中...',
  },
  pl: {
    minRead: (minutes) => `${minutes} min czytania`,
    updatedLabel: 'Zaktualizowano',
    authorLabel: 'Autor',
    loadingLabel: 'Ładowanie...',
  },
};

function normalizeLocale(locale: string): string {
  const key = (locale || 'en').trim().toLowerCase().split(/[-_]/)[0];
  return key in GUIDE_UI_COPY ? key : 'en';
}

export function getGuidesUiCopy(locale: string): GuideUiCopy {
  return GUIDE_UI_COPY[normalizeLocale(locale)];
}

export function formatGuideDate(locale: string, dateValue: string): string {
  const parsed = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  const key = normalizeLocale(locale);
  const resolvedLocale = GUIDE_LOCALE_MAP[key] || GUIDE_LOCALE_MAP.en;

  return new Intl.DateTimeFormat(resolvedLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);
}
