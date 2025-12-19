'use client';

import { Suspense, use } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/i18n';
import PasswordGenerator from '@/components/PasswordGenerator/PasswordGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoAccordion from '@/components/SeoAccordion';
import AdBanner from '@/components/Advertising/Adbanner';
import AdBannerSecond from '@/components/Advertising/AdbannerSecond';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import { Analytics } from '@vercel/analytics/react';
import { CustomThemeProvider, useTheme } from '../../context/ThemeContext';

import { useRouter } from 'next/navigation';
import { getAvailableLanguages } from '@/utils/languageUtils';
import ShareBlock from '@/components/ShareBlock';
import React from 'react';

// Клонуємо i18n для ізоляції мови в межах запиту
// import { cloneDeep } from 'lodash';

interface PageProps {
  params: Promise<{ locale: string }>;
}
export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { locale } = use(params);
  const { isDarkMode } = useTheme();
  const supportedLanguages = getAvailableLanguages();

  // Синхронізація i18n із локаллю до рендерингу
  if (typeof window === 'undefined') {
    // Виконується на сервері
    if (supportedLanguages.includes(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    } else if (!supportedLanguages.includes(locale)) {
      i18n.changeLanguage('en');
    }
  }

  // Define onLanguageChange to handle language changes from Header
  const onLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    router.push(`/${newLanguage}`);
  };



  return (
    <CustomThemeProvider>
      <I18nextProvider i18n={i18n}>
        <div className={`container ${locale} mx-auto px-3`}>
          <Header
            onLanguageChange={onLanguageChange}
            currentLanguage={locale}
          />
          <main className="w-full">
            <Analytics />
            <PasswordGenerator language={locale} />
            <Suspense fallback={null}>
              <AdBanner language={locale} isDarkMode={isDarkMode} />
            </Suspense>
            <SeoAccordion language={locale} />
            <div className="max-w-6xl mx-auto px-4">
              <ShareBlock language={locale} className="mt-6" />
            </div>
            <Suspense fallback={null}>
              <AdBannerSecond language={locale} isDarkMode={isDarkMode} />
            </Suspense>
          </main>
          <Footer language={locale} />
          <Suspense fallback={null}>
            <CookieConsent language={locale} />
          </Suspense>
        </div>
      </I18nextProvider>
    </CustomThemeProvider>
  );
}