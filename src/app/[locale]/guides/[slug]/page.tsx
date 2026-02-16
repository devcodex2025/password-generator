import type { Metadata } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { SUPPORTED_CONTENT_LANGUAGES } from '@/content/articles';
import { contentRepository } from '@/lib/content-repository';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';

const baseUrl = 'https://www.generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function renderInlineBold(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;
    if (isBold) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = await contentRepository.getGuide(slug, locale);

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
  const guide = await contentRepository.getGuide(slug, locale);

  if (!guide) {
    notFound();
  }

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
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#1c1c1c] p-6 md:p-8">
          <div className="guide-category-label text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9ca3af]">
            {getGuideCategoryLabel(locale, guide.category)}
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{guide.title}</h1>
          <div className="mt-5 relative w-full overflow-hidden rounded-16 aspect-[40/21] bg-[#E5F6FF] dark:bg-[#111827]">
            <Image src={guide.image} alt={guide.title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
          </div>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7]">{renderInlineBold(guide.excerpt)}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#2A4E63] dark:text-[#9ca3af]">
            <span>{guide.readingMinutes} min read</span>
            <span>Updated: {guide.updatedAt}</span>
            <span>Author: {guide.author}</span>
          </div>

          <div className="mt-8 space-y-8">
            {guide.sections.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[#374151] dark:text-[#c7c7c7] leading-7">
                      {renderInlineBold(paragraph)}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-[#374151] dark:text-[#c7c7c7]">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{renderInlineBold(bullet)}</li>
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
