import type { Metadata } from 'next';
import { forParentLocale } from '@/lib/cjk-locales';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import AboutUs from '@/components/AboutUs';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowToUse from '@/components/HowToUse';
import { ABOUT_COPY } from '@/lib/about-i18n';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';
import { homeHref } from '@/lib/locale-links';

const baseUrl = 'https://www.generatepasswordto.me';
const contactEmail = 'support@generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams({ params }: { params?: { locale?: string } } = {}) {
  return forParentLocale(STATIC_PAGE_LOCALES, params).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.en;
  const canonical = `${baseUrl}/${locale}/about`;

  return {
    title: copy.title,
    description: copy.intro,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          STATIC_PAGE_LOCALES.map((lang) => [
            hreflangMap[lang] || lang,
            `${baseUrl}/${lang}/about`,
          ]),
        ),
        'x-default': `${baseUrl}/en/about`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.intro,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.en;
  const shellCopy = getStaticPageCopy(locale);

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-10">
        <Breadcrumbs
          language={locale}
          items={[
            { label: shellCopy.home, href: homeHref(locale) },
            { label: copy.title },
          ]}
        />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[#374151] dark:text-[#c7c7c7] leading-7">
          {copy.intro}
        </p>
        <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
          {copy.contact}{' '}
          <a className="underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
      </section>

      <AboutUs language={locale} />
      <WhyChooseUs language={locale} />
      <HowToUse language={locale} />
    </LocalizedPageShell>
  );
}
