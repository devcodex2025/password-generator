import type { Metadata, Viewport } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import NavigationProgress from '@/components/NavigationProgress';
import { Arsenal, Varela_Round, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import { buildHomeMetadata, SUPPORTED_LANGS, HTML_LANG_MAP } from '@/lib/home-metadata';
import HomeStructuredData from '@/components/seo/HomeStructuredData';

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = buildHomeMetadata(locale);
  const htmlLang = HTML_LANG_MAP[locale] || 'en';
  const title = typeof base.title === 'string' ? base.title : '';
  const description = typeof base.description === 'string' ? base.description : '';
  const canonical = base.alternates?.canonical ? String(base.alternates.canonical) : '';

  return {
    ...base,
    other: {
      ...(base.other ?? {}),
      'dc.title': title,
      'dc.description': description,
      'dc.language': htmlLang,
      'dc.identifier': canonical,
    },
  };
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((locale) => ({ locale }));
}

// Unknown values in the [locale] segment must 404 instead of rendering a page
// (prevents soft-404 garbage URLs such as /{search_term_string} or /$ from being indexed).
export const dynamicParams = false;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const htmlLang = HTML_LANG_MAP[locale] || 'en';

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <style media="print">{`body{background:#fff!important;color:#000!important}header,footer,aside,.smart-ad-container,#cc-main{display:none!important}a{color:#000!important;text-decoration:underline}`}</style>
      </head>
      <body className={`${arsenal.variable} ${varelaRound.variable} ${notoSans.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('darkMode');
                  var isDark = saved !== null
                    ? JSON.parse(saved)
                    : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.cookie = 'theme=' + (isDark ? 'dark' : 'light') + '; path=/; max-age=31536000; samesite=lax';
                  document.documentElement.classList.toggle('dark', !!isDark);
                } catch (e) {}
              })();
            `,
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('consent', 'default', {
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                    analytics_storage: 'denied',
                    wait_for_update: 500,
                  });
                  try {
                    var cc = document.cookie.match(/(?:^|;\\s*)cc_cookie=([^;]+)/);
                    if (cc) {
                      var stored = JSON.parse(decodeURIComponent(cc[1]));
                      var cats = stored.categories || [];
                      var analytics = cats.indexOf('analytics') !== -1;
                      var marketing = cats.indexOf('marketing') !== -1;
                      if (analytics || marketing) {
                        gtag('consent', 'update', {
                          analytics_storage: analytics ? 'granted' : 'denied',
                          ad_storage: marketing ? 'granted' : 'denied',
                          ad_user_data: marketing ? 'granted' : 'denied',
                          ad_personalization: marketing ? 'granted' : 'denied',
                        });
                      }
                    }
                  } catch (e) {}
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        ) : null}
        <div suppressHydrationWarning className="w-full">
          <HomeStructuredData locale={locale} />
          <AppRouterCacheProvider options={{ key: 'mui' }}>
            <CustomThemeProvider>
              <NavigationProgress />
              {children}
            </CustomThemeProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}


