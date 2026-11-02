'use client';

import { useEffect, useState } from 'react';

/**
 * AdSense is only worth loading after approval. Set
 * NEXT_PUBLIC_ADSENSE_ENABLED=true in the deployment environment once the
 * account is approved.
 */
export const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

/** Read the marketing category from the vanilla-cookieconsent cookie. */
export function readMarketingConsent(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const match = document.cookie.match(/(?:^|;\s*)cc_cookie=([^;]+)/);
    if (!match) return false;
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return Array.isArray(parsed?.categories) && parsed.categories.includes('marketing');
  } catch {
    return false;
  }
}

/**
 * Marketing consent state, kept in sync with the CMP. No ad tag or ad unit is
 * rendered before the visitor grants the marketing category.
 */
export function useMarketingConsent(): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(readMarketingConsent());
    sync();
    window.addEventListener('cc:onFirstConsent', sync);
    window.addEventListener('cc:onConsent', sync);
    window.addEventListener('cc:onChange', sync);
    return () => {
      window.removeEventListener('cc:onFirstConsent', sync);
      window.removeEventListener('cc:onConsent', sync);
      window.removeEventListener('cc:onChange', sync);
    };
  }, []);

  return granted;
}
