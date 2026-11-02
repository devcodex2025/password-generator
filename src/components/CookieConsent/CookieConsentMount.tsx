'use client';

import dynamic from 'next/dynamic';

// The consent UI touches document/window on mount, so keep it client-only.
const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false });

export default function CookieConsentMount({ language }: { language: string }) {
  return <CookieConsent language={language} />;
}
