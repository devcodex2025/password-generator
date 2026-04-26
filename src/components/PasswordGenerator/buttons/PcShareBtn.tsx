import { useState, useEffect } from 'react';
import Image from 'next/image';
import SharePassword from './SharePassword';

interface PcShareBtnProps {
  password?: string;
  isDarkMode?: boolean;
}

const PcShareBtn: React.FC<PcShareBtnProps> = ({ password = '', isDarkMode }) => {
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
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        onClick={() => setShowShareMenu((prev) => !prev)}
        src="/images/share-paper-plane.svg"
        alt="Share password options"
        className={`hidden lg:flex h-[15px] md:h-[20px] ml-2 transition-all duration-200 hover:scale-110 hover:opacity-80${isDarkMode ? ' invert brightness-0' : ''}`}
        style={{ cursor: 'pointer' }}
        width={20}
        height={20}
      />
      {showShareMenu && (
        <div className="absolute top-[110%] right-0 z-10 min-w-[180px] bg-[#E5F6FF] dark:bg-[#2d2d2d] rounded-xl shadow-lg p-2 border border-transparent dark:border-[#374151]">
          <SharePassword password={password} isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};

export default PcShareBtn;
