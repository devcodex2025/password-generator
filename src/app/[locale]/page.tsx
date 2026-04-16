'use client';

import { Suspense, use, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/i18n';
import PasswordGenerator from '@/components/PasswordGenerator/PasswordGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/Advertising/Adbanner';
import AdBannerSecond from '@/components/Advertising/AdbannerSecond';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import { Analytics } from '@vercel/analytics/react';
import { useTheme } from '../../context/ThemeContext';

import { useRouter } from 'next/navigation';
import { getAvailableLanguages } from '@/utils/languageUtils';
import ShareBlock from '@/components/ShareBlock';
import JsonLd from '@/components/JsonLd';
import lang from '@/components/lang.json';
import { buildHomeSchemas } from '@/lib/seo';
import HomePageSections from '@/components/HomePageSections';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { locale } = use(params);
  const { isDarkMode } = useTheme();
  const supportedLanguages = getAvailableLanguages();
  const effectiveLocale = supportedLanguages.includes(locale) ? locale : 'en';
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const tCopy = (key: string) => {
    const rawEntry = (lang as Record<string, unknown>)[key];
    if (!rawEntry || typeof rawEntry !== 'object') {
      return '';
    }

    const langEntry = rawEntry as Record<string, string>;
    return stripHtml(langEntry[effectiveLocale] || langEntry.en || '');
  };
  const homeSchemas = buildHomeSchemas(
    effectiveLocale,
    [
      {
        q: tCopy('howtouse_title') || 'How to use the password generator?',
        a: [tCopy('howtouse_intro'), tCopy('howtouse_step1'), tCopy('howtouse_step2'), tCopy('howtouse_step3')]
          .filter(Boolean)
          .join(' '),
      },
      {
        q: tCopy('seotext_why_title') || 'Why use this password generator?',
        a: [tCopy('seotext_why1'), tCopy('seotext_why2')].filter(Boolean).join(' '),
      },
      {
        q: tCopy('security_standards_title') || 'Security standards compliance',
        a: [tCopy('nist_compliance_desc'), tCopy('pci_dss_compliance_desc')].filter(Boolean).join(' '),
      },
    ].filter((item) => item.q && item.a),
    [tCopy('howtouse_step1'), tCopy('howtouse_step2'), tCopy('howtouse_step3')],
  );

  useEffect(() => {
    if (i18n.language !== effectiveLocale) {
      void i18n.changeLanguage(effectiveLocale);
    }
  }, [effectiveLocale]);

  const onLanguageChange = (newLanguage: string) => {
    void i18n.changeLanguage(newLanguage);
    const target = newLanguage === 'en' ? '/' : `/${newLanguage}`;
    router.push(target);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`container ${locale} mx-auto px-3`}>
        <JsonLd id="homepage-schema" data={homeSchemas} />
        <Header onLanguageChange={onLanguageChange} currentLanguage={locale} />
        <main className="w-full">
          <Analytics />
          <PasswordGenerator language={locale} />
          <Suspense fallback={null}>
            <AdBanner language={locale} isDarkMode={isDarkMode} />
          </Suspense>
          <HomePageSections language={effectiveLocale} />
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
  );
}
