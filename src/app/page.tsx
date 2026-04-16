import LocalePage from './[locale]/page';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Secure Password Generator – Create Strong Passwords Online | generatepasswordto.me',
  description: 'Free online password generator. Create strong, random passwords that meet NIST 800-63B standards. No data stored – generated locally in your browser.',
  alternates: {
    canonical: baseUrl,
    languages: {
      ...Object.fromEntries(
        supportedLangs.map((lang) => [hreflangMap[lang] || lang, lang === 'en' ? baseUrl : `${baseUrl}/${lang}`])
      ),
      'x-default': baseUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};

export default function RootPage() {
  return <LocalePage params={Promise.resolve({ locale: 'en' })} />;
}
