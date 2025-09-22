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

  useEffect(() => {
    const seoInfo = seoData.find((data) => data.language === language);
    if (seoInfo) {
      document.title = seoInfo.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', seoInfo.description);
    }
  }, [language]);

  return (
    <>
      <meta name="google-adsense-account" content="ca-pub-5995594246081561" />
      <meta property="og:title" content={seoData.find((data) => data.language === language)?.title} />
      <meta
        property="og:description"
        content={seoData.find((data) => data.language === language)?.description}
      />
      <meta property="og:locale" content={language === 'ua' ? 'uk_UA' : language} />
      <link rel="canonical" href={canonicalUrl} />
      
      {supportedLangs.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          href={`https://www.generatepasswordto.me/${lang}`}
          hrefLang={hreflangMap[lang] || lang}
        />
      ))}
      <link rel="alternate" href="https://www.generatepasswordto.me/en" hrefLang="x-default" />
    </>
  );
}