import { unstable_cache } from 'next/cache';
import { contentRepository } from '@/lib/content-repository';

const GUIDES_REVALIDATE_SECONDS = 3600;

// Cache key version. Bump when bundled guide content changes so an incremental
// deploy does not keep serving articles from the previous build's data cache.
const GUIDES_CACHE_VERSION = 'v8';

export const getCachedGuides = unstable_cache(
  async (locale: string) => contentRepository.listGuides(locale),
  [`guides-list-${GUIDES_CACHE_VERSION}`],
  {
    revalidate: GUIDES_REVALIDATE_SECONDS,
    tags: ['guides'],
  },
);

export const getCachedGuide = unstable_cache(
  async (slug: string, locale: string) => contentRepository.getGuide(slug, locale),
  [`guide-article-${GUIDES_CACHE_VERSION}`],
  {
    revalidate: GUIDES_REVALIDATE_SECONDS,
    tags: ['guides'],
  },
);
