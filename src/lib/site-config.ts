export const BASE_URL = 'https://www.generatepasswordto.me';

export const SUPPORTED_LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const HREFLANG_MAP: Record<SupportedLocale, string> = {
  en: 'en',
  ua: 'uk',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ru: 'ru',
  zh: 'zh-Hans',
  ja: 'ja',
  pl: 'pl',
};

export const OG_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: 'en_US',
  ua: 'uk_UA',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  ru: 'ru_RU',
  zh: 'zh_CN',
  ja: 'ja_JP',
  pl: 'pl_PL',
};

export const LOCALE_LANGUAGE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  ua: 'Українська',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  pl: 'Polski',
};

export const BRAND_NAME = 'generatepasswordto.me';
export const ORGANIZATION_NAME = 'GeneratePasswordTo Editorial Team';

export function normalizeLocale(locale: string): SupportedLocale {
  return (SUPPORTED_LOCALES.includes(locale as SupportedLocale) ? locale : 'en') as SupportedLocale;
}

export function getLocaleHomePath(locale: string): string {
  return normalizeLocale(locale) === 'en' ? '/' : `/${normalizeLocale(locale)}`;
}

export function getLocaleBaseUrl(locale: string): string {
  const normalized = normalizeLocale(locale);
  return normalized === 'en' ? BASE_URL : `${BASE_URL}/${normalized}`;
}

export function buildAbsoluteUrl(path: string): string {
  return new URL(path, BASE_URL).toString();
}

export function buildLocaleAlternates(pathname = ''): Record<string, string> {
  const normalizedPath = pathname ? `/${pathname.replace(/^\/+/, '')}` : '';

  return {
    ...Object.fromEntries(
      SUPPORTED_LOCALES.map((locale) => {
        const hrefLang = HREFLANG_MAP[locale];
        const localeBase = getLocaleBaseUrl(locale);
        return [hrefLang, `${localeBase}${normalizedPath}`];
      }),
    ),
    'x-default': `${BASE_URL}${normalizedPath}`,
  };
}
