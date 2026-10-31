'use client';

import { useEffect } from 'react';

/**
 * Sets <html lang> to the current locale.
 *
 * The root layout can only render one static lang attribute (it is shared by
 * every locale), and injecting a beforeInteractive script for this caused a
 * hydration mismatch, so the attribute is corrected after hydration instead.
 * Crawlers still get the correct locale from hreflang alternates.
 */
export default function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
