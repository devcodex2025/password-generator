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
        {/* Guides read as a list, not a third card grid: title on the left,
            summary on the right, one row per guide. */}
        <ul className={`divide-y ${isDarkMode ? 'divide-[#374151]' : 'divide-[#E5F6FF]'}`}>
          {guideLinks.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/${locale}/guides/${guide.slug}`}
                className={`group flex flex-col gap-1 py-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A4E63] dark:focus-visible:outline-[#38beff] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8`}
              >
                <h3 className={`text-[16px] font-semibold transition-colors ${
                  isDarkMode
                    ? 'text-[#e0e0e0] group-hover:text-[#38beff]'
                    : 'text-[#2A4E63] group-hover:text-[#05a9ff]'
                }`}>
                  {t(guide.titleKey, language)}
                </h3>
                <p className={`text-[14px] leading-relaxed sm:max-w-[62%] sm:text-right ${isDarkMode ? 'text-[#9ca3af]' : 'text-[#6B7280]'}`}>
                  {t(guide.descKey, language)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link
            href={`/${locale}/guides`}
            className={`inline-flex min-h-11 items-center px-6 py-2.5 rounded-xl font-semibold text-[15px] transition-colors duration-200 ${
              isDarkMode
                ? 'bg-[#05a9ff] !text-[#0a1929] hover:bg-[#38beff]'
                : 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c]'
            }`}
          >
            {t('guide_links_view_all', language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
