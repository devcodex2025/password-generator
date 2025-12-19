import lang from './lang.json';

interface FaqSchemaProps {
  locale: string;
}

type LangKey = keyof typeof lang;
type LocaleKey = 'en' | 'ua' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'pl';

export default function FaqSchema({ locale }: FaqSchemaProps) {
  const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  const t = (key: string): string => {
    const langEntry = lang[key as LangKey];
    if (!langEntry) return '';
    const raw = langEntry[locale as LocaleKey];
    return stripHtml((raw as string) || '');
  };

  const qa = [
    {
      q: t('howtouse_title') || 'How to use the password generator?',
      a: [t('howtouse_intro'), t('howtouse_step1'), t('howtouse_step2'), t('howtouse_step3')]
        .filter(Boolean)
        .join(' '),
    },
    {
      q: t('seotext_why_title') || 'Why use this password generator?',
      a: [t('seotext_why1'), t('seotext_why2')].filter(Boolean).join(' '),
    },
    {
      q: t('security_standards_title') || 'Security standards compliance',
      a: [t('nist_compliance_desc'), t('pci_dss_compliance_desc')].filter(Boolean).join(' '),
    },
  ].filter(item => item.q && item.a);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} 
    />
  );
}
