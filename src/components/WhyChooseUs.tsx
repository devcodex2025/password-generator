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
    <div className="w-full max-w-4xl mx-auto my-8 px-4 lg:px-8">
      <h2 className={`text-[24px] lg:text-[32px] font-bold text-center mb-8 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>
        {t('why_choose_title', language)}
      </h2>
      {/* Four equal cells keep the grid free of dangling holes. Hierarchy comes
          from the accent border and the filled icon on the lead argument, not
          from extra area: a bigger box adds whitespace, not emphasis. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {advantages.map(({ Icon, titleKey, descKey }, idx) => {
          const lead = idx === 0;
          return (
            <div
              key={titleKey}
              className={`flex flex-col rounded-2xl p-6 transition-colors duration-200 border ${
                lead
                  ? isDarkMode
                    ? 'border-[#05a9ff] bg-[#1c1c1c]'
                    : 'border-[#05a9ff] bg-white shadow-sm'
                  : isDarkMode
                    ? 'border-[#374151] bg-[#1c1c1c] hover:border-[#05a9ff]'
                    : 'border-[#E5F6FF] bg-white shadow-sm hover:border-[#05a9ff]'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full ${
                lead
                  ? 'bg-[#05a9ff] text-[#0a1e2a]'
                  : isDarkMode
                    ? 'bg-[#05a9ff]/20 text-[#05a9ff]'
                    : 'bg-[#E5F6FF] text-[#2A4E63]'
              }`}>
                <Icon sx={{ fontSize: 24 }} aria-hidden="true" />
              </div>
              <h3 className={`font-semibold mb-2 ${lead ? 'text-[19px]' : 'text-[17px]'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#111827]'}`}>
                {t(titleKey, language)}
              </h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'} ${lead ? 'text-[15px]' : 'text-[14px]'}`}>
                {t(descKey, language)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
