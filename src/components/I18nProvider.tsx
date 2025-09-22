'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 

export function I18nProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => setLoaded(true));
  }, [locale]);

  if (!loaded) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
