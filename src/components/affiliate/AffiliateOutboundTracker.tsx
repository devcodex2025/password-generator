'use client';

import { useEffect } from 'react';

const PRODUCT_BY_OFFER: Record<string, string> = {
  '15': 'nordvpn',
  '488': 'nordpass',
  '489': 'nordlocker',
  '754': 'nordpass-business',
};

/**
 * Fires one GA4 event per outbound affiliate click.
 *
 * Component promos already report their own placement events; this tracker exists for the
 * plain links inside article prose, which have no handler of their own. It listens in the
 * capture phase so it still runs when a promo block handles the same click.
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
        const params = {
          product: PRODUCT_BY_OFFER[offerId] || offerId || 'unknown',
          placement,
          ui_language: document.documentElement.lang || '',
          affiliate_offer_id: offerId,
        };

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_outbound_click', params);
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
