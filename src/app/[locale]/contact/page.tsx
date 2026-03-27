import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactCaptcha from '@/components/ContactCaptcha';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';

const baseUrl = 'https://www.generatepasswordto.me';
const contactEmail = 'support@generatepasswordto.me';

export const runtime = 'nodejs';
export const revalidate = 3600;

export function generateStaticParams() {
  return STATIC_PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  return {
    title: copy.contact,
    description: copy.contactIntro,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);

  return (
    <LocalizedPageShell locale={locale}>
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: copy.home, href: `/${locale}` },
            { label: copy.contact },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.contactTitle}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{copy.contactIntro}</p>
          <div className="mt-6 rounded-16 bg-[#F8FDFF] dark:bg-[#111827] border border-[#E5F6FF] dark:border-[#374151] p-4">
            <ContactCaptcha locale={locale} email={contactEmail} emailLabel={copy.contactEmailLabel} />
          </div>
          <p className="mt-2 text-sm text-[#4b5563] dark:text-[#9ca3af]">{copy.contactResponseLabel}</p>
        </article>
      </section>
    </LocalizedPageShell>
  );
}
