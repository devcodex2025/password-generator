import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ARTICLE_CATALOG, SUPPORTED_CONTENT_LANGUAGES } from '@/content/articles';
import { getCachedGuide, getCachedGuides } from '@/lib/cached-content';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import { formatGuideDate, getGuidesUiCopy } from '@/lib/guides-ui';
import { createGuideLinkTargets, createInterlinkState, renderGuideTextWithLinks } from '@/lib/guides-interlinking';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';

const baseUrl = 'https://www.generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };
export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams() {
  return SUPPORTED_CONTENT_LANGUAGES.flatMap((locale) =>
    ARTICLE_CATALOG.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = await getCachedGuide(slug, locale);

  if (!guide) {
    return {};
  }

  const canonical = `${baseUrl}/${locale}/guides/${slug}`;

  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    keywords: guide.keywords,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        SUPPORTED_CONTENT_LANGUAGES.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}/guides/${slug}`])
      ),
    },
    openGraph: {
      title: guide.seoTitle,
      description: guide.seoDescription,
      url: canonical,
      type: 'article',
      images: [
        {
          url: guide.image,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const labels = getGuidesUiLabels(locale);
  const uiCopy = getGuidesUiCopy(locale);
  const guide = await getCachedGuide(slug, locale);
  const allGuides = await getCachedGuides(locale);

  if (!guide) {
    notFound();
  }

  const linkTargets = createGuideLinkTargets(locale, guide.slug, allGuides);
  const interlinkState = createInterlinkState(7);

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: labels.home, href: `/${locale}` },
            { label: labels.guides, href: `/${locale}/guides` },
            { label: guide.title },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <div className="guide-category-label text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9ca3af]">
            {getGuideCategoryLabel(locale, guide.category)}
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{guide.title}</h1>
          <div className="mt-5 relative w-full overflow-hidden rounded-16 aspect-[40/21] bg-[#E5F6FF] dark:bg-[#111827]">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7]">
            {renderGuideTextWithLinks(guide.excerpt, linkTargets, interlinkState, 'excerpt')}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#2A4E63] dark:text-[#9ca3af]">
            <span>{uiCopy.minRead(guide.readingMinutes)}</span>
            <span>{uiCopy.updatedLabel}: {formatGuideDate(locale, guide.updatedAt)}</span>
            <span>{uiCopy.authorLabel}: {guide.author}</span>
          </div>

          <div className="mt-8 space-y-8">
            {guide.sections.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[#374151] dark:text-[#c7c7c7] leading-7">
                      {renderGuideTextWithLinks(paragraph, linkTargets, interlinkState, `paragraph-${index}-${pIndex}`)}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-[#374151] dark:text-[#c7c7c7]">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>
                        {renderGuideTextWithLinks(bullet, linkTargets, interlinkState, `bullet-${index}-${bIndex}`)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

        </article>
      </section>
    </LocalizedPageShell>
  );
}
