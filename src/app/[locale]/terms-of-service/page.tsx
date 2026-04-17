import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams() {
  return STATIC_PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const canonical = `${baseUrl}/${locale}/terms-of-service`;
  return {
    title: copy.termsOfService,
    description: copy.termsIntro,
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
      description: copy.termsIntro,
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

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: copy.home, href: `/${locale}` },
            { label: copy.termsOfService },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.termsTitle}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{copy.termsIntro}</p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-[#374151] dark:text-[#c7c7c7]">
            {copy.termsBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      </section>
    </LocalizedPageShell>
  );
}
