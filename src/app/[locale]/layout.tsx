import type { Metadata } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';
import seoData from '@/components/SeoData';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}/${locale}`.replace(/\/$/, '');

  // Отримуємо локалізовані SEO дані
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
          url: '/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'Generate Password To Me Logo',
        },
      ],
      locale: locale === 'ua' ? 'uk_UA' : locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/android-chrome-512x512.png'],
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

  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/welcome-img.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/vector-bg.svg" type="image/svg+xml" />
        {/* <meta property="og:type" content="website" />
        <meta property="og:site_name" content="generatepasswordto.me" />
        <meta property="og:title" content="Generate Strong Passwords | generatepasswordto.me" />
        <meta property="og:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:url" content="https://generatepasswordto.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Generate Strong Passwords | generatepasswordto.me" />
        <meta name="twitter:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
        <meta name="twitter:image" content="/android-chrome-512x512.png" /> */}
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
      <body className="w-full">
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}


