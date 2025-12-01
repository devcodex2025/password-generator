

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAvailableLanguages } from '@/utils/languageUtils';

export default function RootPage() {
  const headersList = headers();
  const browserLanguage = headersList.get('accept-language')?.split(',')[0].split('-')[0];
  const supportedLanguages = getAvailableLanguages();
  const mappedLanguage = browserLanguage === 'uk' ? 'ua' : browserLanguage;
  const defaultLanguage = supportedLanguages.includes(mappedLanguage) ? mappedLanguage : 'en';

  redirect(`/${defaultLanguage}`);
}