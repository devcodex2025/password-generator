'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../context/ThemeContext';
import lang from './lang.json';

function t(key: string, language: string): string {
  const entry = (lang as unknown as Record<string, Record<string, string>>)[key];
  return entry?.[language] ?? entry?.['en'] ?? key;
}

interface GuideLink {
  slug: string;
  titleKey: string;
  descKey: string;
}

const guideLinks: GuideLink[] = [
  { slug: 'how-to-create-strong-passwords', titleKey: 'guide_link_1_title', descKey: 'guide_link_1_desc' },
  { slug: 'what-to-do-after-password-breach', titleKey: 'guide_link_2_title', descKey: 'guide_link_2_desc' },
  { slug: 'two-factor-authentication-basics', titleKey: 'guide_link_3_title', descKey: 'guide_link_3_desc' },
  { slug: 'nist-800-63b-password-rules', titleKey: 'guide_link_4_title', descKey: 'guide_link_4_desc' },
  { slug: 'password-manager-vs-manual-storage', titleKey: 'guide_link_5_title', descKey: 'guide_link_5_desc' },
  { slug: 'common-password-mistakes', titleKey: 'guide_link_6_title', descKey: 'guide_link_6_desc' },
];

interface GuideLinksSectionProps {
  language: string;
}

export default function GuideLinksSection({ language }: GuideLinksSectionProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const locale = language || 'en';

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 lg:px-8">
      <div className={`rounded-2xl border ${isDarkMode ? 'border-[#374151] bg-[#1c1c1c]' : 'border-[#E5F6FF] bg-white'} shadow p-6 lg:p-8`}>
        <h2 className={`text-[22px] lg:text-[28px] font-bold mb-2 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>
          {t('guide_links_title', language)}
        </h2>
        <p className={`text-[16px] mb-6 ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
          {t('guide_links_subtitle', language)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guideLinks.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${locale}/guides/${guide.slug}`}
              className={`group block rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-[#2a2a2a] hover:bg-[#333] border border-[#374151] hover:border-[#38beff]'
                  : 'bg-[#F8FDFF] hover:bg-[#E5F6FF] border border-[#E5F6FF] hover:border-[#2A4E63]'
              }`}
            >
              <h3 className={`text-[15px] font-semibold mb-1 transition-colors ${
                isDarkMode
                  ? 'text-[#38beff] group-hover:text-[#d7f2ff]'
                  : 'text-[#2A4E63] group-hover:text-[#1f3b4c]'
              }`}>
                {t(guide.titleKey, language)}
              </h3>
              <p className={`text-[13px] leading-relaxed ${isDarkMode ? 'text-[#9ca3af]' : 'text-[#6B7280]'}`}>
                {t(guide.descKey, language)}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}/guides`}
            className={`inline-flex min-h-11 items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#05a9ff] !text-[#0a1929] hover:bg-[#38beff]'
                : 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c]'
            }`}
          >
            {t('guide_links_view_all', language)}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
