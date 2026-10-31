'use client';

import { Shield, ExternalLink } from 'lucide-react';
import { getVpnAffiliateStrings } from './vpn-affiliate-i18n';
import { cn } from '@/lib/utils';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { useGeoCountry } from './useGeoCountry';

interface NordVpnAffiliatePromoProps {
  locale: string;
  className?: string;
  /** Where this block is rendered вЂ” used for analytics and sub-id attribution */
  placement?: string;
}

/* в”Ђв”Ђ Affiliate link (resolved from the central registry) в”Ђв”Ђ */

/* в”Ђв”Ђ Analytics helper в”Ђв”Ђ */

function trackClick(label: string) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'nordvpn_affiliate_click', {
        event_category: 'affiliate',
        event_label: label,
      });
    }
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: 'nordvpn_affiliate_click', data: { label } });
    }
  } catch {
    /* analytics should never break the UI */
  }
}

/* в”Ђв”Ђ Comparison data в”Ђв”Ђ */

interface ComparisonRow {
  featureKey: keyof ReturnType<typeof getVpnAffiliateStrings>;
  nordvpn: string;
  expressvpn: string;
  surfshark: string;
}

function getRows(t: ReturnType<typeof getVpnAffiliateStrings>): ComparisonRow[] {
  return [
    { featureKey: 'featurePrice', nordvpn: '$3.39/mo', expressvpn: '$6.67/mo', surfshark: '$2.49/mo' },
    { featureKey: 'featureServers', nordvpn: '6,400+', expressvpn: '3,000+', surfshark: '3,200+' },
    { featureKey: 'featureProtocol', nordvpn: 'NordLynx', expressvpn: 'Lightway', surfshark: 'WireGuard' },
    { featureKey: 'featureNoLogs', nordvpn: t.yes, expressvpn: t.yes, surfshark: t.yes },
    { featureKey: 'featureKillSwitch', nordvpn: t.yes, expressvpn: t.yes, surfshark: t.yes },
    { featureKey: 'featureDevices', nordvpn: '10', expressvpn: '8', surfshark: 'в€ћ' },
    { featureKey: 'featureSplitTunnel', nordvpn: t.yes, expressvpn: t.yes, surfshark: t.yes },
  ];
}

/* в”Ђв”Ђ Component в”Ђв”Ђ */

export default function NordVpnAffiliatePromo({ locale, className = '', placement = 'vpn-inline' }: NordVpnAffiliatePromoProps) {
  const t = getVpnAffiliateStrings(locale);
  const rows = getRows(t);
  const geo = useGeoCountry();
  const vpn = resolveAffiliateUrl('nordvpn', { locale, placement, geo });

  return (
    <section
      className={cn('mt-10 rounded-3xl border border-[#E5F6FF] dark:border-[#374151] bg-gradient-to-br from-white via-[#f7fbff] to-[#eef7ff] dark:from-[#171717] dark:via-[#1a1f2e] dark:to-[#171717] p-6 md:p-8 shadow-sm', className)}
      aria-label="NordVPN affiliate recommendation"
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
                {t.tableNordVpn}
              </th>
              <th className="py-3 px-3 text-center font-semibold text-slate-600 dark:text-slate-300">
                {t.tableExpressVpn}
              </th>
              <th className="py-3 px-3 text-center font-semibold text-slate-600 dark:text-slate-300">
                {t.tableSurfshark}
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
                  {row.nordvpn}
                </td>
                <td className="py-2.5 px-3 text-center text-[#374151] dark:text-[#c7c7c7]">
                  {row.expressvpn}
                </td>
                <td className="py-2.5 px-3 text-center text-[#374151] dark:text-[#c7c7c7]">
                  {row.surfshark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={vpn.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('get_nordvpn')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#05a9ff] hover:bg-[#38beff] text-white font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Shield className="w-5 h-5" aria-hidden="true" />
          {t.ctaGetNordVpn}
        </a>
        <a
          href={vpn.href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackClick('learn_more_nordvpn')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#05a9ff] text-[#05a9ff] hover:bg-[#05a9ff] hover:text-white font-semibold py-3 px-6 transition-all duration-200"
        >
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
          {t.ctaLearnMore}
        </a>
      </div>

      {/* Disclosure */}
      <p className="mt-4 text-xs text-[#6b7280] dark:text-[#9ca3af] italic">
        {t.disclosure}
      </p>
    </section>
  );
}

