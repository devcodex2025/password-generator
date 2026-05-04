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
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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
    
    // Save language preference
    localStorage.setItem('preferredLanguage', newLanguage);
    document.cookie = `preferredLanguage=${newLanguage}; path=/; max-age=31536000; samesite=lax`;

    const target = newLanguage === 'en' ? '/' : `/${newLanguage}`;
    router.push(target);
  };

  useEffect(() => {
    // Redirect from root if preferred language is set and different from current
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (pathname === '/' || pathname === '/en') {
      if (savedLanguage && savedLanguage !== 'en' && supportedLanguages.includes(savedLanguage)) {
        router.push(`/${savedLanguage}`);
      }
    } else {
      // If we are on a localized path, update the preference
      const currentPathLocale = pathname.split('/')[1];
      if (supportedLanguages.includes(currentPathLocale) && currentPathLocale !== savedLanguage) {
        localStorage.setItem('preferredLanguage', currentPathLocale);
        document.cookie = `preferredLanguage=${currentPathLocale}; path=/; max-age=31536000; samesite=lax`;
      }
    }
  }, [router, supportedLanguages, locale, pathname]);

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
