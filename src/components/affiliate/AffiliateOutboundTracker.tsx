'use client';

import { useEffect } from 'react';

const PRODUCT_BY_OFFER: Record<string, string> = {
  '15': 'nordvpn',
  '488': 'nordpass',
  '489': 'nordlocker',
  '754': 'nordpass-business',
};

function cookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function analyticsConsentGranted(): boolean {
  const raw = cookieValue('cc_cookie');
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { categories?: string[] };
    return Array.isArray(parsed.categories) && parsed.categories.includes('analytics');
  } catch {
    return false;
  }
}

/** GA4 client id from the `_ga` cookie: GA1.1.<client_id>. */
function gaClientId(): string | null {
  const raw = cookieValue('_ga');
  const match = raw?.match(/^GA\d+\.\d+\.(\d+\.\d+)$/);
  return match ? match[1] : null;
}

/**
 * Handles every outbound affiliate click:
 *  - adds the GA4 client id to `aff_sub2` so the network returns it on the conversion
 *    (Phase 2: the sync job turns that into a `purchase` event in GA4);
 *  - fires `affiliate_outbound_click` for links inside article prose that have no handler.
 *
 * Runs in the capture phase so the href is rewritten before the browser follows the link.
 */
export default function AffiliateOutboundTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href*="go.nordvpn.net/aff_c"]') as HTMLAnchorElement | null;
      if (!link) return;

      try {
        const url = new URL(link.href);
        const offerId = url.searchParams.get('offer_id') || '';
        const subId = url.searchParams.get('aff_sub') || '';
        const placement = link.dataset.placement || subId.replace(/^gen-[a-z]{2}-/, '') || 'unknown';

        if (analyticsConsentGranted()) {
          const clientId = gaClientId();
          if (clientId && !url.searchParams.get('aff_sub2')) {
            url.searchParams.set('aff_sub2', clientId);
            link.href = url.toString();
          }
        }

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_outbound_click', {
            product: PRODUCT_BY_OFFER[offerId] || offerId || 'unknown',
            placement,
            ui_language: document.documentElement.lang || '',
            affiliate_offer_id: offerId,
          });
        }
      } catch {
        /* analytics must never break navigation */
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
