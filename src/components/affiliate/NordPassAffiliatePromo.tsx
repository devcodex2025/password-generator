'use client';

import { getAffiliateStrings } from './affiliate-i18n';
import { cn } from '@/lib/utils';

interface NordPassAffiliatePromoProps {
  locale: string;
  /** Optional extra Tailwind classes on the outer wrapper */
  className?: string;
  /** Override affiliate personal URL (useful when passed from server components) */
  affiliateUrl?: string;
  /** Override affiliate business URL (useful when passed from server components) */
  affiliateB2bUrl?: string;
}

/* ── Affiliate URL helpers ── */

const UTM = 'utm_source=generatepasswordto.me&utm_medium=affiliate&utm_campaign=2026';

/** Resolve an env-var value; ignore values that are not real URLs. */
function resolveEnv(value: string | undefined, fallback: string): string {
  if (value && value.startsWith('http')) return value;
  return fallback;
}

function personalUrl(override?: string): string {
  const base = override
    ? resolveEnv(override, 'https://nordpass.com')
    : resolveEnv(process.env.NEXT_PUBLIC_NORDPASS_AFFILIATE_URL, 'https://nordpass.com');
  return `${base}${base.includes('?') ? '&' : '?'}${UTM}`;
}

function businessUrl(override?: string): string {
  const base = override
    ? resolveEnv(override, 'https://nordpass.com/business')
    : resolveEnv(process.env.NEXT_PUBLIC_NORDPASS_B2B_AFFILIATE_URL, 'https://nordpass.com/business');
  return `${base}${base.includes('?') ? '&' : '?'}${UTM}`;
}

/* ── Analytics helper ── */

function trackClick(label: string) {
  try {
    // Google Analytics (gtag)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'nordpass_affiliate_click', {
        event_category: 'affiliate',
        event_label: label,
      });
    }
    // Vercel Analytics custom event
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: 'nordpass_affiliate_click', data: { label } });
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
    { featureKey: 'featurePasskeys', nordpass: t.yes, onepassword: t.yes, bitwarden: t.no },
    { featureKey: 'featureBreachScan', nordpass: t.yes, onepassword: t.yes, bitwarden: t.no },
    { featureKey: 'feature2fa', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
    { featureKey: 'featureSharing', nordpass: t.yes, onepassword: t.yes, bitwarden: t.limited },
    { featureKey: 'featureAutoFill', nordpass: t.yes, onepassword: t.yes, bitwarden: t.yes },
  ];
}

/* ── Component ── */

export default function NordPassAffiliatePromo({ locale, className = '', affiliateUrl, affiliateB2bUrl }: NordPassAffiliatePromoProps) {
  const t = getAffiliateStrings(locale);
  const rows = getRows(t);

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
      <div className="mt-6 overflow-x-auto -mx-2 px-2">
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
          href={personalUrl(affiliateUrl)}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('personal')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#05a9ff] hover:bg-[#38beff] text-white font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {t.ctaPersonal}
        </a>
        <a
          href={businessUrl(affiliateB2bUrl)}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('business')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#05a9ff] text-[#05a9ff] hover:bg-[#05a9ff] hover:text-white font-semibold py-3 px-6 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {t.ctaBusiness}
        </a>
      </div>

      {/* Disclosure */}
      <p className="mt-4 text-xs text-[#6b7280] dark:text-[#9ca3af] italic">
        {t.disclosure}
      </p>
    </section>
  );
}
