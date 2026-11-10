import { LocaleDocument, localeMetadata, localeViewport } from '@/components/LocaleDocument';
import { arsenal, varelaRound, notoSans } from '@/lib/fonts';
import { SUPPORTED_LANGS } from '@/lib/home-metadata';
import { isCjkLocale } from '@/lib/cjk-locales';

export const generateMetadata = localeMetadata;
export const viewport = localeViewport;

export function generateStaticParams() {
  return SUPPORTED_LANGS.filter((locale) => !isCjkLocale(locale)).map((locale) => ({ locale }));
}

// Unknown values in the [locale] segment must 404 instead of rendering a page
// (prevents soft-404 garbage URLs such as /{search_term_string} or /$ from being indexed).
export const dynamicParams = false;

const fontClassName = `${arsenal.variable} ${varelaRound.variable} ${notoSans.variable}`;

export default async function LatinLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LocaleDocument locale={locale} fontClassName={fontClassName}>
      {children}
    </LocaleDocument>
  );
}
