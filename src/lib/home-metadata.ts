import type { Metadata } from 'next';
import seoData from '@/components/SeoData';

export const BASE_URL = 'https://www.generatepasswordto.me';

export const SUPPORTED_LANGS = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'] as const;

export const HREFLANG_MAP: Record<string, string> = { ua: 'uk' };

export const OG_LOCALE_MAP: Record<string, string> = {
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

const BRAND = 'generatepasswordto.me';
const META_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 155;
const TITLE_SUFFIX = ` | ${BRAND}`;
const TITLE_BASE_MAX = Math.max(1, META_TITLE_MAX - TITLE_SUFFIX.length);
const DEFAULT_META_TITLE_BASE = 'Password generator';
const DEFAULT_META_DESCRIPTION = 'Generate strong, secure passwords quickly with generatepasswordto.me.';

export const HTML_LANG_MAP: Record<string, string> = {
  en: 'en',
  ua: 'uk',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ru: 'ru',
  zh: 'zh',
  ja: 'ja',
  pl: 'pl',
};

// Keyword-first titles kept <= TITLE_BASE_MAX (35) so the brand suffix never
// truncates the phrase mid-word in SERPs.
const localizedMetaTitles: Record<string, string> = {
  en: 'Free Secure Password Generator',
  ua: 'Генератор паролів онлайн',
  es: 'Generador de contraseñas seguras',
  fr: 'Générateur de mots de passe',
  de: 'Sicherer Passwort-Generator',
  it: 'Generatore di password sicure',
  pt: 'Gerador de senhas seguras',
  ru: 'Генератор паролей онлайн',
  zh: '安全密码生成器 – 在线创建强密码',
  ja: '安全なパスワード生成 – 無料オンライン',
  pl: 'Generator haseł online',
};

const localizedMetaDescriptions: Record<string, string> = {
  en: 'Free online password generator. Create strong, random passwords that meet NIST 800-63B standards. No data stored – generated locally in your browser.',
  ua: 'Безкоштовний онлайн-генератор паролів. Створюйте надійні випадкові паролі за NIST 800-63B. Без зберігання даних – генерація локально у браузері.',
  es: 'Generador de contraseñas online gratuito. Crea contraseñas seguras y aleatorias según NIST 800-63B. Sin almacenamiento – generado en tu navegador.',
  fr: 'Générateur de mots de passe gratuit en ligne. Créez des mots de passe forts et aléatoires conformes NIST 800-63B. Généré dans votre navigateur.',
  de: 'Kostenloser Online-Passwort-Generator. Erstellen Sie starke, zufällige Passwörter nach NIST 800-63B. Keine Datenspeicherung – lokal im Browser generiert.',
  it: 'Generatore di password online gratuito. Crea password forti e casuali conformi NIST 800-63B. Nessun dato archiviato – generato nel tuo browser.',
  pt: 'Gerador de senhas online gratuito. Crie senhas fortes e aleatórias conforme NIST 800-63B. Sem armazenamento – gerado localmente no navegador.',
  ru: 'Бесплатный онлайн-генератор паролей. Создавайте надёжные пароли по стандартам NIST 800-63B. Без хранения – генерация локально.',
  zh: '免费在线密码生成器。创建符合 NIST 800-63B 标准的强随机密码。无数据存储 – 在浏览器中本地生成。',
  ja: '無料オンラインパスワード生成。NIST 800-63B準拠の強力なランダムパスワード。データ保存なし – ブラウザでローカル生成。',
  pl: 'Darmowy generator haseł online. Tworzenie silnych, losowych haseł zgodnych z NIST 800-63B. Bez przechowywania – generowane lokalnie w przeglądarce.',
};

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

export function getLocalizedMetaDescription(locale: string): string {
  return localizedMetaDescriptions[locale] || localizedMetaDescriptions.en;
}

/**
 * Home / generator metadata (canonical, OG, Twitter, icons). Used by `[locale]/layout` and root `app/page`.
 */
export function buildHomeMetadata(locale: string): Metadata {
  const canonical = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`.replace(/\/$/, '');

  const metaTitle = localizedMetaTitles[locale]
    ? buildMetaTitle(localizedMetaTitles[locale])
    : buildMetaTitle(localizedMetaTitles.en);
  const metaDescription = localizedMetaDescriptions[locale]
    ? buildMetaDescription(localizedMetaDescriptions[locale])
    : buildMetaDescription(localizedMetaDescriptions.en);
  const seoInfo = seoData.find((data) => data.language === locale) || seoData.find((data) => data.language === 'en');
  const keywords = seoInfo?.keywords || [
    'password generator',
    'strong password',
    'secure password',
    'random password',
    'password strength',
  ];

  return {
    metadataBase: new URL(BASE_URL),
    title: metaTitle,
    description: metaDescription,
    keywords,
    other: {
      'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5995594246081561',
    },
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          SUPPORTED_LANGS.map((lang) => [HREFLANG_MAP[lang] || lang, lang === 'en' ? BASE_URL : `${BASE_URL}/${lang}`])
        ),
        'x-default': BASE_URL,
      },
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
      locale: OG_LOCALE_MAP[locale] || 'en_US',
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
