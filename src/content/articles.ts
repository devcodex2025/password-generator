export const SUPPORTED_CONTENT_LANGUAGES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'] as const;

export type ContentLanguage = (typeof SUPPORTED_CONTENT_LANGUAGES)[number];

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocalizedArticleContent {
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sections: ArticleSection[];
}

export interface ArticleEntry {
  slug: string;
  category: 'security-basics' | 'policy' | 'implementation' | 'incident-response';
  readingMinutes: number;
  updatedAt: string;
  author: string;
  content: Partial<Record<ContentLanguage, LocalizedArticleContent>>;
}

const makeFallback = (title: string, excerpt: string, keywords: string[]): LocalizedArticleContent => ({
  title,
  excerpt,
  seoTitle: `${title} | generatepasswordto.me`,
  seoDescription: excerpt,
  keywords,
  sections: [
    {
      heading: 'Why this matters',
      paragraphs: [
        'Password security is still the fastest way to reduce account takeover risk.',
        'This guide is a prepared content shell: replace these paragraphs with your final editorial copy for each language.',
      ],
      bullets: [
        'Define user risk level and account impact.',
        'Apply modern standards such as NIST 800-63B and PCI DSS where relevant.',
        'Track measurable outcomes (reset rates, lockouts, MFA adoption).',
      ],
    },
    {
      heading: 'Implementation checklist',
      paragraphs: [
        'Use this section as a practical checklist for your team.',
        'Each locale can have custom examples and legal notes to avoid duplicate low-value pages.',
      ],
      bullets: [
        'Document policy and edge cases.',
        'Review UX for mobile and desktop.',
        'Re-audit every quarter and update publish date.',
      ],
    },
  ],
});

export const ARTICLE_CATALOG: ArticleEntry[] = [
  {
    slug: 'how-to-create-strong-passwords',
    category: 'security-basics',
    readingMinutes: 8,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'How to Create Strong Passwords in 2026',
        'A practical guide to creating strong passwords, avoiding common mistakes, and improving account security.',
        ['strong password tips', 'create secure password', 'password best practices']
      ),
    },
  },
  {
    slug: 'password-manager-vs-manual-storage',
    category: 'security-basics',
    readingMinutes: 9,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Password Manager vs Manual Storage',
        'Compare password managers with manual storage methods and choose the safest workflow for your accounts.',
        ['password manager guide', 'store passwords safely', 'password vault comparison']
      ),
    },
  },
  {
    slug: 'passphrase-vs-password-entropy',
    category: 'implementation',
    readingMinutes: 7,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Passphrase vs Password: Entropy Explained',
        'Understand entropy and learn when passphrases are stronger than traditional random passwords.',
        ['passphrase entropy', 'password entropy explained', 'passphrase security']
      ),
    },
  },
  {
    slug: 'nist-800-63b-password-rules',
    category: 'policy',
    readingMinutes: 10,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'NIST 800-63B Password Rules: Practical Summary',
        'A plain-language summary of NIST 800-63B recommendations for modern password policies.',
        ['nist 800-63b password policy', 'nist password guidance', 'modern password rules']
      ),
    },
  },
  {
    slug: 'pci-dss-password-requirements',
    category: 'policy',
    readingMinutes: 10,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'PCI DSS Password Requirements for Teams',
        'What PCI DSS expects from password controls and how to align your workflow without harming UX.',
        ['pci dss password requirements', 'compliance password policy', 'payment security passwords']
      ),
    },
  },
  {
    slug: 'what-to-do-after-password-breach',
    category: 'incident-response',
    readingMinutes: 8,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'What to Do After a Password Breach',
        'Step-by-step response plan after compromised credentials, including resets, monitoring, and MFA.',
        ['password breach response', 'account compromised checklist', 'credential leak recovery']
      ),
    },
  },
  {
    slug: 'two-factor-authentication-basics',
    category: 'security-basics',
    readingMinutes: 6,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Two-Factor Authentication Basics',
        'A clear guide to 2FA methods, setup priorities, and common mistakes to avoid.',
        ['2fa setup guide', 'two-factor authentication basics', 'mfa security guide']
      ),
    },
  },
  {
    slug: 'common-password-mistakes',
    category: 'security-basics',
    readingMinutes: 7,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Most Common Password Mistakes and Fixes',
        'Review high-risk password habits and practical ways to replace them with secure routines.',
        ['common password mistakes', 'weak password examples', 'password safety checklist']
      ),
    },
  },
  {
    slug: 'team-password-policy-template',
    category: 'implementation',
    readingMinutes: 9,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Team Password Policy Template',
        'Use this policy framework to standardize password security across your team.',
        ['password policy template', 'company password policy', 'team security policy']
      ),
    },
  },
  {
    slug: 'secure-password-generator-guide',
    category: 'implementation',
    readingMinutes: 8,
    updatedAt: '2026-02-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: makeFallback(
        'Secure Password Generator: Full Guide',
        'How to configure password length, character sets, and standards for safer generated passwords.',
        ['secure password generator guide', 'random password tool', 'password generator settings']
      ),
    },
  },
];

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLE_CATALOG.find((article) => article.slug === slug);
}

export function getLocalizedArticle(article: ArticleEntry, locale: string): LocalizedArticleContent {
  const language = (SUPPORTED_CONTENT_LANGUAGES.includes(locale as ContentLanguage) ? locale : 'en') as ContentLanguage;
  return article.content[language] || article.content.en || makeFallback(article.slug, article.slug, []);
}
