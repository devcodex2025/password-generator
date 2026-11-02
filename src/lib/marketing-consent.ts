'use client';

import { useEffect, useState } from 'react';

/**
 * Enabled through the deployment environment: set
 * NEXT_PUBLIC_ADSENSE_ENABLED=true in Vercel (Production).
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

let lastApplied: boolean | null = null;

/**
 * Mirror the marketing category into Google Consent Mode signals. The CMP
 * callbacks are not reliable in every browser, so this runs whenever the
 * stored consent changes.
 */
function applyConsentSignals(granted: boolean) {
  if (lastApplied === granted) return;
  lastApplied = granted;
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
    });
  }
}

/**
 * Marketing consent state, kept in sync with the CMP cookie.
 *
 * The CMP does not dispatch its documented events consistently, so this also
 * re-reads the cookie once a second and on any click. The read is a single
 * regex over `document.cookie`, and no ad tag or ad unit renders before the
 * marketing category is granted.
 */
export function useMarketingConsent(): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const value = readMarketingConsent();
      applyConsentSignals(value);
      setGranted(value);
    };

    sync();
    const interval = window.setInterval(sync, 1000);
    const onInteraction = () => sync();
    document.addEventListener('click', onInteraction, true);
    window.addEventListener('cc:onFirstConsent', sync);
    window.addEventListener('cc:onConsent', sync);
    window.addEventListener('cc:onChange', sync);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('click', onInteraction, true);
      window.removeEventListener('cc:onFirstConsent', sync);
      window.removeEventListener('cc:onConsent', sync);
      window.removeEventListener('cc:onChange', sync);
    };
  }, []);

  return granted;
}
