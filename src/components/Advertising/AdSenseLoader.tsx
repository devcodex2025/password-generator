'use client';

import Script from 'next/script';
import { ADSENSE_ENABLED, useMarketingConsent } from '@/lib/marketing-consent';

/**
 * Loads the AdSense tag only when the feature is enabled and the visitor has
 * granted marketing consent. Keeps the tag off the page for pre-approval
 * deployments and for visitors who reject advertising cookies.
 */
export default function AdSenseLoader() {
  const granted = useMarketingConsent();

  if (!ADSENSE_ENABLED || !granted) return null;

  return (
    <Script
      id="adsense-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5995594246081561'}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
