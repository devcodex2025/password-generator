'use client';

import { useContext } from 'react';
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
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    titleKey: 'advantage_1_title',
    descKey: 'advantage_1_desc',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titleKey: 'advantage_2_title',
    descKey: 'advantage_2_desc',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleKey: 'advantage_3_title',
    descKey: 'advantage_3_desc',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: 'advantage_4_title',
    descKey: 'advantage_4_desc',
  },
];

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 lg:px-8">
      <h2 className={`text-[24px] lg:text-[32px] font-bold text-center mb-8 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>
        {t('why_choose_title', language)}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((adv, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 text-center transition-all duration-200 hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#1c1c1c] border border-[#374151] hover:border-[#05a9ff]'
                : 'bg-white border border-[#E5F6FF] shadow hover:shadow-lg'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
              isDarkMode ? 'bg-[#05a9ff]/20 text-[#05a9ff]' : 'bg-[#E5F6FF] text-[#2A4E63]'
            }`}>
              {adv.icon}
            </div>
            <h3 className={`text-[17px] font-semibold mb-2 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#111827]'}`}>
              {t(adv.titleKey, language)}
            </h3>
            <p className={`text-[14px] leading-relaxed ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
              {t(adv.descKey, language)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
