import type { Metadata, Viewport } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';
import Script from 'next/script';
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
  return buildHomeMetadata(locale);
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((locale) => ({ locale }));
}

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
    <>
      <Script
        id="locale-lang-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${htmlLang}";`,
        }}
      />
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
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true,
                });
              `,
            }}
          />
        </>
      ) : null}
      <div
        suppressHydrationWarning
        className={`w-full ${arsenal.variable} ${varelaRound.variable} ${notoSans.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}
      >
        <HomeStructuredData locale={locale} />
        <CustomThemeProvider>
          <NavigationProgress />
          {children}
        </CustomThemeProvider>
      </div>
    </>
  );
}


