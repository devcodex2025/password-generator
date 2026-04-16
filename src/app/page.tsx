import LocalePage from './[locale]/page';
import { BASE_URL, buildLocaleAlternates } from '@/lib/site-config';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Password generator | generatepasswordto.me',
  description: 'Generate strong passwords locally, review password strength instantly, and follow modern security guidance in every supported language.',
  alternates: {
    canonical: BASE_URL,
    languages: buildLocaleAlternates(),
  },
};

export default function RootPage() {
  return <LocalePage params={Promise.resolve({ locale: 'en' })} />;
}
