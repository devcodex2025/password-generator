import React, { useState, useEffect, useRef } from 'react';
import AdSense from 'react-adsense';
import SeoAccordion from "@/components/SeoAccordion";

const SmartAdBanner = ({
  adSlot = '8766567218',
  className = '',
  style = {},
  fallbackContent = null
}) => {
  const [adState, setAdState] = useState('loading');
  const [showContainer, setShowContainer] = useState(true);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Detect ad blocker
  const detectAdBlocker = () => {
    try {
      if (typeof window !== 'undefined' && !window.adsbygoogle) {
        return true;
      }
      if (typeof document !== "undefined") {
        const testAd = document.createElement('div');
        testAd.className = 'adsbygoogle';
        testAd.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px;';
        document.body.appendChild(testAd);

        const isBlocked = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);

        return isBlocked;
      }

    } catch (error) {
      return true;
    }
  };

  // Check if container has proper dimensions
  const checkContainerDimensions = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }
    return false;
  };

  useEffect(() => {
    // In production, don't show anything if ad blocker detected
    if (process.env.NODE_ENV === 'production' && detectAdBlocker()) {
      setShowContainer(false);
      return;
    }

    // In production, load ads immediately without delays
    if (process.env.NODE_ENV === 'production') {
      // Set a very short timeout just to ensure DOM is ready
      timeoutRef.current = setTimeout(() => {
        if (adState === 'loading') {
          setAdState('failed');
          setShowContainer(false);
        }
      }, 2000); // 2 second timeout for production
    } else {
      // Development mode - longer timeout
      timeoutRef.current = setTimeout(() => {
        if (adState === 'loading') {
          setAdState('failed');
          setShowContainer(false);
        }
      }, 8000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [adState]);

  // Don't show ads in development
  if (process.env.NODE_ENV === 'development') {
    return fallbackContent || (
      <div className={`ad-placeholder ${className}`} style={style}>
        <div className="text-center text-gray-500 text-sm py-4">
          Advertisement (Development Mode)
        </div>
      </div>
    );
  }

  // Don't render anything if ad shouldn't be shown
  if (!showContainer || adState === 'blocked' || adState === 'failed') {
    return null; // Return null instead of fallback content
  }

  const handleAdLoad = () => {
    setAdState('loaded');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleAdError = (error) => {
    console.error('AdSense error:', error);
    setAdState('failed');
    setShowContainer(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

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
        position: 'relative'
      }}
    >
      <AdSense.Google
        client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5995594246081561"}
        slot={adSlot}
        format="auto"
        responsive="true"
        style={{
          display: 'block',
          minHeight: '90px',
          minWidth: '320px'
        }}
        data-full-width-responsive="true"
        onLoad={handleAdLoad}
        onError={handleAdError}
      />
    </div>
  );
};

export default SmartAdBanner; 