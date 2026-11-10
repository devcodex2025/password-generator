import linksData from '@/content/affiliate/links.json';

/**
 * Affiliate link registry.
 *
 * One source of truth for every outbound monetised link. Resolution order:
 *   1. byGeo[country]      ISO-3166 alpha-2 (from the `geo` cookie, set in middleware)
 *   2. byLocale[locale]    UI locale of the page
 *   3. byLocale.en         English fallback
 *   4. env                 global override / legacy value
 *   5. fallback            hard-coded tracking link (if present)
 *   6. internal            internal page when no affiliate link exists
 *
 * Rule: never send a visitor to the merchant with a non-attributed URL.
 * If we have nothing to earn from, keep them on our own page instead.
 */

export type AffiliateProduct =
  | 'nordpass'
  | 'nordpassFamily'
  | 'nordvpn'
  | 'nordlocker'
  | 'nordpassBusiness';

interface ProductConfig {
  env?: string;
  internal: string;
  fallback: string | null;
  byLocale: Record<string, string>;
  byGeo: Record<string, string>;
}

const PRODUCTS = (linksData as unknown as { products: Record<AffiliateProduct, ProductConfig> }).products;

const SUPPORTED_LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];

export interface ResolveOptions {
  locale: string;
  placement: string;
  /** ISO-3166 alpha-2 country code when known (browser only). */
  geo?: string;
}

export interface ResolvedLink {
  href: string;
  /** true when the URL is a real affiliate link (i.e. can earn commission). */
  isAffiliate: boolean;
  /** which rule produced the URL, useful for analytics and debugging */
  source: 'geo' | 'locale' | 'locale-en' | 'env' | 'fallback' | 'internal';
}

function envValue(envName?: string): string | undefined {
  if (!envName) return undefined;
  const value = process.env[envName];
  return value && value.startsWith('http') ? value : undefined;
}

/** Adds campaign params and a sub-id so network reports can be split by locale and placement. */
function decorate(base: string, locale: string, placement: string): string {
  // Internal links must not carry affiliate params.
  if (base.startsWith('/')) return base;

  const subId = `gen-${locale}-${placement}`.replace(/[^a-zA-Z0-9_-]/g, '');
  const sep = base.includes('?') ? '&' : '?';
  const params = [
    'utm_source=generatepasswordto.me',
    'utm_medium=affiliate',
    'utm_campaign=2026',
    `sid=${subId}`,
    `aff_sub=${subId}`,
  ];
  return `${base}${sep}${params.join('&')}`;
}

export function resolveAffiliateUrl(product: AffiliateProduct, options: ResolveOptions): ResolvedLink {
  const config = PRODUCTS[product];
  const { locale, placement, geo } = options;

  if (!config) {
    return { href: '/', isAffiliate: false, source: 'internal' };
  }

  const geoKey = geo?.toUpperCase();
  if (geoKey && config.byGeo[geoKey]) {
    return { href: decorate(config.byGeo[geoKey], locale, placement), isAffiliate: true, source: 'geo' };
  }

  if (config.byLocale[locale]) {
    return { href: decorate(config.byLocale[locale], locale, placement), isAffiliate: true, source: 'locale' };
  }

  if (config.byLocale.en) {
    return { href: decorate(config.byLocale.en, locale, placement), isAffiliate: true, source: 'locale-en' };
  }

  const fromEnv = envValue(config.env);
  if (fromEnv) {
    return { href: decorate(fromEnv, locale, placement), isAffiliate: true, source: 'env' };
  }

  if (config.fallback) {
    return { href: decorate(config.fallback, locale, placement), isAffiliate: true, source: 'fallback' };
  }

  return { href: decorate(config.internal, locale, placement), isAffiliate: false, source: 'internal' };
}

/** Locales that still have no dedicated tracking link, used by scripts and docs. */
export function localesMissingLinks(product: AffiliateProduct): string[] {
  const config = PRODUCTS[product];
  if (!config) return [...SUPPORTED_LOCALES];
  if (config.fallback || envValue(config.env)) return [];
  return SUPPORTED_LOCALES.filter((locale) => !config.byLocale[locale] && !config.byLocale.en);
}

export { SUPPORTED_LOCALES };
