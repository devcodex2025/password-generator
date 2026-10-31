'use client';

import { Crown, UsersRound } from 'lucide-react';
import { getAffiliateStrings } from './affiliate-i18n';
import { cn } from '@/lib/utils';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { useGeoCountry } from './useGeoCountry';

interface NordPassAffiliatePromoProps {
  locale: string;
  /** Optional extra Tailwind classes on the outer wrapper */
  className?: string;
  /** Where this block is rendered — used for analytics and sub-id attribution */
  placement?: string;
}

/* ── Analytics helper ── */

function trackClick(label: string, locale: string, placement: string) {
  try {
    // Google Analytics (gtag)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'nordpass_affiliate_click', {
        event_category: 'affiliate',
        event_label: `${placement}:${label}`,
        placement,
        locale,
        offer: 'nordpass',
        value: 7.74,
        currency: 'USD',
      });
    }
    // Vercel Analytics custom event
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: 'nordpass_affiliate_click', data: { label, placement, locale } });
    }
  } catch {
    /* analytics should never break the UI */
  }
}

/* ── Comparison data ── */

interface ComparisonRow {
  featureKey: keyof ReturnType<typeof getAffiliateStrings>;
  nordpass: string;
  onepassword: string;
  bitwarden: string;
}

function getRows(t: ReturnType<typeof getAffiliateStrings>): ComparisonRow[] {
  return [
    { featureKey: 'featurePrice', nordpass: '$1.49/mo', onepassword: '$2.99/mo', bitwarden: '$0' },
    { featureKey: 'featureDevices', nordpass: t.unlimited, onepassword: t.unlimited, bitwarden: t.unlimited },
    { featureKey: 'featurePasskeys', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
    { featureKey: 'featureBreachScan', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
    { featureKey: 'feature2fa', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
    { featureKey: 'featureSharing', nordpass: t.yes, onepassword: t.yes, bitwarden: t.limited },
    { featureKey: 'featureAutoFill', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
  ];
}

/* ── Component ── */

export default function NordPassAffiliatePromo({ locale, className = '', placement = 'inline' }: NordPassAffiliatePromoProps) {
  const t = getAffiliateStrings(locale);
  const rows = getRows(t);
  const geo = useGeoCountry();
  const premium = resolveAffiliateUrl('nordpass', { locale, placement, geo });
  const family = resolveAffiliateUrl('nordpassFamily', { locale, placement: `${placement}-family`, geo });

  return (
    <section
      className={cn('mt-10 rounded-3xl border border-[#E5F6FF] dark:border-[#374151] bg-gradient-to-br from-white via-[#f7fbff] to-[#eef7ff] dark:from-[#171717] dark:via-[#1a1f2e] dark:to-[#171717] p-6 md:p-8 shadow-sm', className)}
      aria-label="NordPass affiliate recommendation"
    >
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#071016] dark:text-[#e0e0e0]">
        {t.heading}
      </h2>

      {/* Intro text */}
      <div className="mt-4 space-y-3 text-[#374151] dark:text-[#c7c7c7] leading-7">
        <p>{t.intro}</p>
        <p>{t.introLine2}</p>
        <p>{t.introLine3}</p>
      </div>

      {/* Comparison table */}
      <div className="nordpass-table-scroll mt-6 overflow-x-auto -mx-2 px-2 pb-3 md:pb-0">
        <table className="w-full min-w-[480px] text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[#E5F6FF] dark:border-[#374151]">
              <th className="py-3 px-3 text-left font-semibold text-slate-600 dark:text-sky-200">
                {t.tableFeature}
              </th>
              <th className="py-3 px-3 text-center font-semibold text-slate-900 dark:text-white bg-[#E5F6FF]/50 dark:bg-[#1f334a]/50 rounded-t-lg">
                {t.tableNordPass}
              </th>
              <th className="py-3 px-3 text-center font-semibold text-slate-600 dark:text-slate-300">
                {t.table1Password}
              </th>
              <th className="py-3 px-3 text-center font-semibold text-slate-600 dark:text-slate-300">
                {t.tableBitwarden}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.featureKey}
                className="border-b border-[#E5F6FF] dark:border-[#374151] transition-colors hover:bg-[#f0f8ff] dark:hover:bg-[#1f334a]/30"
              >
                <td className="py-2.5 px-3 font-medium text-[#071016] dark:text-[#e0e0e0]">
                  {t[row.featureKey]}
                </td>
                <td className="py-2.5 px-3 text-center text-[#071016] dark:text-[#e0e0e0] bg-[#E5F6FF]/30 dark:bg-[#1f334a]/30">
                  {row.nordpass}
                </td>
                <td className="py-2.5 px-3 text-center text-[#374151] dark:text-[#c7c7c7]">
                  {row.onepassword}
                </td>
                <td className="py-2.5 px-3 text-center text-[#374151] dark:text-[#c7c7c7]">
                  {row.bitwarden}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={premium.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('premium', locale, placement)}
          data-affiliate="nordpass"
          data-placement={placement}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#05a9ff] hover:bg-[#38beff] !text-[#0a1e2a] font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Crown className="w-5 h-5" aria-hidden="true" />
          {t.ctaPremium}
        </a>
        <a
          href={family.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('family', locale, placement)}
          data-affiliate="nordpass"
          data-placement={placement}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#05a9ff] !text-[#38beff] hover:bg-[#05a9ff] hover:!text-[#0a1e2a] font-semibold py-3 px-6 transition-all duration-200"
        >
          <UsersRound className="w-5 h-5" aria-hidden="true" />
          {t.ctaFamily}
        </a>
      </div>

      {/* Disclosure */}
      <p className="mt-4 text-xs text-[#6b7280] dark:text-[#9ca3af] italic">
        {t.disclosure}
      </p>
    </section>
  );
}
