import React from 'react';
import SmartAdBanner from './SmartAdBanner';

function AdBannerSecond({ language, isDarkMode }) {
  return (
    <div className="w-full mb-4" style={{ minWidth: '320px' }}>
      <SmartAdBanner
        adSlot="8766567218"
        className="w-full"
        style={{ minWidth: '320px', minHeight: '90px' }}
        fallbackContent={null}
      />
    </div>
  );
}

export default AdBannerSecond;
