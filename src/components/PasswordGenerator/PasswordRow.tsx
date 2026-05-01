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
    <div className="relative my-5 flex h-auto w-full flex-row flex-wrap items-center gap-2 lg:my-1 lg:flex-nowrap">
      <div
        className={`flex h-14 w-full min-w-0 items-stretch border-2 border-solid border-[#E5F6FF] py-0 text-[12px] text-[#071016] dark:border-transparent dark:bg-[#000000] lg:w-[80%] lg:items-center lg:rounded-[120px] lg:px-4 md:text-[20px] rounded-[120px] bg-white lg:py-1`}
      >
        <label htmlFor={`password-output-${index}`} className="sr-only">Generated password</label>
        <input
          id={`password-output-${index}`}
          type="text"
          value={password || ''}
          className="ml-3 min-w-0 flex-1 self-center rounded-[40px] border-none bg-transparent py-2 pr-2 text-base outline-none dark:text-white md:ml-4 md:text-lg lg:h-full lg:py-1"
          readOnly
        />
        {/* Tablet / small laptop: black pill — nudge up slightly between md and lg */}
        <div className="hidden min-h-0 shrink-0 items-center justify-end gap-1.5 self-center pr-1.5 md:max-lg:-translate-y-1 md:flex md:rounded-l-none md:rounded-r-[36px] md:bg-black lg:max-w-[300px] lg:translate-y-0 lg:gap-2 lg:rounded-[40px] lg:bg-transparent lg:pr-2 dark:md:bg-[#0f172a]">
          <GenerateButton
            onClick={() => onGenerate(index)}
            onLongPress={handleLongPress}
            className="hidden lg:inline-flex lg:px-6 lg:py-2 lg:text-[20px]"
          >
            {t('generate')}
          </GenerateButton>
          <GenerateButton
            onClick={() => onGenerate(index)}
            onLongPress={handleLongPress}
            className="inline-flex shrink-0 items-center justify-center px-3 py-2 text-[14px] font-semibold leading-none lg:hidden md:px-3.5 md:text-[15px]"
          >
            {t('generate_short')}
          </GenerateButton>
          <div className="hidden shrink-0 lg:block">
            <PcShareBtn password={password} isDarkMode={isDarkMode} />
          </div>
          <Image
            onClick={() => onGenerate(index)}
            src="/images/share-paper-plane.svg"
            alt="Regenerate password"
            className={`${isDarkMode ? 'invert brightness-0' : ''} mr-1 flex h-[15px] shrink-0 cursor-pointer md:hidden`}
            loading="lazy"
            decoding="async"
            width={20}
            height={20}
          />
          <Image
            onClick={() => onGenerate(index)}
            src="/images/refreash.png"
            alt="refresh password"
            className={`${isDarkMode ? 'invert brightness-0' : ''} mr-1.5 hidden h-[18px] w-[18px] shrink-0 cursor-pointer object-contain md:mr-2 md:flex lg:hidden`}
            loading="lazy"
            decoding="async"
            width={18}
            height={18}
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
        className={`${isDarkMode ? 'bg-[#05a9ff] hover:bg-[#38beff]' : 'bg-[#2A4E63] hover:bg-[#1f3b4c]'} w-full -bottom-12 h-14 lg:w-[20%] ${isDarkMode ? 'text-[#000000]' : 'text-white'} font-semibold text-[16px] md:text-[20px] rounded-[60px] py-[12px]`}
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
