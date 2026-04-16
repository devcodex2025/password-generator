import { Fragment } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ARTICLE_CATALOG, SUPPORTED_CONTENT_LANGUAGES } from '@/content/articles';
import { getCachedGuide, getCachedGuides } from '@/lib/cached-content';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import { formatGuideDate, getGuidesUiCopy } from '@/lib/guides-ui';
import {
  createGuideLinkTargets,
  createInterlinkState,
  renderGuideTextWithLinks,
} from '@/lib/guides-interlinking';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  GuideInterlinkEntry,
  GuideInterlinkPlacement,
  getGuideInterlinkEntries,
  resolveGuideInterlinkHref,
} from '@/lib/guides-interlink-plan';
import { getLocalizedInterlinkAnchor } from '@/lib/interlinking-anchors';
import { getPlacementLabel } from '@/lib/interlinking-placements';
import JsonLd from '@/components/JsonLd';
import { BASE_URL, buildLocaleAlternates, getLocaleHomePath, normalizeLocale } from '@/lib/site-config';
import { buildGuideArticleSchema } from '@/lib/seo';

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

  const normalizedLocale = normalizeLocale(locale);
  const canonical = `${BASE_URL}/${normalizedLocale}/guides/${slug}`;

  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    keywords: guide.keywords,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(`${normalizedLocale}/guides/${slug}`),
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

function GuideInterlinkBlock({
  entries,
  locale,
  placement,
}: {
  entries: GuideInterlinkEntry[];
  locale: string;
  placement: GuideInterlinkPlacement;
}) {
  if (!entries.length) {
    return null;
  }

  return (
    <div className="mt-5 rounded-24 border border-[#D1E9FF] dark:border-[#1f334a] bg-[#F0F8FF] dark:bg-[#0A1A2B] p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9bdfff]">
        {getPlacementLabel(locale, placement)}
      </p>
      <div className="mt-2 space-y-2 text-sm text-[#071016] dark:text-[#d6e8ff]">
        {entries.map((entry) => (
          <p key={`${entry.anchorKey}-${entry.kind}-${entry.kind === 'guide' ? entry.target : ''}`}>
            <Link
              href={resolveGuideInterlinkHref(locale, entry)}
              className="font-semibold underline underline-offset-4 decoration-2 decoration-sky-500/70 dark:decoration-sky-300/80 transition-colors hover:text-[#1f3b4c] dark:hover:text-white"
            >
              {getLocalizedInterlinkAnchor(locale, entry.anchorKey)}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
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
  const interlinkEntries = getGuideInterlinkEntries(guide.slug);
  const introEntries = interlinkEntries.filter((entry) => entry.placement === 'intro');
  const bodyEntries = interlinkEntries.filter((entry) => entry.placement === 'body');
  const conclusionEntries = interlinkEntries.filter((entry) => entry.placement === 'conclusion');
  const articleSections = guide.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    heading: section.heading,
  }));
  const normalizedLocale = normalizeLocale(locale);
  const canonical = `${BASE_URL}/${normalizedLocale}/guides/${slug}`;
  const articleSchema = buildGuideArticleSchema({
    locale: normalizedLocale,
    title: guide.seoTitle,
    description: guide.seoDescription,
    url: canonical,
    image: guide.image.startsWith('http') ? guide.image : `${BASE_URL}${guide.image}`,
    dateModified: guide.updatedAt,
    author: guide.author,
  });

  return (
    <LocalizedPageShell locale={locale}>
      <JsonLd id={`guide-schema-${slug}`} data={articleSchema} />
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: labels.home, href: getLocaleHomePath(locale) },
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
              alt={uiCopy.imageAlt(guide.title)}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-5">
            <div>
              <div className="rounded-24 border border-[#D9ECFF] dark:border-[#243447] bg-[#F8FCFF] dark:bg-[#10161d] p-4 md:p-5">
                <p className="text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9bdfff]">
                  {uiCopy.articleSummaryLabel}
                </p>
                <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">
                  {renderGuideTextWithLinks(guide.excerpt, linkTargets, interlinkState, 'excerpt')}
                </p>
              </div>
            </div>
            <aside className="rounded-24 border border-[#D9ECFF] dark:border-[#243447] bg-[#F8FCFF] dark:bg-[#10161d] p-4 md:p-5 h-fit">
              <p className="text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9bdfff]">
                {uiCopy.contentsLabel}
              </p>
              <nav className="mt-3 space-y-2">
                {articleSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm leading-6 text-[#2A4E63] dark:text-[#d7e4ef] underline-offset-4 hover:underline"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </aside>
          </div>

          <GuideInterlinkBlock entries={introEntries} locale={locale} placement="intro" />

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#2A4E63] dark:text-[#9ca3af]">
            <span>{uiCopy.minRead(guide.readingMinutes)}</span>
            <span>{uiCopy.updatedLabel}: {formatGuideDate(locale, guide.updatedAt)}</span>
            <span>{uiCopy.authorLabel}: {guide.author}</span>
          </div>

          <div className="mt-8 space-y-8">
            {guide.sections.map((section, index) => (
              <Fragment key={`${section.heading}-${index}`}>
                <section id={`section-${index + 1}`}>
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
                {index === 0 && <GuideInterlinkBlock entries={bodyEntries} locale={locale} placement="body" />}
              </Fragment>
            ))}
            <GuideInterlinkBlock entries={conclusionEntries} locale={locale} placement="conclusion" />
            <div className="rounded-24 border border-[#D9ECFF] dark:border-[#243447] bg-[#F8FCFF] dark:bg-[#10161d] p-5 md:p-6">
              <p className="text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9bdfff]">
                {uiCopy.nextStepsLabel}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/guides`}
                  className="inline-flex items-center justify-center rounded-24 bg-[#2A4E63] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f3b4c]"
                >
                  {uiCopy.backToGuidesLabel}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center rounded-24 border border-[#2A4E63] dark:border-[#9bdfff] px-4 py-2 text-sm font-semibold text-[#2A4E63] dark:text-[#9bdfff] transition hover:bg-[#E5F6FF] dark:hover:bg-[#0A1A2B]"
                >
                  {uiCopy.contactLabel}
                </Link>
              </div>
            </div>
          </div>

        </article>
      </section>
    </LocalizedPageShell>
  );
}
