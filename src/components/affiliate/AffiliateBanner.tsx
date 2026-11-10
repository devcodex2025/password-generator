'use client';

import Image from 'next/image';
import bannersData from '@/content/affiliate/banners.json';
import { resolveAffiliateUrl, type AffiliateProduct } from '@/content/affiliate/links';
import { useGeoCountry } from './useGeoCountry';

interface BannerEntry {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Optional product override; defaults to NordPass. */
  product?: AffiliateProduct;
  /** Cropped/compact layout variant for the strip placement. */
  compact?: boolean;
}

interface PlacementConfig {
  byLocale: Record<string, BannerEntry>;
}

const PLACEMENTS = (bannersData as unknown as { placements: Record<string, PlacementConfig> }).placements;

interface AffiliateBannerProps {
  placement: keyof typeof PLACEMENTS | string;
  locale: string;
  className?: string;
  product?: AffiliateProduct;
  /** Rendered when this placement has no creative for the locale. */
  fallback?: React.ReactNode;
  /** The creative is in the first viewport, so it must not be lazy-loaded. */
  priority?: boolean;
}

/**
 * Renders a raster creative when the placement has one for this locale.
 * Falls back to `fallback` (or nothing) otherwise, so an empty manifest never
 * breaks the layout.
 */
export default function AffiliateBanner({ placement, locale, className = '', product = 'nordpass', fallback = null, priority = false }: AffiliateBannerProps) {
  const geo = useGeoCountry();
  const config = PLACEMENTS[placement];
  if (!config) return <>{fallback}</>;

  // Prefer the exact locale. An English creative is only used when the caller
  // has no fallback (e.g. inside an article where a text strip would break flow).
  const entry = config.byLocale?.[locale] ?? (fallback ? undefined : config.byLocale?.en);
  if (!entry) return <>{fallback}</>;

  const target = resolveAffiliateUrl(entry.product ?? product, { locale, placement, geo });

  return (
    <a
      href={target.href}
      target="_blank"
      rel="sponsored noopener"
      data-affiliate={entry.product ?? product}
      data-placement={placement}
      className={`block w-full ${className}`}
      aria-label={`${entry.alt}. Ad · affiliate link`}
    >
      {/*
        Fixed-ratio box + fill keeps every 728x90 (and any future) creative in
        proportion. Using width/height with `h-auto` makes Next warn when the
        rendered width changes by a pixel while the rounded height still
        matches the attribute, so the box owns the aspect ratio instead.
      */}
      <span
        className="relative block w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: `${entry.width} / ${entry.height}` }}
      >
        <Image
          src={entry.src}
          alt={entry.alt}
          fill
          sizes="(max-width: 768px) 100vw, 728px"
          className="object-contain"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </span>
      <span className="mt-1 block text-[12px] leading-4 italic text-[#6b7280] dark:text-[#9ca3af]">Ad · affiliate link</span>
    </a>
  );
}
