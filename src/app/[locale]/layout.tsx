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
      <head />
      <body className="w-full">
        <CustomThemeProvider>
          <div id="root">{children}</div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}


