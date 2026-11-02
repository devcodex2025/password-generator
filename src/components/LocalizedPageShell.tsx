'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAvailableLanguages } from '@/utils/languageUtils';
import { localizedPath } from '@/lib/locale-links';

interface LocalizedPageShellProps {
  locale: string;
  children: ReactNode;
}

export default function LocalizedPageShell({ locale, children }: LocalizedPageShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supportedLanguages = getAvailableLanguages();

  const onLanguageChange = (nextLocale: string) => {
    if (!supportedLanguages.includes(nextLocale)) {
      return;
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', nextLocale);
    document.cookie = `preferredLanguage=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    router.push(localizedPath(pathname, nextLocale));
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (supportedLanguages.includes(locale) && locale !== savedLanguage) {
      localStorage.setItem('preferredLanguage', locale);
      document.cookie = `preferredLanguage=${locale}; path=/; max-age=31536000; samesite=lax`;
    }
  }, [locale, supportedLanguages]);

  return (
    <div className={`container ${locale} mx-auto px-3`}>
      <Header onLanguageChange={onLanguageChange} currentLanguage={locale} />
      <main className="w-full">{children}</main>
      <Footer language={locale} />
    </div>
  );
}

