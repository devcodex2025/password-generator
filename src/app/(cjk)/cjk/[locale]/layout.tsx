import { LocaleDocument, localeMetadata, localeViewport } from '@/components/LocaleDocument';
import { arsenal, varelaRound, notoSans } from '@/lib/fonts';
import { notoSansJP, notoSansSC } from '@/lib/fonts-cjk';
import { CJK_LOCALES } from '@/lib/cjk-locales';

export const generateMetadata = localeMetadata;
export const viewport = localeViewport;

export function generateStaticParams() {
  return CJK_LOCALES.map((locale) => ({ locale }));
}

// Same guard as the Latin tree: only the generated zh and ja routes resolve.
export const dynamicParams = false;

const fontClassName = [arsenal, varelaRound, notoSans, notoSansJP, notoSansSC]
  .map((font) => font.variable)
  .join(' ');

export default async function CjkLocaleLayout({
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
