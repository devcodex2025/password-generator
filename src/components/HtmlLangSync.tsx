'use client';

import { useEffect } from 'react';
import { HREFLANG_MAP, normalizeLocale } from '@/lib/site-config';

export default function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    const normalized = normalizeLocale(locale);
    document.documentElement.lang = HREFLANG_MAP[normalized];
  }, [locale]);

  return null;
}
