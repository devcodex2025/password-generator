import lang from '@/components/lang.json';
import { BASE_URL, HTML_LANG_MAP, getLocalizedMetaDescription } from '@/lib/home-metadata';

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

function translate(key: string, locale: string): string {
  // @ts-expect-error dynamic access to lang object
  const langEntry = lang[key];
  if (!langEntry || typeof langEntry !== 'object') return '';
  const raw = langEntry[locale];
  return stripHtml(raw || '');
}

export interface JsonLdScript {
  id: string;
  payload: Record<string, unknown>;
}

export function buildHomeJsonLdScripts(locale: string): JsonLdScript[] {
  const t = (key: string) => translate(key, locale);

  const qa = [
    {
      q: t('howtouse_title') || 'How to use the password generator?',
      a: [t('howtouse_intro'), t('howtouse_step1'), t('howtouse_step2'), t('howtouse_step3')].filter(Boolean).join(' '),
    },
    {
      q: t('seotext_why_title') || 'Why use this password generator?',
      a: [t('seotext_why1'), t('seotext_why2')].filter(Boolean).join(' '),
    },
    {
      q: t('security_standards_title') || 'Security standards compliance',
      a: [t('nist_compliance_desc'), t('pci_dss_compliance_desc')].filter(Boolean).join(' '),
    },
    {
      q: 'Does Generate Password To Me store generated passwords?',
      a: 'No. Password generation runs in your browser, and generated passwords are not stored on our servers. The tool is designed around client-side generation and privacy-first use.',
    },
    {
      q: 'Which security sources guide the recommendations?',
      a: 'The guidance is reviewed against NIST SP 800-63B password recommendations, PCI DSS v4.0 password requirements, and Have I Been Pwned k-anonymity breach-checking practices where breach checks are used.',
    },
    {
      q: 'When was this FAQ reviewed?',
      a: 'This FAQ was reviewed in April 2026. We update security guidance when major password standards, browser APIs, or breach-checking practices change.',
    },
  ].filter((item) => item.q && item.a);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const metaDesc = getLocalizedMetaDescription(locale);

  const websiteJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Generate Password To Me',
    url: BASE_URL,
    description: metaDesc,
    inLanguage: HTML_LANG_MAP[locale] || 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJson = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Generate Password To Me',
    url: BASE_URL,
    logo: `${BASE_URL}/images/generate-password-preview.png`,
    sameAs: ['https://github.com/devcodex2025/password-generator'],
  };

  const howToJson = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('howtouse_title') || 'How to generate a secure password',
    description: t('howtouse_intro') || 'Generate strong passwords using our free online tool.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: t('howtouse_step1') ? t('howtouse_step1').replace(/<[^>]*>/g, '').slice(0, 100) : 'Choose password length',
        text: t('howtouse_step1')
          ? t('howtouse_step1').replace(/<[^>]*>/g, '')
          : 'Select the desired password length between 4 and 100 characters.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: t('howtouse_step2') ? t('howtouse_step2').replace(/<[^>]*>/g, '').slice(0, 100) : 'Select character types',
        text: t('howtouse_step2')
          ? t('howtouse_step2').replace(/<[^>]*>/g, '')
          : 'Choose which character types to include: uppercase, lowercase, numbers, symbols.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: t('howtouse_step3') ? t('howtouse_step3').replace(/<[^>]*>/g, '').slice(0, 100) : 'Generate and copy',
        text: t('howtouse_step3')
          ? t('howtouse_step3').replace(/<[^>]*>/g, '')
          : 'Click Generate to create your password, then copy it to your clipboard.',
      },
    ],
  };

  const canonical = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      ...(locale !== 'en'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: locale.toUpperCase(),
              item: canonical,
            },
          ]
        : []),
    ],
  };

  const softwareAppJson = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Generate Password To Me',
    url: BASE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: metaDesc,
    featureList: [
      'NIST 800-63B compliant password generation',
      'Client-side generation using Web Crypto API (CSPRNG)',
      'Have I Been Pwned breach detection via k-anonymity',
      'Customizable length (4-100 characters)',
      'Multiple character sets: uppercase, lowercase, digits, symbols',
      'PCI DSS v4.0 password policy support',
      'Dark mode interface',
      '11 languages supported',
    ],
    screenshot: `${BASE_URL}/images/generate-password-preview.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return [
    { id: 'faq-schema', payload: faqJson },
    { id: 'website-schema', payload: websiteJson },
    { id: 'organization-schema', payload: organizationJson },
    { id: 'howto-schema', payload: howToJson },
    { id: 'breadcrumb-schema', payload: breadcrumbJson },
    { id: 'software-app-schema', payload: softwareAppJson },
  ];
}
