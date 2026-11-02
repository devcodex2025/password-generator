import type { Metadata } from 'next';
import seoData from '@/components/SeoData';

export const BASE_URL = 'https://www.generatepasswordto.me';

export const SUPPORTED_LANGS = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'] as const;

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
  vi: 'vi_VN',
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
  vi: 'vi',
};

// Keyword-first titles kept <= TITLE_BASE_MAX (35) so the brand suffix never
// truncates the phrase mid-word in SERPs.
const localizedMetaTitles: Record<string, string> = {
  en: 'Strong Random Password Generator',
  ua: 'Генератор надійних паролів онлайн',
  es: 'Generador de contraseñas seguras',
  fr: 'Générateur de mots de passe forts',
  de: 'Sicherer Passwort-Generator',
  it: 'Generatore di password sicure',
  pt: 'Gerador de senhas fortes',
  ru: 'Генератор надёжных паролей онлайн',
  zh: '密码生成器 – 在线生成强密码',
  ja: 'パスワード自動生成 – 無料オンライン',
  pl: 'Generator silnych haseł online',
  vi: 'Trình tạo mật khẩu mạnh',
};

const localizedMetaDescriptions: Record<string, string> = {
  en: 'Free online password generator: create strong, random passwords or memorable passphrases that meet NIST 800-63B. Generated locally in your browser — nothing is sent to a server.',
  ua: 'Безкоштовний генератор паролів онлайн: створюйте надійні випадкові паролі або парольні фрази за NIST 800-63B. Генерація локально у браузері — дані не надсилаються.',
  es: 'Generador de contraseñas online gratis: crea contraseñas aleatorias seguras o frases memorables según NIST 800-63B. Generado en tu navegador, sin enviar datos.',
  fr: 'Générateur de mots de passe gratuit : créez des mots de passe forts et aléatoires ou des phrases secrètes selon NIST 800-63B. Généré dans votre navigateur.',
  de: 'Kostenloser Passwort-Generator: starke, zufällige Passwörter oder merkbare Passphrasen nach NIST 800-63B. Lokal im Browser erzeugt – ohne Speicherung.',
  it: 'Generatore di password gratuito: crea password forti e casuali o passphrase memorabili secondo NIST 800-63B. Generato nel browser, senza salvataggio.',
  pt: 'Gerador de senhas grátis: crie senhas fortes e aleatórias ou frases memoráveis conforme NIST 800-63B. Gerado no navegador, sem armazenamento.',
  ru: 'Бесплатный генератор паролей онлайн: создавайте надёжные случайные пароли и парольные фразы по NIST 800-63B. Генерация локально в браузере.',
  zh: '免费在线密码生成器：创建符合 NIST 800-63B 的强随机密码或易记口令短语。浏览器本地生成，不上传服务器。',
  ja: '無料のパスワード生成ツール。NIST 800-63B 準拠の強力なランダムパスワードや覚えやすいパスフレーズを作成。ブラウザ内で生成し、送信しません。',
  pl: 'Darmowy generator haseł online: twórz silne, losowe hasła lub łatwe do zapamiętania frazy zgodnie z NIST 800-63B. Generowane lokalnie w przeglądarce.',
  vi: 'Trình tạo mật khẩu miễn phí: tạo mật khẩu mạnh, ngẫu nhiên hoặc cụm từ dễ nhớ theo NIST 800-63B. Tạo ngay trong trình duyệt, không gửi lên máy chủ.',
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
