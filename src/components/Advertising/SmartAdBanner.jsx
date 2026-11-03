'use client';

import React, { useEffect, useRef, useState } from 'react';
import AdSense from 'react-adsense';
import { ADSENSE_ENABLED, useMarketingConsent } from '@/lib/marketing-consent';

/**
 * AdSense unit that never leaves an empty banner behind.
 *
 * AdSense reports the result of an ad request on the `<ins>` element through
 * `data-ad-status` ("filled", "unfilled", "unfill-optimized"). When an ad unit
 * is unfilled, Google keeps its size in the viewport and paints a blank space;
 * while an account is in review the `data-ad-status` attribute can be missing
 * entirely and the blank placeholder only shows up as an AdSense host `div`
 * without an ad `iframe`.
 *
 * The slot is rendered without any reserved height so it stays at zero pixels
 * until AdSense fills it. Once the tag has processed the unit, the slot is
 * collapsed unless there is an ad frame, and the MutationObserver expands it
 * again as soon as an ad appears (this also keeps AdSense auto-refresh working).
 * The tag itself is loaded by `AdSenseLoader`, and the unit only mounts after
 * marketing consent.
 */
const SmartAdBanner = ({ adSlot = '8766567218', className = '', style = {} }) => {
  const consentGranted = useMarketingConsent();
  const containerRef = useRef(null);
  const [state, setState] = useState('loading');
  const active = ADSENSE_ENABLED && consentGranted;

  useEffect(() => {
    if (!active) return undefined;

    const unit = containerRef.current?.querySelector('ins.adsbygoogle');
    if (!unit) return undefined;

    const sync = () => {
      const adStatus = unit.getAttribute('data-ad-status');
      const hasAdFrame = Boolean(unit.querySelector('iframe'));

      // Trust the authoritative state first: an unfilled unit has no ad.
      if (adStatus === 'unfilled') {
        setState('collapsed');
        return;
      }

      if (adStatus === 'filled' || adStatus === 'unfill-optimized' || hasAdFrame) {
        setState('filled');
        return;
      }

      // No status (the usual state while the account is in review): AdSense
      // still reserves a blank placeholder. Collapse it after processing and
      // expand again if an ad frame shows up later.
      const processed =
        unit.getAttribute('data-adsbygoogle-status') === 'done' ||
        Boolean(unit.querySelector('div[id$="_host"]'));
      if (processed && unit.offsetHeight > 0) {
        setState('collapsed');
      }
    };

    sync();

    // AdSense updates the unit asynchronously: attributes for the status and
    // child nodes for the ad frame.
    const observer = new MutationObserver(sync);
    observer.observe(unit, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'data-adsbygoogle-status', 'style'],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [active]);

  if (!active) return null;

  const collapsed = state === 'collapsed';

  return (
    <div
      ref={containerRef}
      className={`smart-ad-container ${className}`}
      data-ad-state={state}
      style={{
        width: '100%',
        maxWidth: '100%',
        marginBottom: state === 'filled' ? '1rem' : undefined,
        ...(collapsed ? { height: 0, overflow: 'hidden' } : null),
        ...style,
      }}
    >
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5995594246081561'}
        slot={adSlot}
        format="auto"
        responsive="true"
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
};

export default SmartAdBanner;
