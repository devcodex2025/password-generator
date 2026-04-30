import Link from 'next/link';
import type { ReactNode } from 'react';

type GuideLinkTarget = {
  slug: string;
  href: string;
  phrases: string[];
  title: string;
};

type InterlinkState = {
  linkedSlugs: Set<string>;
  totalLinks: number;
  maxLinks: number;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWordBoundaries(phrase: string): boolean {
  return /[A-Za-z0-9А-Яа-яЁёЇїІіЄєҐґ]/.test(phrase);
}

function buildPhraseRegex(phrase: string): RegExp {
  const source = escapeRegExp(phrase);
  if (hasWordBoundaries(phrase)) {
    return new RegExp(`\\b${source}\\b`, 'i');
  }
  return new RegExp(source, 'i');
}

function normalizePhrase(phrase: string): string {
  return phrase.trim().replace(/\s+/g, ' ');
}

function findBestMatch(text: string, targets: GuideLinkTarget[], state: InterlinkState) {
  let best: { index: number; length: number; target: GuideLinkTarget; match: string } | null = null;
  const source = text;

  for (const target of targets) {
    if (state.linkedSlugs.has(target.slug)) continue;
    for (const phrase of target.phrases) {
      if (!phrase) continue;
      const regex = buildPhraseRegex(phrase);
      const match = regex.exec(source);
      if (!match) continue;
      const index = match.index;
      const length = match[0].length;
      if (!best || index < best.index || (index === best.index && length > best.length)) {
        best = { index, length, target, match: match[0] };
      }
    }
  }

  return best;
}

function renderLinkedSegments(
  text: string,
  targets: GuideLinkTarget[],
  state: InterlinkState,
  keyPrefix: string,
): ReactNode[] {
  if (!text) return [];

  const nodes: ReactNode[] = [];
  let remaining = text;
  let localIndex = 0;

  while (remaining.length > 0) {
    const canLink = state.totalLinks < state.maxLinks;
    const match = canLink ? findBestMatch(remaining, targets, state) : null;

    if (!match) {
      nodes.push(remaining);
      break;
    }

    if (match.index > 0) {
      nodes.push(remaining.slice(0, match.index));
    }

    state.totalLinks += 1;
    state.linkedSlugs.add(match.target.slug);

    nodes.push(
      <Link
        key={`${keyPrefix}-${localIndex}`}
        href={match.target.href}
        className="!text-[#2A4E63] dark:!text-[#d7f2ff] hover:!text-[#1f3b4c] dark:hover:!text-white underline underline-offset-4 decoration-2 transition-colors"
      >
        {match.match}
      </Link>,
    );
    localIndex += 1;
    remaining = remaining.slice(match.index + match.length);
  }

  return nodes;
}

export function createGuideLinkTargets(
  locale: string,
  currentSlug: string,
  guides: Array<{ slug: string; title: string; keywords: string[] }>,
): GuideLinkTarget[] {
  return guides
    .filter((guide) => guide.slug !== currentSlug)
    .map((guide) => {
      const rawPhrases = [guide.title, ...(guide.keywords || [])];
      const uniquePhrases = Array.from(
        new Set(
          rawPhrases
            .map(normalizePhrase)
            .filter((phrase) => phrase.length >= 4)
            .sort((a, b) => b.length - a.length),
        ),
      );

      return {
        slug: guide.slug,
        href: `/${locale}/guides/${guide.slug}`,
        title: guide.title,
        phrases: uniquePhrases,
      };
    });
}

export function renderGuideTextWithLinks(
  text: string,
  targets: GuideLinkTarget[],
  state: InterlinkState,
  keyPrefix: string,
): ReactNode[] {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);

  return parts.flatMap((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;
    if (isBold) {
      const inner = part.slice(2, -2);
      return (
        <strong key={`${keyPrefix}-bold-${index}`}>
          {renderLinkedSegments(inner, targets, state, `${keyPrefix}-b-${index}`)}
        </strong>
      );
    }

    const isLink = part.startsWith('[') && part.includes('](') && part.endsWith(')');
    if (isLink) {
      const match = part.match(/\[(.+?)\]\((.+?)\)/);
      if (match) {
        const [, linkText, href] = match;
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2A4E63] dark:text-[#d7f2ff] hover:text-[#1f3b4c] dark:hover:text-white underline underline-offset-4 decoration-2 transition-colors font-semibold"
          >
            {linkText}
          </a>
        );
      }
    }

    return renderLinkedSegments(part, targets, state, `${keyPrefix}-p-${index}`);
  });
}

export function createInterlinkState(maxLinks = 6): InterlinkState {
  return {
    linkedSlugs: new Set<string>(),
    totalLinks: 0,
    maxLinks,
  };
}
