

import { headers } from 'next/headers';
import { getAvailableLanguages } from '@/utils/languageUtils';
import LocaleRedirect from './LocaleRedirect';

export default async function RootPage() {
  const headersList = await headers();
  const browserLanguage = headersList.get('accept-language')?.split(',')[0].split('-')[0];
  const supportedLanguages = getAvailableLanguages();
  const mappedLanguage = browserLanguage === 'uk' ? 'ua' : browserLanguage;
  const defaultLanguage =
    typeof mappedLanguage === 'string' && supportedLanguages.includes(mappedLanguage)
      ? mappedLanguage
      : 'en';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <LocaleRedirect locale={defaultLanguage} />
      <p className="max-w-xl text-lg font-medium text-gray-900 dark:text-white">
        Redirecting you to the localized password generator ({defaultLanguage})...
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        If the redirect does not happen automatically, click{' '}
        <a href={`/${defaultLanguage}`} className="font-semibold text-blue-600 hover:underline">
          here
        </a>
        .
      </p>
    </main>
  );
}
