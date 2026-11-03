'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import SharePassword from './SharePassword';

interface PcShareBtnProps {
  password?: string;
  isDarkMode?: boolean;
}

const PcShareBtn: React.FC<PcShareBtnProps> = ({ password = '', isDarkMode }) => {
  const { t } = useTranslation();
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint in Tailwind is 1024px
        setShowShareMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative inline-block">
      {/* A real button: the share icon was previously a clickable <img> without
          keyboard support or an accessible name. */}
      <button
        type="button"
        onClick={() => setShowShareMenu((prev) => !prev)}
        aria-label={t('a11y_share_password')}
        aria-haspopup="menu"
        aria-expanded={showShareMenu}
        className="ml-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-[#E5F6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:hover:bg-white/10 dark:focus-visible:ring-[#05a9ff] lg:inline-flex"
      >
        <Image
          src="/images/share-paper-plane.svg"
          alt=""
          aria-hidden="true"
          className={`h-5 w-auto transition-opacity duration-200${isDarkMode ? ' invert brightness-0' : ''}`}
          width={20}
          height={20}
        />
      </button>
      {showShareMenu && (
        <div className="absolute top-[110%] right-0 z-10 min-w-[180px] bg-[#E5F6FF] dark:bg-[#2d2d2d] rounded-xl shadow-lg p-2 border border-transparent dark:border-[#374151]">
          <SharePassword password={password} isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};

export default PcShareBtn;
