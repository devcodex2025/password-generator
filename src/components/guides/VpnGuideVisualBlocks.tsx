import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Globe2,
  KeyRound,
  Lock,
  MapPin,
  Radar,
  Router,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Wifi,
  XCircle,
} from 'lucide-react';
import { getVpnGuideVisualStrings } from '@/lib/vpn-guide-visuals-i18n';

export type VpnGuideVisualBlockId =
  | 'stats'
  | 'tunnel'
  | 'scenarios'
  | 'defense'
  | 'checklist'
  | 'myths';

interface VpnGuideVisualBlocksProps {
  locale: string;
  block: VpnGuideVisualBlockId;
}

const cardBase =
  'rounded-2xl border border-[#D1E9FF]/80 dark:border-[#2a3f55] bg-gradient-to-br from-[#f8fcff] to-[#eef6ff] dark:from-[#141c28] dark:to-[#0f1620] p-4 shadow-sm';

export default function VpnGuideVisualBlocks({ locale, block }: VpnGuideVisualBlocksProps) {
  const t = getVpnGuideVisualStrings(locale);

  if (block === 'stats') {
    return (
      <aside className="not-prose mt-6" aria-label={t.statsTitle}>
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#2A4E63] dark:text-[#9ecbff]">
          <Sparkles className="h-4 w-4 shrink-0 text-sky-500" aria-hidden />
          {t.statsTitle}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className={`${cardBase} text-center sm:text-left`}>
            <div className="text-3xl font-bold tabular-nums text-[#0c4a6e] dark:text-[#7dd3fc]">{t.statHotspotValue}</div>
            <p className="mt-1 text-sm leading-snug text-[#374151] dark:text-[#b8c9dc]">{t.statHotspotLabel}</p>
          </div>
          <div className={`${cardBase} text-center sm:text-left`}>
            <div className="text-2xl font-bold text-[#0c4a6e] dark:text-[#7dd3fc]">{t.statCryptoValue}</div>
            <p className="mt-1 text-sm leading-snug text-[#374151] dark:text-[#b8c9dc]">{t.statCryptoLabel}</p>
          </div>
          <div className={`${cardBase} text-center sm:text-left`}>
            <div className="text-3xl font-bold tabular-nums text-[#0c4a6e] dark:text-[#7dd3fc]">{t.statSpeedValue}</div>
            <p className="mt-1 text-sm leading-snug text-[#374151] dark:text-[#b8c9dc]">{t.statSpeedLabel}</p>
          </div>
        </div>
      </aside>
    );
  }

  if (block === 'tunnel') {
    return (
      <figure className="not-prose mt-6 overflow-hidden rounded-2xl border border-[#D1E9FF] dark:border-[#2a3f55] bg-[#f0f8ff] dark:bg-[#0d1520] p-5 md:p-6">
        <figcaption className="flex flex-wrap items-center gap-2 text-base font-semibold text-[#071016] dark:text-[#e8f4ff]">
          <Router className="h-5 w-5 text-sky-500" aria-hidden />
          {t.tunnelTitle}
        </figcaption>
        <p className="mt-2 text-sm text-[#374151] dark:text-[#a8bfd4]">{t.tunnelCaption}</p>

        <div className="mt-6 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-2">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-sky-200/80 bg-white/90 px-4 py-5 dark:border-sky-900/50 dark:bg-[#151b24]">
            <Shield className="h-8 w-8 text-sky-600 dark:text-sky-400" aria-hidden />
            <span className="mt-2 text-center text-sm font-medium text-[#071016] dark:text-[#e0e7ef]">{t.tunnelYou}</span>
            <span className="mt-1 flex flex-wrap justify-center gap-1.5 text-xs text-[#0369a1] dark:text-[#7dd3fc]">
              <span className="rounded-full bg-sky-100 px-2 py-0.5 dark:bg-sky-950/80">{t.tunnelBadgeIp}</span>
            </span>
          </div>

          <div className="flex items-center justify-center lg:w-10">
            <ArrowRight className="h-6 w-6 text-sky-400 lg:rotate-0 rotate-90" aria-hidden />
          </div>

          <div className="relative flex-[1.35] overflow-hidden rounded-xl border-2 border-dashed border-sky-400/70 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 px-4 py-6 dark:border-sky-600/60">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(14,165,233,0.06)_8px,rgba(14,165,233,0.06)_10px)] dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(56,189,248,0.05)_8px,rgba(56,189,248,0.05)_10px)]" />
            <div className="relative flex flex-col items-center text-center">
              <Lock className="h-7 w-7 text-sky-600 dark:text-sky-300" aria-hidden />
              <span className="mt-2 text-sm font-semibold text-[#0c4a6e] dark:text-[#bae6fd]">{t.tunnelEncrypted}</span>
              <span className="mt-1 rounded-full bg-white/80 px-2 py-0.5 text-xs text-[#0369a1] dark:bg-sky-950/60 dark:text-[#7dd3fc]">
                {t.tunnelBadgeDns}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:w-10">
            <ArrowRight className="h-6 w-6 text-sky-400 lg:rotate-0 rotate-90" aria-hidden />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-sky-200/80 bg-white/90 px-4 py-5 dark:border-sky-900/50 dark:bg-[#151b24]">
            <Server className="h-8 w-8 text-sky-600 dark:text-sky-400" aria-hidden />
            <span className="mt-2 text-center text-sm font-medium text-[#071016] dark:text-[#e0e7ef]">{t.tunnelVpnServer}</span>
          </div>

          <div className="flex items-center justify-center lg:w-10">
            <ArrowRight className="h-6 w-6 text-sky-400 lg:rotate-0 rotate-90" aria-hidden />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200/80 bg-white/90 px-4 py-5 dark:border-emerald-900/40 dark:bg-[#151b24]">
            <Globe2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <span className="mt-2 text-center text-sm font-medium text-[#071016] dark:text-[#e0e7ef]">{t.tunnelOpenInternet}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[t.chipWireGuard, t.chipOpenVpn, t.chipAes].map((label) => (
            <span
              key={label}
              className="inline-flex items-center rounded-full border border-sky-200/90 bg-white/90 px-3 py-1 text-xs font-medium text-[#0c4a6e] dark:border-sky-800 dark:bg-[#1a2332] dark:text-[#a5d8ff]"
            >
              {label}
            </span>
          ))}
        </div>
      </figure>
    );
  }

  if (block === 'scenarios') {
    const items = [
      { icon: Wifi, title: t.scenarioWifiTitle, desc: t.scenarioWifiDesc, tone: 'sky' as const },
      { icon: Radar, title: t.scenarioIspTitle, desc: t.scenarioIspDesc, tone: 'violet' as const },
      { icon: Building2, title: t.scenarioRemoteTitle, desc: t.scenarioRemoteDesc, tone: 'amber' as const },
      { icon: MapPin, title: t.scenarioGeoTitle, desc: t.scenarioGeoDesc, tone: 'emerald' as const },
      { icon: ShieldAlert, title: t.scenarioLimitTitle, desc: t.scenarioLimitDesc, tone: 'rose' as const },
    ];
    const toneRing: Record<string, string> = {
      sky: 'text-sky-600 dark:text-sky-400',
      violet: 'text-violet-600 dark:text-violet-400',
      amber: 'text-amber-600 dark:text-amber-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      rose: 'text-rose-600 dark:text-rose-400',
    };
    return (
      <aside className="not-prose mt-6" aria-label={t.scenariosTitle}>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#071016] dark:text-[#e8f4ff]">
          <MapPin className="h-5 w-5 text-sky-500" aria-hidden />
          {t.scenariosTitle}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, tone }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#D1E9FF]/80 dark:border-[#2a3f55] bg-white dark:bg-[#141a22] p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon className={`h-6 w-6 ${toneRing[tone]}`} aria-hidden />
              <div className="mt-2 font-semibold text-[#071016] dark:text-[#e4edf7]">{title}</div>
              <p className="mt-1 text-sm leading-relaxed text-[#374151] dark:text-[#a8bfd4]">{desc}</p>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (block === 'defense') {
    const layers = [
      { icon: Lock, title: t.defensePassword, desc: t.defensePasswordDesc },
      { icon: KeyRound, title: t.defense2fa, desc: t.defense2faDesc },
      { icon: Shield, title: t.defenseVpn, desc: t.defenseVpnDesc },
    ];
    return (
      <aside className="not-prose mt-6" aria-label={t.defenseTitle}>
        <div className="rounded-2xl border border-[#D1E9FF] dark:border-[#2a3f55] bg-gradient-to-br from-[#f8fcff] via-white to-[#f0f9ff] dark:from-[#121820] dark:via-[#141c28] dark:to-[#0f1620] p-5 md:p-6">
          <h3 className="text-lg font-semibold text-[#071016] dark:text-[#e8f4ff]">{t.defenseTitle}</h3>
          <p className="mt-1 text-sm text-[#374151] dark:text-[#a8bfd4]">{t.defenseSubtitle}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {layers.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative">
                {i < layers.length - 1 ? (
                  <div
                    className="absolute right-0 top-1/2 z-0 hidden h-0.5 w-[calc(50%+0.75rem)] -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-sky-300 to-sky-100 dark:from-sky-700 dark:to-sky-900 md:block"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex flex-col items-center rounded-xl border border-sky-100 bg-white/95 px-4 py-5 text-center dark:border-sky-900/40 dark:bg-[#1a222e]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950/80">
                    <Icon className="h-6 w-6 text-sky-700 dark:text-sky-300" aria-hidden />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#071016] dark:text-[#e4edf7]">{title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-[#374151] dark:text-[#9fb3c8]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (block === 'checklist') {
    const rows = [
      { icon: ClipboardCheck, text: t.checklistAudit },
      { icon: MapPin, text: t.checklistJurisdiction },
      { icon: ShieldAlert, text: t.checklistKill },
      { icon: Router, text: t.checklistProtocol },
      { icon: Globe2, text: t.checklistServers },
      { icon: ArrowRight, text: t.checklistSplit },
      { icon: Radar, text: t.checklistDns },
    ];
    return (
      <aside className="not-prose mt-6" aria-label={t.checklistTitle}>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#071016] dark:text-[#e8f4ff]">
          <ClipboardCheck className="h-5 w-5 text-sky-500" aria-hidden />
          {t.checklistTitle}
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {rows.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex gap-3 rounded-xl border border-[#e0f2fe] bg-[#fafdff] px-3 py-3 dark:border-[#2a3f55] dark:bg-[#161d28]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-950/80">
                <Icon className="h-4 w-4 text-sky-700 dark:text-sky-300" aria-hidden />
              </span>
              <span className="text-sm leading-snug text-[#374151] dark:text-[#b8c9dc]">{text}</span>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  if (block === 'myths') {
    const rows = [
      { claim: t.myth1Claim, truth: t.myth1Truth },
      { claim: t.myth2Claim, truth: t.myth2Truth },
      { claim: t.myth3Claim, truth: t.myth3Truth },
    ];
    return (
      <aside className="not-prose mt-6" aria-label={t.mythsVisualTitle}>
        <h3 className="text-lg font-semibold text-[#071016] dark:text-[#e8f4ff]">{t.mythsVisualTitle}</h3>
        <div className="mt-4 space-y-3">
          {rows.map(({ claim, truth }) => (
            <div
              key={claim}
              className="grid gap-3 rounded-2xl border border-[#fecaca]/80 bg-gradient-to-r from-rose-50/90 to-white p-4 dark:border-rose-900/40 dark:from-[#2a1518] dark:to-[#1a1a22] md:grid-cols-[1fr_auto_1fr] md:items-center"
            >
              <div className="flex gap-2 md:flex-col md:gap-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  <XCircle className="h-4 w-4" aria-hidden />
                  {t.mythFiction}
                </span>
                <p className="text-sm font-medium text-[#071016] dark:text-[#f1f5f9]">{claim}</p>
              </div>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-sky-400 md:block" aria-hidden />
              <div className="flex gap-2 md:flex-col md:gap-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-4 w-4" aria-hidden />
                  {t.mythFact}
                </span>
                <p className="text-sm text-[#374151] dark:text-[#b8c9dc]">{truth}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return null;
}
