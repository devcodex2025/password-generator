import type { Metadata } from 'next';
import {
  BASE_URL,
  BRAND_NAME,
  HREFLANG_MAP,
  LOCALE_LANGUAGE_LABELS,
  OG_LOCALE_MAP,
  ORGANIZATION_NAME,
  SUPPORTED_LOCALES,
  buildAbsoluteUrl,
  buildLocaleAlternates,
  getLocaleBaseUrl,
  normalizeLocale,
} from '@/lib/site-config';

const DEFAULT_TITLE = `Password generator | ${BRAND_NAME}`;
const DEFAULT_DESCRIPTION = 'Generate strong passwords locally, review password strength instantly, and follow modern security guidance in every supported language.';

export function buildLocalizedMetadata({
  locale,
  pathname = '',
  title,
  description,
  keywords,
  type = 'website',
}: {
  locale: string;
  pathname?: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const normalized = normalizeLocale(locale);
  const localeBaseUrl = getLocaleBaseUrl(normalized);
  const normalizedPath = pathname ? `/${pathname.replace(/^\/+/, '')}` : '';
  const canonical = `${localeBaseUrl}${normalizedPath}`;
  const image = buildAbsoluteUrl('/images/generate-password-preview.png');

  return {
    metadataBase: new URL(BASE_URL),
    title: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    keywords,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(normalizedPath),
    },
    openGraph: {
      title: title || DEFAULT_TITLE,
      description: description || DEFAULT_DESCRIPTION,
      url: canonical,
      siteName: BRAND_NAME,
      type,
      locale: OG_LOCALE_MAP[normalized],
      alternateLocale: SUPPORTED_LOCALES.filter((entry) => entry !== normalized).map((entry) => OG_LOCALE_MAP[entry]),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || DEFAULT_TITLE,
      description: description || DEFAULT_DESCRIPTION,
      images: [image],
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    logo: buildAbsoluteUrl('/images/logo.svg'),
    sameAs: ['https://github.com/devcodex2025/password-generator'],
  };
}

export function buildWebsiteSchema(locale: string) {
  const normalized = normalizeLocale(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}#website`,
    url: BASE_URL,
    name: BRAND_NAME,
    inLanguage: HREFLANG_MAP[normalized],
    publisher: {
      '@id': `${BASE_URL}#organization`,
    },
  };
}

export function buildHomeSchemas(locale: string, qa: Array<{ q: string; a: string }>, steps: string[]) {
  const normalized = normalizeLocale(locale);
  const inLanguage = HREFLANG_MAP[normalized];
  const homeUrl = getLocaleBaseUrl(normalized);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage,
      mainEntity: qa.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      inLanguage,
      name: 'How to generate a secure password',
      description: 'Use the generator, review the strength indicator, and copy a password that matches current security requirements.',
      totalTime: 'PT1M',
      step: steps.filter(Boolean).map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: text,
        text,
        url: homeUrl,
      })),
    },
  ];
}

export function buildBreadcrumbSchema(items: Array<{ label: string; href?: string }>) {
  const entity = items
    .filter((item) => item.href)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.href!),
    }));

  if (!entity.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entity,
  };
}

export function buildGuideCollectionMetadata(locale: string, title: string, description: string): Metadata {
  return buildLocalizedMetadata({
    locale,
    pathname: `${normalizeLocale(locale)}/guides`,
    title,
    description,
  });
}

export function buildStaticPageMetadata(locale: string, slug: string, title: string, description: string): Metadata {
  return buildLocalizedMetadata({
    locale,
    pathname: `${normalizeLocale(locale)}/${slug}`,
    title: `${title} | ${BRAND_NAME}`,
    description,
  });
}

export function buildGuideArticleSchema({
  locale,
  title,
  description,
  url,
  image,
  dateModified,
  author,
}: {
  locale: string;
  title: string;
  description: string;
  url: string;
  image: string;
  dateModified: string;
  author: string;
}) {
  const normalized = normalizeLocale(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: HREFLANG_MAP[normalized],
    mainEntityOfPage: url,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@id': `${BASE_URL}#organization`,
    },
    image: [image],
  };
}

export function getLocaleLabel(locale: string): string {
  return LOCALE_LANGUAGE_LABELS[normalizeLocale(locale)];
}
