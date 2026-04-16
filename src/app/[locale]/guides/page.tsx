import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getCachedGuides } from '@/lib/cached-content';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import { formatGuideDate, getGuidesUiCopy } from '@/lib/guides-ui';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import GuideReadButton from '@/components/GuideReadButton';
import { buildGuideCollectionMetadata, getLocaleLabel } from '@/lib/seo';
import { getLocaleHomePath } from '@/lib/site-config';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const localeLabel = getLocaleLabel(locale);
  return buildGuideCollectionMetadata(
    locale,
    `Password security guides in ${localeLabel} | generatepasswordto.me`,
    'Explore practical guides about strong passwords, password policies, incident response, and modern authentication hygiene.',
  );
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const labels = getGuidesUiLabels(locale);
  const uiCopy = getGuidesUiCopy(locale);
  const guides = await getCachedGuides(locale);

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: labels.home, href: getLocaleHomePath(locale) },
            { label: labels.guides },
          ]}
        />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{labels.guidesTitle}</h1>
        <p className="mt-4 max-w-3xl text-[16px] md:text-[18px] leading-7 text-[#425466] dark:text-[#c7c7c7]">
          {uiCopy.guidesIntro}
        </p>
        <div className="mt-5 rounded-24 border border-[#D9ECFF] dark:border-[#243447] bg-[#F8FCFF] dark:bg-[#10161d] p-4 md:p-5">
          <p className="text-sm md:text-base leading-6 text-[#2A4E63] dark:text-[#d7e4ef]">
            {uiCopy.guidesHelper}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide, index) => {
            return (
              <article
                key={guide.slug}
                className="group overflow-hidden rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_-20px_rgba(42,78,99,0.65)] hover:border-[#c7eefe] dark:hover:border-[#4b5563]"
              >
                <Link href={`/${locale}/guides/${guide.slug}`} className="block">
                  <div className="relative w-full overflow-hidden aspect-[16/7] bg-[#E5F6FF] dark:bg-[#111827]">
                    <Image
                      src={guide.image}
                      alt={uiCopy.imageAlt(guide.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                      fetchPriority={index < 2 ? 'high' : 'auto'}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="guide-category-label mt-3 text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9ca3af]">
                    {getGuideCategoryLabel(locale, guide.category)}
                  </div>
                  <h2 className="mt-1.5 text-lg font-semibold text-[#071016] dark:text-[#e0e0e0]">
                    <Link
                      href={`/${locale}/guides/${guide.slug}`}
                      className="rounded-sm !text-[#071016] dark:!text-[#e0e0e0] transition-all duration-200 hover:!text-[#2A4E63] dark:hover:!text-[#9bdfff] hover:underline underline-offset-4 decoration-2"
                    >
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-[#374151] dark:text-[#c7c7c7] line-clamp-2">{guide.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#2A4E63] dark:text-[#9ca3af]">
                    <span>{uiCopy.minRead(guide.readingMinutes)}</span>
                    <span>{uiCopy.updatedLabel}: {formatGuideDate(locale, guide.updatedAt)}</span>
                  </div>
                  <GuideReadButton
                    href={`/${locale}/guides/${guide.slug}`}
                    label={labels.readGuide}
                    loadingLabel={uiCopy.loadingLabel}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </LocalizedPageShell>
  );
}

