// zh and ja render from the CJK root layout (src/app/(cjk)/cjk/[locale]) so the Noto Sans
// JP/SC stylesheets load only there. proxy.ts rewrites /zh and /ja onto that tree; every other
// locale renders from src/app/(latin)/[locale]. Kept import-free: proxy.ts loads this module.
export const CJK_LOCALES: readonly string[] = ['zh', 'ja'];

export const isCjkLocale = (locale: string) => CJK_LOCALES.includes(locale);

// Next calls a child generateStaticParams once per parent param set and passes that set in.
// Each route tree supplies its own locale, so a child returns only the parent's locale.
export function forParentLocale(locales: readonly string[], params?: { locale?: string }): string[] {
  return locales.filter((locale) => !params?.locale || locale === params.locale);
}
