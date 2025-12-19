import type { Metadata } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';
import seoData from '@/components/SeoData';
import Script from 'next/script';
import lang from '@/components/lang.json';
import { Arsenal, Varela_Round, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';

const arsenal = Arsenal({ 
  subsets: ['cyrillic', 'latin'], 
  weight: ['400', '700'], 
  variable: '--font-arsenal',
  display: 'swap',
});

const varelaRound = Varela_Round({ 
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-varela-round',
  display: 'swap',
});

const notoSans = Noto_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };
const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  ua: 'uk_UA',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  ru: 'ru_RU',
  zh: 'zh_CN',
  ja: 'ja_JP',
  pl: 'pl_PL',
};

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}/${locale}`.replace(/\/$/, '');

  const seoInfo = seoData.find((data) => data.language === locale) || seoData.find((data) => data.language === 'en');
  const title = seoInfo?.title || 'Generate Strong Passwords | generatepasswordto.me';
  const description = seoInfo?.description || 'Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned. Free online password generator tool.';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | generatepasswordto.me',
      default: title
    },
    description: description,
    keywords: ['password generator', 'strong password', 'secure password', 'random password', 'password strength'],
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    other: {
      'google-adsense-account': 'ca-pub-5995594246081561',
    },
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    alternates: {
      canonical,
      languages: Object.fromEntries(
        supportedLangs.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}`])
      ),
    },
    openGraph: {
      title: title,
      description: description,
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'website',
      images: [
        {
          url: '/images/generate-password-preview.png',
          width: 1200,
          height: 630,
          alt: 'Generate Password To Me Preview',
        },
      ],
      locale: ogLocaleMap[locale] || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/images/generate-password-preview.png'],
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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const htmlLang = hreflangMap[locale] || locale;

  // Generate FAQ Schema data
  const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  const t = (key: string): string => {
    // @ts-expect-error - dynamic access to lang object
    const langEntry = lang[key];
    if (!langEntry || typeof langEntry !== 'object') return '';
    const raw = langEntry[locale];
    return stripHtml(raw || '');
  };

  const qa = [
    {
      q: t('howtouse_title') || 'How to use the password generator?',
      a: [t('howtouse_intro'), t('howtouse_step1'), t('howtouse_step2'), t('howtouse_step3')]
        .filter(Boolean)
        .join(' '),
    },
    {
      q: t('seotext_why_title') || 'Why use this password generator?',
      a: [t('seotext_why1'), t('seotext_why2')].filter(Boolean).join(' '),
    },
    {
      q: t('security_standards_title') || 'Security standards compliance',
      a: [t('nist_compliance_desc'), t('pci_dss_compliance_desc')].filter(Boolean).join(' '),
    },
  ].filter(item => item.q && item.a);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preload" as="image" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/welcome-img.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/vector-bg.svg" type="image/svg+xml" />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className={`w-full ${arsenal.variable} ${varelaRound.variable} ${notoSans.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
          strategy="beforeInteractive"
        />
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}


