'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import lang from './lang.json';
import seoData from './SeoData';
import { getLinkLabel } from '@/utils/linkTranslations';
import { getGuideTitle } from '@/utils/guideTitles';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
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
    { label: t('aboutus_title', locale), href: `/${locale}/about` },
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
      <footer className="footer-accent-scope w-full border-t border-[#E5F6FF] px-4 py-8 dark:border-transparent">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
          <div className="flex w-full flex-col items-start justify-between gap-8 text-left sm:flex-row sm:items-start sm:gap-12">
            <div className="flex w-full min-w-0 flex-col items-start sm:w-auto">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{headingLabel('footer_guide_articles')}</h3>
              <ul className="mt-3 flex w-full flex-col items-start space-y-2 text-sm text-slate-600 dark:text-slate-200">
                {guideArticleLinks.slice(0, 4).map((item) => (
                  <li key={item.href} className="w-full">
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="w-full">
                  <Link href={`/${locale}/best-password-managers-2026`} className={linkClass}>
                    {linkLabel('bestManagers')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex w-full min-w-0 flex-col items-start sm:w-auto">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{headingLabel('footer_legal')}</h3>
              <ul className="mt-3 flex w-full flex-col items-start space-y-3 text-sm text-slate-600 dark:text-slate-200">
                {legalLinks.map((item) => (
                  <li key={item.href} className="w-full">
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-5 border-t border-[#E5F6FF] pt-6 text-sm text-[#6b7280] dark:text-[#b2b2b2] md:grid-cols-[1fr_auto_1fr] md:items-center dark:border-[#374151]">
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              aria-label={t('a11y_footer_home', locale)}
              className="inline-flex justify-self-center transition-opacity duration-200 hover:opacity-90 md:justify-self-start"
            >
              <Image
                src="/images/logo.svg"
                alt="Generate Password To Me - Secure Password Generator Logo"
                width={200}
                height={45}
                className="h-auto w-[170px] object-contain sm:w-[190px]"
                loading="lazy"
              />
            </Link>
            <p className="text-center">
              {t('footer_copyright', language)} © <span className="font-bold text-[#0b6ea8] dark:!text-[#7dd3fc]">GeneratePasswordTo.Me</span> {currentYear}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-self-end">
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
