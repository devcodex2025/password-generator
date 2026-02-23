import { unstable_cache } from 'next/cache';
import { contentRepository } from '@/lib/content-repository';

const GUIDES_REVALIDATE_SECONDS = 3600;

export const getCachedGuides = unstable_cache(
  async (locale: string) => contentRepository.listGuides(locale),
  ['guides-list'],
  {
    revalidate: GUIDES_REVALIDATE_SECONDS,
    tags: ['guides'],
  },
);

export const getCachedGuide = unstable_cache(
  async (slug: string, locale: string) => contentRepository.getGuide(slug, locale),
  ['guide-article'],
  {
    revalidate: GUIDES_REVALIDATE_SECONDS,
    tags: ['guides'],
  },
);
