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
        alt="share password"
        className={`hidden lg:flex h-[15px] md:h-[20px]  ml-2${isDarkMode ? ' invert brightness-0' : ''}`}
        style={{ cursor: 'pointer' }}
        width={20}
        height={20}
      />
      {showShareMenu && (
        <div style={{
          position: 'absolute',
          top: '110%',
          right: 0,
          zIndex: 10,
          minWidth: '180px',
          background: '#E5F6FF',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          padding: '8px',
        }}>
          <SharePassword password={password} isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};

export default PcShareBtn;
