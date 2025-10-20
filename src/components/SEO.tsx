'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import seoData from './SeoData';
import { usePathname } from 'next/navigation';

const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
const hreflangMap: Record<string, string> = { ua: 'uk' };

export default function SEO() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const pathname = usePathname();
  const baseUrl = 'https://www.generatepasswordto.me';
  const canonicalUrl = `${baseUrl}${pathname}`.replace(/\/$/, '');
  const seoInfo = seoData.find((data) => data.language === language) || seoData.find((data) => data.language === 'en');

  useEffect(() => {
    if (seoInfo) {
      // Update document title
      document.title = seoInfo.title;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', seoInfo.description);

      // Update Open Graph title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', seoInfo.title);

      // Update Open Graph description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', seoInfo.description);

      // Update Open Graph URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonicalUrl);
    }
  }, [language, seoInfo, canonicalUrl]);

  return (
    <>
      {/* AdSense */}
      <meta name="google-adsense-account" content="ca-pub-5995594246081561" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="generatepasswordto.me" />
      <meta property="og:image" content={`${baseUrl}/android-chrome-512x512.png`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Generate Password To Me Logo" />
      <meta property="og:locale" content={language === 'ua' ? 'uk_UA' : language} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoInfo?.title} />
      <meta name="twitter:description" content={seoInfo?.description} />
      <meta name="twitter:image" content={`${baseUrl}/android-chrome-512x512.png`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags */}
      {supportedLangs.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          href={`${baseUrl}/${lang}`}
          hrefLang={hreflangMap[lang] || lang}
        />
      ))}
      <link rel="alternate" href={`${baseUrl}/en`} hrefLang="x-default" />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="generatepasswordto.me" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2A4E63" />
    </>
  );
}