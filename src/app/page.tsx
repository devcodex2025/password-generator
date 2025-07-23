'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAvailableLanguages } from '@/utils/languageUtils';
import i18n from '@/components/i18n';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const isRootPath = pathSegments[1] === '' || pathSegments[1] === undefined;

    if (isRootPath) {
      const browserLanguage = navigator.language.split(/[-_]/)[0];
      const supportedLanguages = getAvailableLanguages();
      const mappedLanguage = browserLanguage === 'uk' ? 'ua' : browserLanguage;
      const defaultLanguage = supportedLanguages.includes(mappedLanguage) ? mappedLanguage : 'en';

      // Синхронізуємо i18n
      if (i18n.language !== defaultLanguage) {
        i18n.changeLanguage(defaultLanguage);
      }

      // Перенаправляємо лише якщо не на правильному маршруті
      if (window.location.pathname !== `/${defaultLanguage}`) {
        router.push(`/${defaultLanguage}`);
      }
    }
  }, [router]);

  return null;
}