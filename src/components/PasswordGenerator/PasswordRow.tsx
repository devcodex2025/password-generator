'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

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

  return (
    <div className="flex relative items-center flex-row lg:flex-row gap-2 h-auto w-full my-5 lg:my-1 flex-wrap lg:flex-nowrap">
      <div
        className={`${
          isDarkMode ? 'border-none' : 'border-[#E5F6FF]'
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
          <button
            className="bg-[#E5F6FF] text-[#2A4E63] font-semibold hidden lg:flex text-[18px] lg:text-[20px] rounded-[60px] px-[16px] py-[12px] w-full my-2 lg:w-auto lg:px-6 lg:py-2 mx-2 whitespace-nowrap justify-center"
            onClick={() => onGenerate(index)}
            style={{ cursor: 'pointer' }}
          >
            {t('generate')}
          </button>
          <button
            className="bg-[#E5F6FF] text-[#2A4E63] font-semibold text-[16px] md:text-[18px] flex lg:hidden lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 mx-2 whitespace-nowrap justify-center py-0 items-center px-2 h-full"
            onClick={() => onGenerate(index)}
            style={{ cursor: 'pointer' }}
          >
            {t('generate_short')}
          </button>
          <Image
            onClick={() => onGenerate(index)}
            src="/images/refreash.png"
            alt="refresh"
            className={`${isDarkMode ? 'invert brightness-0' : ''} flex mr-2 h-[15px] md:h-[20px]`}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex md:hidden h-14 items-center justify-center flex-nowrap w-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px] px-2">
        <button
          className="bg-[#E5F6FF] text-[#2A4E63] font-semibold text-[16px] md:text-[18px] flex lg:hidden lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 whitespace-nowrap justify-center py-0 items-center px-4 h-full w-full"
          onClick={() => onGenerate(index)}
          style={{ cursor: 'pointer' }}
        >
          {t('generate_short')}
          <Image
            onClick={(e) => {
              e.stopPropagation();
              onGenerate(index);
            }}
            src="/images/refreash.png"
            alt="refresh"
            className="flex h-[15px] md:h-[20px] ml-2"
            style={{ cursor: 'pointer' }}
            width={20}
            height={20}
          />
        </button>
      </div>
      <button
        disabled={!password || isAnimating}
        className={`${
          isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'
        } w-full -bottom-12 h-14 lg:w-[20%] ${
          isDarkMode ? 'text-[#e0e0e0]' : 'text-white'
        } font-semibold text-[16px] md:text-[20px] rounded-[60px] py-[12px]`}
        style={password ? copyDisabledStyle : { cursor: 'not-allowed', opacity: 0.5 }}
        onClick={() => onCopy(index)}
      >
        {t('copy')}
      </button>
    </div>
  );
}