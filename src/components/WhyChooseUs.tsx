'use client';

import { useContext } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { ThemeContext } from '../context/ThemeContext';
import lang from './lang.json';

function t(key: string, language: string): string {
  const entry = (lang as unknown as Record<string, Record<string, string>>)[key];
  return entry?.[language] ?? entry?.['en'] ?? key;
}

interface WhyChooseUsProps {
  language: string;
}

const advantages = [
  { Icon: LockOutlinedIcon, titleKey: 'advantage_1_title', descKey: 'advantage_1_desc' },
  { Icon: DevicesOutlinedIcon, titleKey: 'advantage_2_title', descKey: 'advantage_2_desc' },
  { Icon: VerifiedUserOutlinedIcon, titleKey: 'advantage_3_title', descKey: 'advantage_3_desc' },
  { Icon: PublicOutlinedIcon, titleKey: 'advantage_4_title', descKey: 'advantage_4_desc' },
];

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 lg:px-8">
      <h2 className={`text-[24px] lg:text-[32px] font-bold text-center mb-8 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>
        {t('why_choose_title', language)}
      </h2>
      {/* The first argument carries the most weight (local generation and open
          standards), so it spans two columns and two rows instead of matching
          the other three cards. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map(({ Icon, titleKey, descKey }, idx) => {
          const featured = idx === 0;
          return (
            <div
              key={titleKey}
              className={`${featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-center p-7 lg:p-9' : 'p-6'} rounded-2xl transition-colors duration-200 ${
                isDarkMode
                  ? 'bg-[#1c1c1c] border border-[#374151] hover:border-[#05a9ff]'
                  : 'bg-white border border-[#E5F6FF] shadow-sm hover:border-[#05a9ff]'
              }`}
            >
              <div className={`inline-flex items-center justify-center rounded-full ${
                featured ? 'w-16 h-16 mb-5' : 'w-12 h-12 mb-3'
              } ${isDarkMode ? 'bg-[#05a9ff]/20 text-[#05a9ff]' : 'bg-[#E5F6FF] text-[#2A4E63]'}`}>
                <Icon sx={{ fontSize: featured ? 32 : 24 }} aria-hidden="true" />
              </div>
              <h3 className={`font-semibold ${featured ? 'text-[22px] lg:text-[26px] mb-3' : 'text-[17px] mb-2'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#111827]'}`}>
                {t(titleKey, language)}
              </h3>
              <p className={`leading-relaxed ${featured ? 'text-[16px] lg:text-[17px]' : 'text-[14px]'} ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
                {t(descKey, language)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
