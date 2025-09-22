'use client';

import { Suspense, use } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/i18n';
import seoData from '@/components/SeoData';
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
        <SEO />
        {/* FAQPage JSON-LD for GEO (localized) */}
        {(() => {
          const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          const t = (key: string) => {
            const raw = i18n.getResource(locale, 'translation', key) as string | undefined;
            return stripHtml(raw || '');
          };
          const qa = [
            {
              q: t('howtouse_title') || 'How to use the password generator?',
              a: [t('howtouse_intro'), t('howtouse_step1'), t('howtouse_step2'), t('howtouse_step3')]
                .filter(Boolean)
                .join(' '),
            },
            {
              q: t('seotext_why_title') || 'Why use this password generator?',
              a: [t('seotext_why1'), t('seotext_why2')].filter(Boolean).join(' '),
            },
            {
              q: t('security_standards_title') || 'Security standards compliance',
              a: [t('nist_compliance_desc'), t('pci_dss_compliance_desc')].filter(Boolean).join(' '),
            },
          ].filter(item => item.q && item.a);
          const faqJson = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: qa.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          };
          return (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
          );
        })()}
        <div className={`container ${locale} mx-auto px-3`}>
          <section className="max-w-6xl mx-auto mt-4 mb-6 px-4 py-3 rounded-lg bg-blue-50 dark:bg-[#2A4E63]">
            <h2 className="text-lg font-semibold text-[#111827] dark:text-[#e0e0e0] mb-1">TL;DR</h2>
            <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0]">
              {seoData.find((d) => d.language === locale)?.description || seoData.find((d) => d.language === 'en')?.description}
            </p>
          </section>
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
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded" />}>
              <SeoAccordion language={locale} />
            </Suspense>
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