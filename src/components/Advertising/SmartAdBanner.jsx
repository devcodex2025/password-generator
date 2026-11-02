import React, { useEffect, useRef, useState } from 'react';
import AdSense from 'react-adsense';
import { ADSENSE_ENABLED, useMarketingConsent } from '@/lib/marketing-consent';

/**
 * AdSense unit with reserved space and an unfilled check.
 *
 * `react-adsense` never calls `onLoad`/`onError`, so readiness is read from the
 * `<ins>` element that AdSense fills. The unit only mounts after marketing
 * consent, and the tag itself is loaded by `AdSenseLoader`.
 */
const SmartAdBanner = ({
  adSlot = '8766567218',
  className = '',
  style = {},
  fallbackContent = null,
}) => {
  const [showContainer, setShowContainer] = useState(true);
  const containerRef = useRef(null);
  const consentGranted = useMarketingConsent();

  useEffect(() => {
    if (!ADSENSE_ENABLED || !consentGranted || process.env.NODE_ENV !== 'production') {
      return undefined;
    }

    setShowContainer(true);
    const timer = setTimeout(() => {
      const unit = containerRef.current?.querySelector('ins.adsbygoogle');
      const status = unit?.getAttribute('data-ad-status');
      const loader = document.querySelector('script[src*="adsbygoogle.js"]');
      // No tag means the loader never ran; unfilled means there is no ad.
      if (!unit || !loader || status === 'unfilled') {
        setShowContainer(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [consentGranted]);

  // Never render real ad units in development or before consent.
  if (process.env.NODE_ENV === 'development') {
    return fallbackContent || (
      <div className={`ad-placeholder ${className}`} style={style}>
        <div className="text-center text-gray-500 text-sm py-4">
          Advertisement (Development Mode)
        </div>
      </div>
    );
  }

  if (!ADSENSE_ENABLED || !consentGranted || !showContainer) return null;

  return (
    <div
      ref={containerRef}
      className={`smart-ad-container ${className}`}
      style={{
        ...style,
        minWidth: '320px',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5995594246081561'}
        slot={adSlot}
        format="auto"
        responsive="true"
        style={{
          display: 'block',
          minHeight: '90px',
          minWidth: '320px',
          width: '100%',
        }}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default SmartAdBanner;
