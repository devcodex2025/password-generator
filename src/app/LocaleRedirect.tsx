'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LocaleRedirectProps {
  locale: string;
}

export default function LocaleRedirect({ locale }: LocaleRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (!locale) return;
    router.replace(`/${locale}`);
  }, [locale, router]);

  return null;
}
