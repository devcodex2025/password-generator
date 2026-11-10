import '@/styles/index.css';
import type { Metadata, Viewport } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import NavigationProgress from '@/components/NavigationProgress';
import { buildHomeMetadata, HTML_LANG_MAP } from '@/lib/home-metadata';
import HomeStructuredData from '@/components/seo/HomeStructuredData';
import AdSenseLoader from '@/components/Advertising/AdSenseLoader';
import CookieConsentMount from '@/components/CookieConsent/CookieConsentMount';
import { SpeedInsights } from '@vercel/speed-insights/next';

/*
  Shared <html> document for every locale tree. The Latin tree (src/app/(latin)) and the
  CJK tree (src/app/(cjk)/cjk) each have their own root layout so only the CJK tree loads
  the Noto Sans JP/SC stylesheets; both render this document with their own font classes.
*/
export async function localeMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
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

export const localeViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

/*
  Runs in <head>, before <body> is parsed and therefore before the first paint.
  next/script strategy="beforeInteractive" does not inline in the App Router: it
  is serialised into self.__next_s and executed by the client runtime after the
  first paint, which is what produced the light-theme flash for dark users.
  The server never renders the dark class, so this stays a client concern and
  the 12 locales keep their static generation.
*/
const THEME_INIT_SCRIPT = `
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
`;

export function LocaleDocument({
  locale,
  fontClassName,
  children,
}: {
  locale: string;
  fontClassName: string;
  children: React.ReactNode;
}) {
  const htmlLang = HTML_LANG_MAP[locale] || 'en';

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <style media="print">{`body{background:#fff!important;color:#000!important}header,footer,aside,.smart-ad-container,#cc-main{display:none!important}a{color:#000!important;text-decoration:underline}`}</style>
      </head>
      <body className={fontClassName}>
        {/*
          Consent Mode v2 defaults must be set before any Google tag (AdSense,
          GA) runs, regardless of whether GA is configured.
        */}
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
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
            `,
          }}
        />
        <AdSenseLoader />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            {/*
              GA is third-party and not needed for the first paint. Loading it
              after window load keeps it out of the LCP critical path; consent
              defaults to denied until the CMP updates it.
            */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script
              id="gtag-config"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
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
        <SpeedInsights />
        <CookieConsentMount language={locale} />
      </body>
    </html>
  );
}
