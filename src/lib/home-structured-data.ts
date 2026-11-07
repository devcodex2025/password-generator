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

  // Keep this list in lockstep with the visible FAQ accordion in
  // `src/components/SeoAccordion.jsx` (`getTrustFaq`). Marking up anything the
  // reader cannot see as a Q&A breaks Google's content-parity rule.
  const qa = [
    {
      q: t('faq_length_question') || 'How long should a password be?',
      a: t('faq_length_answer') || 'Use at least 12 characters for everyday accounts and 16 for email, banking and work. The preset buttons set 8, 12, 16 or 20 characters in one click.',
    },
    {
      q: t('faq_passphrase_question') || 'Is a passphrase stronger than a short password?',
      a: t('faq_passphrase_answer') || 'A passphrase of five or six random words is easier to type and usually stronger than a short password with symbols. Switch the generator to Words mode to create one.',
    },
    {
      q: t('faq_wifi_question') || 'How do I create a strong Wi-Fi password?',
      a: t('faq_wifi_answer') || 'Generate 16 or more random characters, set the router to WPA3 or WPA2/WPA3 mixed mode, and disable WPS. The Wi-Fi password guide covers the full router checklist.',
    },
    {
      q: t('faq_ideas_question') || 'Where can I find good password ideas?',
      a: t('faq_ideas_answer') || 'Generate several random options instead of copying password examples from articles or social media. Pick one you can store in a password manager, and use our strong-password guide to check length and entropy.',
    },
    {
      q: t('faq_create_question') || 'How do I create a strong password?',
      a: t('faq_create_answer') || 'Open the generator, choose 16 characters or a five-word passphrase, and let it create the value. Store it in a password manager and use it for one account only.',
    },
    {
      q: t('faq_manager_question') || 'Do I need a password manager?',
      a: t('faq_manager_answer') || 'Yes, once you have more accounts than you can memorize. A manager stores unique passwords, fills them on your devices and warns about breaches. Our best password managers comparison covers the 2026 options.',
    },
    {
      q: t('faq_storage_question') || 'Does Generate Password To Me store generated passwords?',
      a: t('faq_storage_answer') || 'No. Password generation runs in your browser, and generated passwords are not stored on our servers. The tool is designed around client-side generation and privacy-first use.',
    },
    {
      q: t('faq_sources_question') || 'Which security sources guide the recommendations?',
      a: t('faq_sources_answer') || 'The guidance is reviewed against NIST SP 800-63B password recommendations, PCI DSS v4.0 password requirements, and Have I Been Pwned k-anonymity breach-checking practices where breach checks are used.',
    },
    {
      q: t('faq_trustworthy_question') || 'How do you keep the FAQ trustworthy?',
      a: t('faq_trustworthy_answer') || 'We keep answers short, separate general security education from guarantees, cite primary sources, and review the FAQ when major password standards, browser APIs, or breach-checking practices change.',
    },
    {
      q: t('faq_review_question') || 'When was this FAQ reviewed?',
      a: t('faq_review_answer') || 'This FAQ was reviewed in April 2026. We update security guidance when major password standards, browser APIs, or breach-checking practices change.',
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
      '12 languages supported',
    ],
    screenshot: `${BASE_URL}/images/generate-password-preview.png`,
    isAccessibleForFree: true,
    inLanguage: HTML_LANG_MAP[locale] || 'en',
    // No aggregateRating: the site has no verified third-party ratings, and
    // self-serving review markup is ineligible and can trigger a manual action.
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
