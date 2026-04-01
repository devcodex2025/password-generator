export type GuideInterlinkPlacement = 'intro' | 'body' | 'conclusion';

type BaseInterlinkEntry = {
  anchorKey: string;
  placement: GuideInterlinkPlacement;
};

type HomeInterlinkEntry = BaseInterlinkEntry & {
  kind: 'home';
};

type GuidesInterlinkEntry = BaseInterlinkEntry & {
  kind: 'guides';
};

type GuideTargetInterlinkEntry = BaseInterlinkEntry & {
  kind: 'guide';
  target: string;
};

export type GuideInterlinkEntry = HomeInterlinkEntry | GuidesInterlinkEntry | GuideTargetInterlinkEntry;

const GUIDE_INTERLINK_PLAN: Record<string, GuideInterlinkEntry[]> = {
  'how-to-create-strong-passwords': [
    { kind: 'guide', target: 'secure-password-generator-guide', anchorKey: 'generator-mixes-randomness', placement: 'intro' },
    { kind: 'guide', target: 'common-password-mistakes', anchorKey: 'avoid-common-password-mistakes', placement: 'body' },
    { kind: 'guide', target: 'passphrase-vs-password-entropy', anchorKey: 'passphrases-beat-short-passwords', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'common-password-mistakes': [
    { kind: 'guide', target: 'nist-800-63b-password-rules', anchorKey: 'align-with-modern-nist-standards', placement: 'intro' },
    { kind: 'guide', target: 'how-to-create-strong-passwords', anchorKey: 'strong-password-method', placement: 'body' },
    { kind: 'guide', target: 'two-factor-authentication-basics', anchorKey: 'combine-with-mfa', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'passphrase-vs-password-entropy': [
    { kind: 'guide', target: 'how-to-create-strong-passwords', anchorKey: 'how-to-use-passphrases', placement: 'intro' },
    { kind: 'guide', target: 'password-manager-vs-manual-storage', anchorKey: 'store-long-secrets-in-manager', placement: 'body' },
    { kind: 'guide', target: 'secure-password-generator-guide', anchorKey: 'generate-high-entropy-passphrases', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'secure-password-generator-guide': [
    { kind: 'guide', target: 'how-to-create-strong-passwords', anchorKey: 'what-makes-a-strong-password', placement: 'intro' },
    { kind: 'guide', target: 'passphrase-vs-password-entropy', anchorKey: 'apply-entropy-principles', placement: 'body' },
    { kind: 'guide', target: 'common-password-mistakes', anchorKey: 'avoid-mistakes-while-generating', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'password-manager-vs-manual-storage': [
    { kind: 'guide', target: 'team-password-policy-template', anchorKey: 'standardize-storage-policies', placement: 'intro' },
    { kind: 'guide', target: 'secure-password-generator-guide', anchorKey: 'generate-before-saving', placement: 'body' },
    { kind: 'guide', target: 'passphrase-vs-password-entropy', anchorKey: 'manage-entropy-rich-passphrases', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'team-password-policy-template': [
    { kind: 'guide', target: 'password-manager-vs-manual-storage', anchorKey: 'store-long-secrets-in-manager', placement: 'intro' },
    { kind: 'guide', target: 'secure-password-generator-guide', anchorKey: 'organize-generator-for-teams', placement: 'body' },
    { kind: 'guide', target: 'two-factor-authentication-basics', anchorKey: 'add-mfa-rules', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'nist-800-63b-password-rules': [
    { kind: 'guide', target: 'common-password-mistakes', anchorKey: 'align-with-modern-nist-standards', placement: 'intro' },
    { kind: 'guide', target: 'pci-dss-password-requirements', anchorKey: 'compare-pci-with-nist', placement: 'body' },
    { kind: 'guide', target: 'what-to-do-after-password-breach', anchorKey: 'align-response-with-nist', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'pci-dss-password-requirements': [
    { kind: 'guide', target: 'nist-800-63b-password-rules', anchorKey: 'compare-pci-with-nist', placement: 'intro' },
    { kind: 'guide', target: 'team-password-policy-template', anchorKey: 'build-pci-policies', placement: 'body' },
    { kind: 'guide', target: 'what-to-do-after-password-breach', anchorKey: 'restore-pci-compliance', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'what-to-do-after-password-breach': [
    { kind: 'guide', target: 'nist-800-63b-password-rules', anchorKey: 'align-response-with-nist', placement: 'intro' },
    { kind: 'guide', target: 'pci-dss-password-requirements', anchorKey: 'restore-pci-compliance', placement: 'body' },
    { kind: 'guide', target: 'two-factor-authentication-basics', anchorKey: 'reconfigure-mfa-after-breach', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
  'two-factor-authentication-basics': [
    { kind: 'guide', target: 'what-to-do-after-password-breach', anchorKey: 'mfa-helps-breach-recovery', placement: 'intro' },
    { kind: 'guide', target: 'common-password-mistakes', anchorKey: 'pair-mfa-with-better-passwords', placement: 'body' },
    { kind: 'guide', target: 'team-password-policy-template', anchorKey: 'include-mfa-in-policy', placement: 'body' },
    { kind: 'home', anchorKey: 'home-generator', placement: 'conclusion' },
    { kind: 'guides', anchorKey: 'visit-guide-hub', placement: 'conclusion' },
  ],
};

export function getGuideInterlinkEntries(slug: string): GuideInterlinkEntry[] {
  return GUIDE_INTERLINK_PLAN[slug] ?? [];
}

export function resolveGuideInterlinkHref(locale: string, entry: GuideInterlinkEntry): string {
  switch (entry.kind) {
    case 'home':
      return `/${locale}/`;
    case 'guides':
      return `/${locale}/guides`;
    case 'guide':
      return `/${locale}/guides/${entry.target}`;
  }
}
