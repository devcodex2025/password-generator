import LocalePage from './[locale]/page';

const baseUrl = 'https://www.generatepasswordto.me';
const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Password generator | generatepasswordto.me',
  description: 'Generate strong, secure passwords quickly with generatepasswordto.me.',
  alternates: {
    canonical: baseUrl,
    languages: {
      ...Object.fromEntries(
        supportedLangs.map((lang) => [hreflangMap[lang] || lang, lang === 'en' ? baseUrl : `${baseUrl}/${lang}`])
      ),
      'x-default': baseUrl,
    },
  },
};

export default function RootPage() {
  return <LocalePage params={Promise.resolve({ locale: 'en' })} />;
}
