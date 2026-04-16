'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAvailableLanguages } from '@/utils/languageUtils';

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

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }

    if (segments.length === 1 && nextLocale === 'en') {
      router.push('/');
      return;
    }

    segments[0] = nextLocale;
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className={`container ${locale} mx-auto px-3`}>
      <Header onLanguageChange={onLanguageChange} currentLanguage={locale} />
      <main className="w-full">{children}</main>
      <Footer language={locale} />
    </div>
  );
}
