import type { Metadata } from 'next';
import { getAffiliateStrings } from '@/components/affiliate/affiliate-i18n';
import LocalizedPageShell from '@/components/LocalizedPageShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import NordPassAffiliatePromo from '@/components/affiliate/NordPassAffiliatePromo';

const baseUrl = 'https://www.generatepasswordto.me';
const hreflangMap: Record<string, string> = { ua: 'uk' };
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];

export const runtime = 'nodejs';

export function generateStaticParams() {
  return supportedLangs.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getAffiliateStrings(locale);
  const canonical = `${baseUrl}/${locale}/best-password-managers-2026`;

  return {
    title: t.pageTitle,
    description: t.pageDescription,
    keywords: [
      'best password manager 2026',
      'NordPass review',
      'NordPass vs 1Password',
      'password manager comparison',
      'NordPass affiliate',
    ],
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          supportedLangs.map((lang) => [
            hreflangMap[lang] || lang,
            `${baseUrl}/${lang}/best-password-managers-2026`,
          ]),
        ),
        'x-default': `${baseUrl}/en/best-password-managers-2026`,
      },
    },
    openGraph: {
      title: t.pageTitle,
      description: t.pageDescription,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'article',
      images: [
        {
          url: `${baseUrl}/images/generate-password-preview.png`,
          width: 1200,
          height: 630,
          alt: t.pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.pageTitle,
      description: t.pageDescription,
      images: [`${baseUrl}/images/generate-password-preview.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* ── Breadcrumb i18n ── */

const breadcrumbHome: Record<string, string> = {
  en: 'Home', ua: 'Головна', es: 'Inicio', fr: 'Accueil', de: 'Startseite',
  it: 'Home', pt: 'Início', ru: 'Главная', zh: '首页', ja: 'ホーム', pl: 'Strona główna',
};

const breadcrumbPage: Record<string, string> = {
  en: 'Best Password Managers 2026',
  ua: 'Кращі менеджери паролів 2026',
  es: 'Mejores gestores 2026',
  fr: 'Meilleurs gestionnaires 2026',
  de: 'Beste Passwort-Manager 2026',
  it: 'Migliori gestori 2026',
  pt: 'Melhores gerenciadores 2026',
  ru: 'Лучшие менеджеры 2026',
  zh: '2026最佳密码管理器',
  ja: '2026年ベストパスワードマネージャー',
  pl: 'Najlepsze menedżery 2026',
};

export default async function BestPasswordManagersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getAffiliateStrings(locale);
  const canonical = `${baseUrl}/${locale}/best-password-managers-2026`;

  /* ── JSON-LD: Product + Review ── */
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NordPass Password Manager',
    description: t.nordpassReviewText,
    brand: { '@type': 'Brand', name: 'NordPass' },
    url: 'https://nordpass.com',
    image: `${baseUrl}/images/generate-password-preview.png`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '35.88',
      priceCurrency: 'USD',
      offerCount: 3,
      availability: 'https://schema.org/InStock',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4.7',
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Organization',
        name: 'Generate Password To Me',
        url: baseUrl,
      },
      reviewBody: t.sectionVerdictText,
      datePublished: '2026-04-16',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '3200',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbHome[locale] || breadcrumbHome.en,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbPage[locale] || breadcrumbPage.en,
        item: canonical,
      },
    ],
  };

  return (
    <LocalizedPageShell locale={locale}>
      <script
        id="product-review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        id="breadcrumb-schema-pm"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: breadcrumbHome[locale] || breadcrumbHome.en, href: `/${locale}` },
            { label: breadcrumbPage[locale] || breadcrumbPage.en },
          ]}
        />

        {/* Hero */}
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-[#071016] dark:text-[#e0e0e0]">
          {t.pageH1}
        </h1>
        <p className="mt-4 text-lg text-[#374151] dark:text-[#c7c7c7] leading-8">
          {t.pageIntro}
        </p>

        {/* Section: Why */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionWhyTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionWhyText}
          </p>
        </section>

        {/* Section: NordPass Review */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.nordpassReviewTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.nordpassReviewText}
          </p>
        </section>

        {/* Section: Comparison */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionCompareTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionCompareText}
          </p>
        </section>

        {/* Affiliate promo block with comparison table + CTAs */}
        <NordPassAffiliatePromo
          locale={locale}
          className="mt-8"
          affiliateUrl={process.env.NEXT_PUBLIC_NORDPASS_AFFILIATE_URL}
          affiliateB2bUrl={process.env.NEXT_PUBLIC_NORDPASS_B2B_AFFILIATE_URL}
        />

        {/* Section: Verdict */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
            {t.sectionVerdictTitle}
          </h2>
          <p className="mt-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
            {t.sectionVerdictText}
          </p>
        </section>
      </article>
    </LocalizedPageShell>
  );
}
