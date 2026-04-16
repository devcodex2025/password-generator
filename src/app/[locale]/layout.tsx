import type { Metadata, Viewport } from 'next';
import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';
import seoData from '@/components/SeoData';
import Script from 'next/script';
import NavigationProgress from '@/components/NavigationProgress';
import { Arsenal, Varela_Round, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import JsonLd from '@/components/JsonLd';
import HtmlLangSync from '@/components/HtmlLangSync';
import { BASE_URL, BRAND_NAME, SUPPORTED_LOCALES, buildLocaleAlternates, getLocaleBaseUrl, normalizeLocale } from '@/lib/site-config';
import { buildOrganizationSchema, buildWebsiteSchema } from '@/lib/seo';

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

const BRAND = BRAND_NAME;
const META_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 155;
const TITLE_SUFFIX = ` | ${BRAND}`;
const TITLE_BASE_MAX = Math.max(1, META_TITLE_MAX - TITLE_SUFFIX.length);
const DEFAULT_META_TITLE_BASE = 'Password generator';
const DEFAULT_META_DESCRIPTION = 'Generate strong, secure passwords quickly with generatepasswordto.me.';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const stripBrandSuffix = (value: string) => {
  const suffixPattern = new RegExp(`\\s*\\|\\s*${escapeRegExp(BRAND)}\\s*$`, 'i');
  return (value || '').replace(suffixPattern, '').trim();
};

const truncateTitleBase = (value: string, max: number) => {
  const trimmed = (value || '').trim();
  if (!trimmed) return '';
  if (trimmed.length <= max) return trimmed;
  const truncated = trimmed.slice(0, max);
  const boundary = truncated.lastIndexOf(' ');
  const result = boundary > 0 ? truncated.slice(0, boundary) : truncated;
  return result.trim();
};

const buildMetaTitle = (rawTitle?: string) => {
  const baseValue = stripBrandSuffix(rawTitle || '');
  const truncated = truncateTitleBase(baseValue || DEFAULT_META_TITLE_BASE, TITLE_BASE_MAX);
  const finalBase = truncated || DEFAULT_META_TITLE_BASE;
  return `${finalBase}${TITLE_SUFFIX}`;
};

const buildMetaDescription = (rawDescription?: string) => {
  const source = (rawDescription || DEFAULT_META_DESCRIPTION).trim();
  if (!source) return DEFAULT_META_DESCRIPTION;
  if (source.length <= META_DESCRIPTION_MAX) return source;
  const truncated = source.slice(0, META_DESCRIPTION_MAX);
  const boundary = truncated.lastIndexOf(' ');
  const clipped = boundary > 0 ? truncated.slice(0, boundary) : truncated;
  return clipped.trim();
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const canonical = getLocaleBaseUrl(normalizedLocale).replace(/\/$/, '');

  const seoInfo = seoData.find((data) => data.language === normalizedLocale) || seoData.find((data) => data.language === 'en');
  const metaTitle = buildMetaTitle(seoInfo?.title);
  const metaDescription = buildMetaDescription(seoInfo?.description);
  const keywords = seoInfo?.keywords || ['password generator', 'strong password', 'secure password', 'random password', 'password strength'];

  return {
    metadataBase: new URL(BASE_URL),
    title: metaTitle,
    description: metaDescription,
    keywords,
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
      languages: buildLocaleAlternates(),
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
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

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
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
  const normalizedLocale = normalizeLocale(locale);

  return (
    <>
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
        <HtmlLangSync locale={normalizedLocale} />
        <JsonLd id="organization-schema" data={buildOrganizationSchema()} />
        <JsonLd id="website-schema" data={buildWebsiteSchema(normalizedLocale)} />
        <CustomThemeProvider>
          <NavigationProgress />
          {children}
        </CustomThemeProvider>
      </div>
    </>
  );
}


