'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
import GenerateButton from './buttons/GenerateBtn';
import CopyButton from './buttons/CopyBtn';
import ShareButton from './buttons/ShareBtn';
import SharePassword from './buttons/SharePassword';
import PcShareBtn from './buttons/PcShareBtn';
import LongPressTip from './buttons/LongPressTip';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

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
        className={`flex h-16 w-full min-w-0 items-stretch border-2 border-solid border-[#E5F6FF] py-0 text-[12px] text-[#071016] dark:border-[#374151] dark:bg-[#1c1c1c] lg:w-[80%] lg:items-center lg:rounded-[120px] lg:px-4 md:text-[20px] rounded-[120px] bg-white`}
      >
        <label htmlFor={`password-output-${index}`} className="sr-only">{t('a11y_password_generated')}</label>
        <input
          id={`password-output-${index}`}
          type="text"
          value={password || ''}
          className="ml-3 min-w-0 flex-1 self-center rounded-[40px] border-none bg-transparent py-2 pr-2 text-base outline-none dark:text-white md:ml-4 md:text-lg lg:h-full lg:py-1"
          readOnly
        />
        {/* Tablet / small laptop: the actions sit inside the field pill — keep
            them vertically centred with the password */}
        <div className="hidden min-h-0 shrink-0 items-center justify-end gap-1.5 self-stretch pr-1.5 md:flex lg:max-w-[300px] lg:gap-2 lg:rounded-[40px] lg:pr-2">
          <GenerateButton
            onClick={() => onGenerate(index)}
            onLongPress={handleLongPress}
            className="hidden lg:inline-flex lg:h-14 lg:px-6 lg:py-0 lg:text-[20px]"
          >
            {t('generate')}
          </GenerateButton>
          <GenerateButton
            onClick={() => onGenerate(index)}
            onLongPress={handleLongPress}
            className="inline-flex shrink-0 items-center justify-center px-3 py-2 text-[14px] font-semibold leading-none md:h-14 md:px-3.5 md:py-0 md:text-[15px] lg:hidden"
          >
            {t('generate_short')}
          </GenerateButton>
          <div className="hidden shrink-0 lg:block">
            <PcShareBtn password={password} isDarkMode={isDarkMode} />
          </div>
          <Image
            onClick={() => onGenerate(index)}
            src="/images/share-paper-plane.svg"
            alt={t('a11y_regenerate_password')}
            className={`${isDarkMode ? 'invert brightness-0' : ''} mr-1 flex h-[15px] shrink-0 cursor-pointer md:hidden`}
            loading="lazy"
            decoding="async"
            width={20}
            height={20}
          />
          <Image
            onClick={() => onGenerate(index)}
            src="/images/refreash.png"
            alt={t('a11y_regenerate_password')}
            className={`${isDarkMode ? 'invert brightness-0' : ''} mr-1.5 hidden h-[18px] w-[18px] shrink-0 cursor-pointer object-contain md:mr-2 md:flex lg:hidden`}
            loading="lazy"
            decoding="async"
            width={18}
            height={18}
          />
        </div>
      </div>
      <LongPressTip label={t('generate')} className="flex h-14 min-w-0 flex-1 basis-0 md:hidden">
        <GenerateButton
          onClick={() => onGenerate(index)}
          className="h-full w-full px-4"
        >
          <RefreshIcon aria-hidden="true" />
          <span className="sr-only">{t('generate_short')}</span>
        </GenerateButton>
      </LongPressTip>
      <LongPressTip label={t('copy')} className="flex h-14 min-w-0 flex-1 basis-0 md:contents">
        <CopyButton
          disabled={!password || isAnimating}
          className={`${isDarkMode ? 'bg-[#05a9ff] hover:bg-[#38beff]' : 'bg-[#2A4E63] hover:bg-[#1f3b4c]'} w-full h-14 lg:w-[20%] ${isDarkMode ? 'text-[#000000]' : 'text-white'} font-semibold text-[16px] md:text-[20px] rounded-[60px] py-0 ${!password || isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleCopy}
        >
          <span className="flex md:hidden" aria-hidden="true">{copied ? <CheckIcon /> : <ContentCopyIcon />}</span>
          <span className="sr-only md:not-sr-only">{copied ? t('copied_short') : t('copy')}</span>
        </CopyButton>
      </LongPressTip>
      {/* Mobile Share Button with dropdown menu */}
      <LongPressTip
        label={t('share-password')}
        disabled={showShareMenu}
        className="flex h-14 min-w-0 flex-1 basis-0 items-center justify-center md:w-full md:flex-none md:basis-auto lg:hidden"
      >
        <ShareButton
          onClick={() => setShowShareMenu((prev) => !prev)}
          iconClassName="transition-transform duration-200 hover:scale-110 md:mr-2"
          className="flex h-full w-full items-center justify-center whitespace-nowrap rounded-[60px] px-4 text-[16px] md:text-[18px] lg:hidden"
        >
          <span className="sr-only md:not-sr-only">{t('share-password')}</span>
        </ShareButton>
        {showShareMenu && (
          <div className="absolute top-[110%] right-0 z-10 w-56 md:left-0 md:w-full">
            <SharePassword password={password} isDarkMode={isDarkMode} />
          </div>
        )}
      </LongPressTip>
    </div>
  );
}
