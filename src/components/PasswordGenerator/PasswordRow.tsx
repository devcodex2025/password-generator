'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
import GenerateButton from './buttons/GenerateBtn';
import CopyButton from './buttons/CopyBtn';
import ShareButton from './buttons/ShareBtn';
import SharePassword from './buttons/SharePassword';
import PcShareBtn from './buttons/PcShareBtn';

interface PasswordRowProps {
  password: string;
  index: number;
  onGenerate: (index: number) => void;
  onCopy: (index: number) => void;
  isAnimating: boolean;
  isDarkMode: boolean;
}

export default function PasswordRow({
  password,
  index,
  onGenerate,
  onCopy,
  isAnimating,
  isDarkMode,
}: PasswordRowProps) {
  const { t } = useTranslation();
  const copyDisabledStyle = isAnimating
    ? { pointerEvents: 'none' as const, opacity: 0.5, cursor: 'not-allowed' }
    : { cursor: 'pointer' };
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(index);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const [showShareMenu, setShowShareMenu] = useState(false);
  const handleLongPress = () => {
    onGenerate(index);
  };
  return (
    <div className="flex relative items-center flex-row lg:flex-row gap-2 h-auto w-full my-5 lg:my-1 flex-wrap lg:flex-nowrap">
      <div
        className={`${isDarkMode ? 'border-none' : 'border-[#E5F6FF]'
          } py-1 lg:px-4 w-full lg:w-[80%] flex items-center border-2 h-14 border-solid rounded-[120px] text-[#071016] text-[12px] md:text-[20px]`}
        style={isDarkMode ? { backgroundColor: '#121212' } : {}}
      >
        <input
          type="text"
          value={password || ''}
          className="rounded-[40px] ml-[16px] border-none outline-none h-full w-[80%] lg:w-[80%] md:py-5 flex-grow text-base lg:text-lg"
          readOnly
        />
        <div className="hidden md:flex items-center lg:justify-end justify-center flex-nowrap w-full lg:max-w-[300px] max-w-[150px] h-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px]">
          <GenerateButton
            onClick={() => onGenerate(index)}
            onLongPress={handleLongPress}
            className="hidden lg:flex text-[18px] lg:text-[20px] w-full my-2 lg:w-auto lg:px-6 lg:py-2 mx-2 whitespace-nowrap justify-center"
          >
            {t('generate')}
          </GenerateButton>
          <button
            className="bg-[#E5F6FF] text-[#2A4E63] font-semibold text-[16px] md:text-[18px] flex lg:hidden lg:text-[24px] rounded-[60px] px-[8px] md:px-[10px] py-[10px] md:py-[12px] lg:my-0 mx-2 whitespace-nowrap justify-center py-0 items-center px-2 h-full"
            onClick={() => onGenerate(index)}
            style={{ cursor: 'pointer' }}
          >
            {t('generate_short')}
          </button>
          {/* PC Share Button */}
          <PcShareBtn
            password={password}
            isDarkMode={isDarkMode}
          />
          {/* Hide for tablet and below */}
          <Image
            onClick={() => onGenerate(index)}
            src="/images/share-paper-plane.svg"
            alt="share password"
            className={`${isDarkMode ? 'invert brightness-0' : ''} flex mr-2 h-[15px] md:h-[20px] md:hidden`}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
            width={20}
            height={20}
          />
          {/* Only for tablet */}
          <Image
            onClick={() => onGenerate(index)}
            src="/images/refreash.png"
            alt="refresh password"
            className={`${isDarkMode ? 'invert brightness-0' : ''} flex md:mr-[20px] md:h-[20px] lg:hidden w-[20px] h-[16px]`}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
            width={20}
            height={16}
          />
        </div>
      </div>
      <div className="flex md:hidden h-14 items-center justify-center flex-nowrap w-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px] px-2">
        <GenerateButton
          onClick={() => onGenerate(index)}
          onLongPress={handleLongPress}
          className="flex lg:hidden text-[16px] md:text-[18px] lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 whitespace-nowrap justify-center py-0 items-center px-4 h-full w-full"
        >
          {t('generate_short')}
        </GenerateButton>
      </div>
      <CopyButton
        disabled={!password || isAnimating}
        className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} w-full -bottom-12 h-14 lg:w-[20%] ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[16px] md:text-[20px] rounded-[60px] py-[12px]`}
        style={password ? copyDisabledStyle : { cursor: 'not-allowed', opacity: 0.5 }}
        onClick={handleCopy}
      >
        {copied ? t('copied_short') : t('copy')}
      </CopyButton>
      {/* Mobile Share Button with dropdown menu */}
      <div className="flex lg:hidden h-14 items-center justify-center flex-nowrap w-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px] px-2 relative">
        <ShareButton
          onClick={() => setShowShareMenu((prev) => !prev)}
          className="flex lg:hidden text-[16px] md:text-[18px] lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 whitespace-nowrap justify-center py-0 items-center px-4 h-full w-full"
        >
          {t('share-password')}
        </ShareButton>
        {showShareMenu && (
          <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 10, width: '100%' }}>
            <SharePassword password={password} isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
    </div>
  );
}