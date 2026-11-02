import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactCaptcha from '@/components/ContactCaptcha';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import { getStaticPageCopy, STATIC_PAGE_LOCALES } from '@/lib/static-pages-i18n';
import { CONTACT_COPY, FAQ_TITLE } from '@/lib/contact-i18n';

const baseUrl = 'https://www.generatepasswordto.me';
const contactEmail = 'support@generatepasswordto.me';
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
  const contactMeta = CONTACT_COPY[locale] ?? CONTACT_COPY.en;
  const canonical = `${baseUrl}/${locale}/contact`;
  return {
    title: copy.contact,
    description: contactMeta.intro.slice(0, 158),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          supportedLangs.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}/contact`])
        ),
        'x-default': `${baseUrl}/en/contact`,
      },
    },
    openGraph: {
      title: copy.contact,
      description: contactMeta.intro.slice(0, 158),
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getStaticPageCopy(locale);
  const contact = CONTACT_COPY[locale] ?? CONTACT_COPY.en;
  const canonical = `${baseUrl}/${locale}/contact`;

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: contactEmail,
    url: canonical,
    availableLanguage: supportedLangs,
  };

  const organizationContactSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Generate Password To Me',
    url: baseUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: contactEmail,
      url: canonical,
    },
    logo: `${baseUrl}/images/generate-password-preview.png`,
  };

  return (
    <LocalizedPageShell locale={locale}>
      <script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        id="organization-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationContactSchema) }}
      />
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: copy.home, href: `/${locale}` },
            { label: copy.contact },
          ]}
        />
        <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#1f2937] bg-white dark:bg-[#0f172a] p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.contactTitle}</h1>
          <p className="mt-4 text-[#374151] dark:text-[#c7c7c7] leading-7">{contact.intro}</p>
          <p className="mt-3 text-sm text-[#4b5563] dark:text-[#9ca3af] leading-6">{contact.before}</p>
          <div className="mt-6 rounded-16 bg-[#F8FDFF] dark:bg-[#111827] border border-[#E5F6FF] dark:border-[#1f2937] p-4">
            <ContactCaptcha locale={locale} email={contactEmail} emailLabel={copy.contactEmailLabel} />
          </div>
          <p className="mt-2 text-sm text-[#4b5563] dark:text-[#9ca3af]">{copy.contactResponseLabel}</p>

          <section className="mt-8 border-t border-[#E5F6FF] dark:border-[#1f2937] pt-6">
            <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
              {FAQ_TITLE[locale] ?? FAQ_TITLE.en}
            </h2>
            <dl className="mt-4 space-y-4">
              {contact.faq.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-[#071016] dark:text-[#e0e0e0]">{item.question}</dt>
                  <dd className="mt-1 text-[#374151] dark:text-[#c7c7c7] leading-7">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </section>
    </LocalizedPageShell>
  );
}
