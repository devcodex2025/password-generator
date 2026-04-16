import * as howToCreateStrongPasswords from './articles/how-to-create-strong-passwords';
import * as passwordManagerVsManualStorage from './articles/password-manager-vs-manual-storage';
import * as passphraseVsPasswordEntropy from './articles/passphrase-vs-password-entropy';
import * as nist80063bPasswordRules from './articles/nist-800-63b-password-rules';
import * as pciDssPasswordRequirements from './articles/pci-dss-password-requirements';
import * as whatToDoAfterPasswordBreach from './articles/what-to-do-after-password-breach';
import * as twoFactorAuthenticationBasics from './articles/two-factor-authentication-basics';
import * as commonPasswordMistakes from './articles/common-password-mistakes';
import * as teamPasswordPolicyTemplate from './articles/team-password-policy-template';
import * as securePasswordGeneratorGuide from './articles/secure-password-generator-guide';

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

export const ARTICLE_CATALOG: ArticleEntry[] = [
  {
    slug: 'how-to-create-strong-passwords',
    category: 'security-basics',
    readingMinutes: 12,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: howToCreateStrongPasswords.en,
      ua: howToCreateStrongPasswords.ua,
    },
  },
  {
    slug: 'password-manager-vs-manual-storage',
    category: 'security-basics',
    readingMinutes: 14,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: passwordManagerVsManualStorage.en,
      ua: passwordManagerVsManualStorage.ua,
    },
  },
  {
    slug: 'passphrase-vs-password-entropy',
    category: 'implementation',
    readingMinutes: 11,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: passphraseVsPasswordEntropy.en,
      ua: passphraseVsPasswordEntropy.ua,
    },
  },
  {
    slug: 'nist-800-63b-password-rules',
    category: 'policy',
    readingMinutes: 13,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: nist80063bPasswordRules.en,
      ua: nist80063bPasswordRules.ua,
    },
  },
  {
    slug: 'pci-dss-password-requirements',
    category: 'policy',
    readingMinutes: 12,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: pciDssPasswordRequirements.en,
      ua: pciDssPasswordRequirements.ua,
    },
  },
  {
    slug: 'what-to-do-after-password-breach',
    category: 'incident-response',
    readingMinutes: 12,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: whatToDoAfterPasswordBreach.en,
      ua: whatToDoAfterPasswordBreach.ua,
    },
  },
  {
    slug: 'two-factor-authentication-basics',
    category: 'security-basics',
    readingMinutes: 11,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: twoFactorAuthenticationBasics.en,
      ua: twoFactorAuthenticationBasics.ua,
    },
  },
  {
    slug: 'common-password-mistakes',
    category: 'security-basics',
    readingMinutes: 13,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: commonPasswordMistakes.en,
      ua: commonPasswordMistakes.ua,
    },
  },
  {
    slug: 'team-password-policy-template',
    category: 'implementation',
    readingMinutes: 14,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: teamPasswordPolicyTemplate.en,
      ua: teamPasswordPolicyTemplate.ua,
    },
  },
  {
    slug: 'secure-password-generator-guide',
    category: 'implementation',
    readingMinutes: 12,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: securePasswordGeneratorGuide.en,
      ua: securePasswordGeneratorGuide.ua,
    },
  },
];

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLE_CATALOG.find((article) => article.slug === slug);
}

export function getLocalizedArticle(article: ArticleEntry, locale: string): LocalizedArticleContent {
  const language = (SUPPORTED_CONTENT_LANGUAGES.includes(locale as ContentLanguage) ? locale : 'en') as ContentLanguage;
  return article.content[language] || article.content.en || {
    title: article.slug,
    excerpt: article.slug,
    seoTitle: `${article.slug} | generatepasswordto.me`,
    seoDescription: article.slug,
    keywords: [],
    sections: [],
  };
}
