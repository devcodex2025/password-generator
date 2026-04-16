import type { MetadataRoute } from 'next';
import { ARTICLE_CATALOG } from '@/content/articles';
import { BASE_URL, SUPPORTED_LOCALES, getLocaleBaseUrl } from '@/lib/site-config';

const STATIC_PAGE_SLUGS = ['guides', 'privacy-policy', 'terms-of-service', 'contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SUPPORTED_LOCALES.filter((locale) => locale !== 'en').map((locale) => ({
      url: getLocaleBaseUrl(locale),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];

  const staticEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    STATIC_PAGE_SLUGS.map((slug) => ({
      url: `${getLocaleBaseUrl(locale)}/${slug}`,
      lastModified: now,
      changeFrequency: slug === 'guides' ? ('weekly' as const) : ('monthly' as const),
      priority: slug === 'guides' ? 0.8 : 0.6,
    })),
  );

  const guideEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    ARTICLE_CATALOG.map((article) => ({
      url: `${getLocaleBaseUrl(locale)}/guides/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...homeEntries, ...staticEntries, ...guideEntries];
}
