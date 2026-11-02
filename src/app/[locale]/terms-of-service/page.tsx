import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';
import { LEGAL_COPY } from '@/lib/legal-i18n';
import { homeHref } from '@/lib/locale-links';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams() {
  return STATIC_PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const legal = LEGAL_COPY[locale] ?? LEGAL_COPY.en;
  const canonical = `${baseUrl}/${locale}/terms-of-service`;
  return {
    title: copy.termsOfService,
    description: legal.terms.intro.slice(0, 158),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          supportedLangs.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}/terms-of-service`])
        ),
        'x-default': `${baseUrl}/en/terms-of-service`,
      },
    },
    openGraph: {
      title: copy.termsOfService,
      description: legal.terms.intro.slice(0, 158),
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

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const legal = LEGAL_COPY[locale] ?? LEGAL_COPY.en;

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: copy.home, href: homeHref(locale) },
            { label: copy.termsOfService },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.termsTitle}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{legal.terms.intro}</p>
          {legal.terms.sections.map((section) => (
            <section key={section.heading} className="mt-6">
              <h2 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">{section.heading}</h2>
              <p className="mt-2 text-[#374151] dark:text-[#c7c7c7] leading-7">{section.body}</p>
            </section>
          ))}
        </article>
      </section>
    </LocalizedPageShell>
  );
}
