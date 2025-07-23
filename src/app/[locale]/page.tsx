'use client';

import { Suspense, use } from 'react'; // Add use from react
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
import SEO from '@/components/SEO';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>; // Update params to be a Promise
}
export default function Page({ params }: PageProps) {
  const { locale } = use(params);
  const { isDarkMode } = useTheme();
  const router = useRouter();
  // Define onLanguageChange to handle language changes from Header
  const onLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    router.push(`/${newLanguage}`);
  };

  return (
    <CustomThemeProvider>
      <I18nextProvider i18n={i18n}>
        <SEO />
        <div className={`container ${locale} mx-auto px-3`}>
          <Header
            onLanguageChange={onLanguageChange}
            currentLanguage={locale}
          />
          <main className="w-full">
            <Analytics />
            <PasswordGenerator />
            <Suspense fallback={null}>
              <AdBanner language={locale} isDarkMode={isDarkMode} />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded" />}>
              <SeoAccordion language={locale} />
            </Suspense>
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