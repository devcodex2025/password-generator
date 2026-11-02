/**
 * The English home is served at `/` (the proxy rewrites it to `/en`
 * internally). Every other locale uses its prefix.
 */
export function homeHref(locale: string): string {
  return locale === 'en' ? '/' : `/${locale}`;
}

/** URL for the same page in another locale, used by the language switcher. */
export function localizedPath(pathname: string, nextLocale: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return homeHref(nextLocale);
  if (segments.length === 1 && nextLocale === 'en') return '/';
  segments[0] = nextLocale;
  return `/${segments.join('/')}`;
}
