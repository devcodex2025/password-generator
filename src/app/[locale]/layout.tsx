import type { Metadata } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en','ua','es','fr','de','it','pt','ru','zh','ja','pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}/${locale}`.replace(/\/$/, '');

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        supportedLangs.map((lang) => [hreflangMap[lang] || lang, `${baseUrl}/${lang}`])
      ),
    },
    openGraph: {
      url: canonical,
      siteName: 'generatepasswordto.me',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="generatepasswordto.me" />
        <meta property="og:title" content="Generate Strong Passwords | generatepasswordto.me" />
        <meta property="og:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:url" content="https://generatepasswordto.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Generate Strong Passwords | generatepasswordto.me" />
        <meta name="twitter:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
        <meta name="twitter:image" content="/android-chrome-512x512.png" />
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


