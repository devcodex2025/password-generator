'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '../context/ThemeContext';
import lang from './lang.json';
import seoData from './SeoData';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const footerLabels = {
  guides: {
    ua: 'Гайди', en: 'Guides', es: 'Guias', fr: 'Guides', de: 'Leitfaeden', it: 'Guide', pt: 'Guias', ru: 'Гайды', zh: '指南', ja: 'ガイド', pl: 'Poradniki',
  },
  nist: {
    ua: 'NIST', en: 'NIST', es: 'NIST', fr: 'NIST', de: 'NIST', it: 'NIST', pt: 'NIST', ru: 'NIST', zh: 'NIST', ja: 'NIST', pl: 'NIST',
  },
  pci: {
    ua: 'PCI DSS', en: 'PCI DSS', es: 'PCI DSS', fr: 'PCI DSS', de: 'PCI DSS', it: 'PCI DSS', pt: 'PCI DSS', ru: 'PCI DSS', zh: 'PCI DSS', ja: 'PCI DSS', pl: 'PCI DSS',
  },
  afterBreach: {
    ua: 'Після витоку пароля',
    en: 'After Password Breach',
    es: 'Despues de una filtracion',
    fr: 'Apres une fuite',
    de: 'Nach Passwortleck',
    it: 'Dopo una violazione',
    pt: 'Apos vazamento',
    ru: 'После утечки пароля',
    zh: '密码泄露后',
    ja: '漏えい後',
    pl: 'Po wycieku hasla',
  },
  sitemap: {
    ua: 'Карта сайту', en: 'Sitemap', es: 'Mapa del sitio', fr: 'Plan du site', de: 'Sitemap', it: 'Mappa del sito', pt: 'Mapa do site', ru: 'Карта сайта', zh: '站点地图', ja: 'サイトマップ', pl: 'Mapa strony',
  },
  github: {
    ua: 'GitHub', en: 'GitHub', es: 'GitHub', fr: 'GitHub', de: 'GitHub', it: 'GitHub', pt: 'GitHub', ru: 'GitHub', zh: 'GitHub', ja: 'GitHub', pl: 'GitHub',
  },
};

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useContext(ThemeContext);
  const locale = language || 'en';
  const label = (key) => footerLabels[key]?.[locale] || footerLabels[key]?.en || key;

  const firstRowLinks = [
    { label: label('guides'), href: `/${locale}/guides` },
    { label: label('nist'), href: `/${locale}/guides/nist-800-63b-password-rules` },
    { label: label('pci'), href: `/${locale}/guides/pci-dss-password-requirements` },
    { label: label('afterBreach'), href: `/${locale}/guides/what-to-do-after-password-breach` },
  ];

  const sitemapLink = { label: label('sitemap'), href: '/sitemap.xml', external: true };
  const githubLink = { label: label('github'), href: 'https://github.com/devcodex2025/password-generator', external: true };

  return (
    <>
      <footer className="footer-accent-scope w-full py-6 px-2 border-t border-[#E5F6FF] dark:border-[#374151]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Image
              src={isDarkMode ? '/images/logo.svg' : '/images/logo.svg'}
              alt="Generate Password To Me - Secure Password Generator Logo"
              width={200}
              height={64}
              className="w-[200px] h-auto"
              priority
            />
            <ul className="hidden md:flex items-center justify-end gap-6 text-base text-right">
              {firstRowLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#05a9ff] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <ul className="grid grid-cols-2 gap-3 text-base text-center md:hidden">
              {firstRowLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#05a9ff] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 w-full">
              <div className="flex flex-col items-center gap-2">
                <a
                  href={githubLink.href}
                  target={githubLink.external ? '_blank' : undefined}
                  rel={githubLink.external ? 'noopener noreferrer' : undefined}
                  className="text-sm hover:text-[#05a9ff] transition-colors"
                >
                  {githubLink.label}
                </a>
                <a
                  href={sitemapLink.href}
                  target={sitemapLink.external ? '_blank' : undefined}
                  rel={sitemapLink.external ? 'noopener noreferrer' : undefined}
                  className="text-sm hover:text-[#05a9ff] transition-colors"
                >
                  {sitemapLink.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-[#b2b2b2] text-center">
          {t('footer_copyright', language)} © <span className="text-[#05a9ff] dark:!text-[#696969] font-bold">GeneratePasswordTo.Me</span> {currentYear}
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
