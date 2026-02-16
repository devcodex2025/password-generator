import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { contentRepository } from '@/lib/content-repository';
import { getGuideCategoryLabel, getGuidesUiLabels } from '@/lib/guides-i18n';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';

const baseUrl = 'https://www.generatepasswordto.me';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}/${locale}/guides`;

  return {
    title: 'Password Security Guides',
    description: 'In-depth guides about password security, compliance, and account protection best practices.',
    alternates: {
      canonical,
    },
  };
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const labels = getGuidesUiLabels(locale);
  const guides = await contentRepository.listGuides(locale);

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: labels.home, href: `/${locale}` },
            { label: labels.guides },
          ]}
        />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{labels.guidesTitle}</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide) => {
            return (
              <article
                key={guide.slug}
                className="rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#1c1c1c] p-5"
              >
                <Link href={`/${locale}/guides/${guide.slug}`} className="block">
                  <div className="relative w-full overflow-hidden rounded-16 aspect-[40/21] bg-[#E5F6FF] dark:bg-[#111827]">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="guide-category-label mt-4 text-xs uppercase tracking-wide text-[#2A4E63] dark:text-[#9ca3af]">
                  {getGuideCategoryLabel(locale, guide.category)}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{guide.title}</h2>
                <p className="mt-2 text-sm text-[#374151] dark:text-[#c7c7c7]">{guide.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-[#2A4E63] dark:text-[#9ca3af]">
                  <span>{guide.readingMinutes} min read</span>
                  <span>Updated: {guide.updatedAt}</span>
                </div>
                <Link
                  href={`/${locale}/guides/${guide.slug}`}
                  className="mt-4 inline-block rounded-24 bg-[#2A4E63] text-white hover:text-white dark:bg-[#05a9ff] dark:text-[#071016] dark:hover:text-[#071016] px-4 py-2 text-sm font-semibold [&::after]:content-none hover:underline underline-offset-4"
                >
                  {labels.readGuide}
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </LocalizedPageShell>
  );
}
