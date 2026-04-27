'use client';

import { use, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/i18n';
import PasswordGenerator from '@/components/PasswordGenerator/PasswordGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';
import { getAvailableLanguages } from '@/utils/languageUtils';

/* ── Below-fold components: lazy-loaded to reduce initial JS bundle ── */
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: false });
const PasswordBreachCheck = dynamic(() => import('@/components/PasswordBreachCheck'), { ssr: false });
const GuideLinksSection = dynamic(() => import('@/components/GuideLinksSection'), { ssr: false });
const SeoAccordion = dynamic(() => import('@/components/SeoAccordion'), { ssr: false });
const ShareBlock = dynamic(() => import('@/components/ShareBlock'), { ssr: false });
const AdBanner = dynamic(() => import('@/components/Advertising/Adbanner'), { ssr: false });
const AdBannerSecond = dynamic(() => import('@/components/Advertising/AdbannerSecond'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent/CookieConsent'), { ssr: false });
const NordPassAffiliatePromo = dynamic(() => import('@/components/affiliate/NordPassAffiliatePromo'), { ssr: false });

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const { locale } = use(params);
  const { isDarkMode } = useTheme();
  const supportedLanguages = getAvailableLanguages();
  const effectiveLocale = supportedLanguages.includes(locale) ? locale : 'en';

  // Set language synchronously so the first render already uses the correct locale.
  // All i18n resources are bundled from lang.json, so changeLanguage resolves instantly.
  if (i18n.language !== effectiveLocale) {
    void i18n.changeLanguage(effectiveLocale);
  }

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
        <Header onLanguageChange={onLanguageChange} currentLanguage={locale} />
        <main className="w-full">
          <Analytics />
          <PasswordGenerator language={locale} />
          <WhyChooseUs language={locale} />
          <PasswordBreachCheck language={locale} />
          <GuideLinksSection language={locale} />
          <AdBanner language={locale} isDarkMode={isDarkMode} />
          <SeoAccordion language={locale} />
          <div className="max-w-6xl mx-auto px-4">
            <ShareBlock language={locale} className="mt-6" />
          </div>
          <div className="max-w-6xl mx-auto px-4">
            <NordPassAffiliatePromo locale={locale} />
          </div>
          <AdBannerSecond language={locale} isDarkMode={isDarkMode} />
        </main>
        <Footer language={locale} />
        <CookieConsent language={locale} />
      </div>
    </I18nextProvider>
  );
}
