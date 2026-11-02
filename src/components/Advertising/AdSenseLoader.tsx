'use client';

import Script from 'next/script';
import { ADSENSE_ENABLED, useMarketingConsent } from '@/lib/marketing-consent';

/**
 * Loads the AdSense tag only when NEXT_PUBLIC_ADSENSE_ENABLED=true and the
 * visitor has granted marketing consent. The flag is set in Vercel, so it can
 * be turned off without a code change.
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
