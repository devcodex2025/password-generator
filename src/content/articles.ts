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
import * as vpnSecurityPrivacyGuide from './articles/vpn-security-privacy-guide';

export const SUPPORTED_CONTENT_LANGUAGES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'] as const;

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
    readingMinutes: 14,
    updatedAt: '2026-10-31',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: howToCreateStrongPasswords.en,
      ua: howToCreateStrongPasswords.ua,
      es: howToCreateStrongPasswords.es,
      fr: howToCreateStrongPasswords.fr,
      de: howToCreateStrongPasswords.de,
      it: howToCreateStrongPasswords.it,
      pt: howToCreateStrongPasswords.pt,
      ru: howToCreateStrongPasswords.ru,
      zh: howToCreateStrongPasswords.zh,
      ja: howToCreateStrongPasswords.ja,
      pl: howToCreateStrongPasswords.pl,
      vi: howToCreateStrongPasswords.vi,
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
      es: passwordManagerVsManualStorage.es,
      fr: passwordManagerVsManualStorage.fr,
      de: passwordManagerVsManualStorage.de,
      it: passwordManagerVsManualStorage.it,
      pt: passwordManagerVsManualStorage.pt,
      ru: passwordManagerVsManualStorage.ru,
      zh: passwordManagerVsManualStorage.zh,
      ja: passwordManagerVsManualStorage.ja,
      pl: passwordManagerVsManualStorage.pl,
      vi: passwordManagerVsManualStorage.vi,
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
      es: passphraseVsPasswordEntropy.es,
      fr: passphraseVsPasswordEntropy.fr,
      de: passphraseVsPasswordEntropy.de,
      it: passphraseVsPasswordEntropy.it,
      pt: passphraseVsPasswordEntropy.pt,
      ru: passphraseVsPasswordEntropy.ru,
      zh: passphraseVsPasswordEntropy.zh,
      ja: passphraseVsPasswordEntropy.ja,
      pl: passphraseVsPasswordEntropy.pl,
      vi: passphraseVsPasswordEntropy.vi,
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
      es: nist80063bPasswordRules.es,
      fr: nist80063bPasswordRules.fr,
      de: nist80063bPasswordRules.de,
      it: nist80063bPasswordRules.it,
      pt: nist80063bPasswordRules.pt,
      ru: nist80063bPasswordRules.ru,
      zh: nist80063bPasswordRules.zh,
      ja: nist80063bPasswordRules.ja,
      pl: nist80063bPasswordRules.pl,
      vi: nist80063bPasswordRules.vi,
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
      es: pciDssPasswordRequirements.es,
      fr: pciDssPasswordRequirements.fr,
      de: pciDssPasswordRequirements.de,
      it: pciDssPasswordRequirements.it,
      pt: pciDssPasswordRequirements.pt,
      ru: pciDssPasswordRequirements.ru,
      zh: pciDssPasswordRequirements.zh,
      ja: pciDssPasswordRequirements.ja,
      pl: pciDssPasswordRequirements.pl,
      vi: pciDssPasswordRequirements.vi,
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
      es: whatToDoAfterPasswordBreach.es,
      fr: whatToDoAfterPasswordBreach.fr,
      de: whatToDoAfterPasswordBreach.de,
      it: whatToDoAfterPasswordBreach.it,
      pt: whatToDoAfterPasswordBreach.pt,
      ru: whatToDoAfterPasswordBreach.ru,
      zh: whatToDoAfterPasswordBreach.zh,
      ja: whatToDoAfterPasswordBreach.ja,
      pl: whatToDoAfterPasswordBreach.pl,
      vi: whatToDoAfterPasswordBreach.vi,
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
      es: twoFactorAuthenticationBasics.es,
      fr: twoFactorAuthenticationBasics.fr,
      de: twoFactorAuthenticationBasics.de,
      it: twoFactorAuthenticationBasics.it,
      pt: twoFactorAuthenticationBasics.pt,
      ru: twoFactorAuthenticationBasics.ru,
      zh: twoFactorAuthenticationBasics.zh,
      ja: twoFactorAuthenticationBasics.ja,
      pl: twoFactorAuthenticationBasics.pl,
      vi: twoFactorAuthenticationBasics.vi,
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
      es: commonPasswordMistakes.es,
      fr: commonPasswordMistakes.fr,
      de: commonPasswordMistakes.de,
      it: commonPasswordMistakes.it,
      pt: commonPasswordMistakes.pt,
      ru: commonPasswordMistakes.ru,
      zh: commonPasswordMistakes.zh,
      ja: commonPasswordMistakes.ja,
      pl: commonPasswordMistakes.pl,
      vi: commonPasswordMistakes.vi,
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
      es: teamPasswordPolicyTemplate.es,
      fr: teamPasswordPolicyTemplate.fr,
      de: teamPasswordPolicyTemplate.de,
      it: teamPasswordPolicyTemplate.it,
      pt: teamPasswordPolicyTemplate.pt,
      ru: teamPasswordPolicyTemplate.ru,
      zh: teamPasswordPolicyTemplate.zh,
      ja: teamPasswordPolicyTemplate.ja,
      pl: teamPasswordPolicyTemplate.pl,
      vi: teamPasswordPolicyTemplate.vi,
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
      es: securePasswordGeneratorGuide.es,
      fr: securePasswordGeneratorGuide.fr,
      de: securePasswordGeneratorGuide.de,
      it: securePasswordGeneratorGuide.it,
      pt: securePasswordGeneratorGuide.pt,
      ru: securePasswordGeneratorGuide.ru,
      zh: securePasswordGeneratorGuide.zh,
      ja: securePasswordGeneratorGuide.ja,
      pl: securePasswordGeneratorGuide.pl,
      vi: securePasswordGeneratorGuide.vi,
    },
  },
  {
    slug: 'vpn-security-privacy-guide',
    category: 'security-basics',
    readingMinutes: 16,
    updatedAt: '2026-04-29',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: vpnSecurityPrivacyGuide.en,
      ua: vpnSecurityPrivacyGuide.ua,
      es: vpnSecurityPrivacyGuide.es,
      fr: vpnSecurityPrivacyGuide.fr,
      de: vpnSecurityPrivacyGuide.de,
      it: vpnSecurityPrivacyGuide.it,
      pt: vpnSecurityPrivacyGuide.pt,
      ru: vpnSecurityPrivacyGuide.ru,
      zh: vpnSecurityPrivacyGuide.zh,
      ja: vpnSecurityPrivacyGuide.ja,
      pl: vpnSecurityPrivacyGuide.pl,
      vi: vpnSecurityPrivacyGuide.vi,
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
