'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { ThemeContext } from '../context/ThemeContext';
import lang from './lang.json';
import seoData from './SeoData';
import { getLinkLabel } from '@/utils/linkTranslations';
import { getGuideTitle } from '@/utils/guideTitles';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useContext(ThemeContext);
  const locale = language || 'en';
  const linkClass =
    'relative inline-flex items-center rounded-md px-1.5 py-1 text-[#3a6077] dark:text-[#38beff] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2A4E63] dark:hover:text-[#d7f2ff] hover:underline underline-offset-4 decoration-2';
  const externalLinkClass =
    'text-sm relative inline-flex items-center rounded-md px-2 py-1 !text-[#3a6077] dark:!text-[#d7f2ff] transition-all duration-200 hover:-translate-y-0.5 hover:!text-[#2A4E63] dark:hover:!text-white hover:bg-[#E5F6FF] dark:hover:bg-[#111827] hover:underline underline-offset-4 decoration-2';
  const linkLabel = (key) => getLinkLabel(key, locale);
  const headingLabel = (key) => t(key, locale);

  const sitemapLink = { label: linkLabel('sitemap'), href: '/sitemap.xml', external: true };
  const githubLink = { label: linkLabel('github'), href: 'https://github.com/devcodex2025/password-generator', external: true };
  const legalLinks = [
    { label: linkLabel('privacyPolicy'), href: `/${locale}/privacy-policy` },
    { label: linkLabel('termsOfService'), href: `/${locale}/terms-of-service` },
    { label: linkLabel('contact'), href: `/${locale}/contact` },
  ];

  const homepageGuideSlugs = new Set([
    'how-to-create-strong-passwords',
    'what-to-do-after-password-breach',
    'two-factor-authentication-basics',
    'nist-800-63b-password-rules',
    'password-manager-vs-manual-storage',
    'common-password-mistakes',
  ]);

  const guideSlugs = [
    'passphrase-vs-password-entropy',
    'pci-dss-password-requirements',
    'team-password-policy-template',
    'secure-password-generator-guide',
    'vpn-security-privacy-guide',
  ].filter((slug) => !homepageGuideSlugs.has(slug));

  const guideArticleLinks = guideSlugs.map((slug) => ({
    href: `/${locale}/guides/${slug}`,
    label: getGuideTitle(slug, locale),
  }));

  return (
    <>
      <footer className="footer-accent-scope w-full py-6 px-2 dark:px-0 border-t border-[#E5F6FF] dark:border-transparent bg-transparent">
        <div className="mb-5 h-px w-full bg-[#dff2fb] dark:hidden" />
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 items-start justify-items-stretch gap-6 text-left">
          <div className="w-full min-w-0 self-stretch">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{headingLabel('footer_guide_articles')}</h3>
            <ul className="mt-3 w-full space-y-2 text-sm text-slate-600 dark:text-slate-200">
              {guideArticleLinks.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/best-password-managers-2026`} className={linkClass}>
                  {linkLabel('bestManagers')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full min-w-0 self-stretch">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{headingLabel('footer_legal')}</h3>
            <ul className="mt-3 w-full space-y-3 text-sm text-slate-600 dark:text-slate-200">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-[#b2b2b2] md:flex-row md:items-end md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src={isDarkMode ? '/images/logo-dark.svg' : '/images/logo.svg'}
              alt="Generate Password To Me - Secure Password Generator Logo"
              width={180}
              height={58}
              className="w-[180px] h-auto"
              loading="lazy"
            />
          </div>
          <div className="text-center md:text-center">
            {t('footer_copyright', language)} © <span className="text-[#05a9ff] dark:!text-[#93c5fd] font-bold">GeneratePasswordTo.Me</span> {currentYear}
          </div>
          <div className="flex items-center gap-4">
            <Link href={githubLink.href} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              <GitHubIcon fontSize="small" />
              {githubLink.label}
            </Link>
            <Link href={sitemapLink.href} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              <LanguageIcon fontSize="small" />
              {sitemapLink.label}
            </Link>
          </div>
        </div>
      </footer>

      <div className="sr-only" aria-hidden="true">
        <h2>TL;DR</h2>
        <p>
          {(seoData.find((d) => d.language === (language || 'en')) || seoData.find((d) => d.language === 'en'))?.description}
        </p>
      </div>
    </>
  );
};

export default Footer;
