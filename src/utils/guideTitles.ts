import guidesContent from '../../content.json';

type GuideContentEntry = {
  slug: string;
  locale: string;
  title: string;
};

const guideTitleMap: Record<string, Record<string, string>> = {};

(guidesContent as GuideContentEntry[]).forEach(({ slug, locale, title }) => {
  if (!guideTitleMap[slug]) {
    guideTitleMap[slug] = {};
  }

  guideTitleMap[slug][locale] = title;
});

const formatSlug = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getGuideTitle = (slug: string, locale?: string) => {
  const normalizedLocale = (locale || 'en').toLowerCase();
  const localized = guideTitleMap[slug]?.[normalizedLocale];
  const fallback = guideTitleMap[slug]?.en;
  return localized || fallback || formatSlug(slug);
};
