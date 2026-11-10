'use client';

import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { useGeoCountry } from './useGeoCountry';

/* Copy (local, so the shared lang.json stays untouched). */

type StripCopy = { text: string; cta: string };

const COPY: Record<string, StripCopy> = {
  en: { text: 'Don’t keep this password in a note. Store it encrypted.', cta: 'NordPass' },
  ua: { text: 'Не зберігайте цей пароль у нотатках. Тримайте його зашифрованим.', cta: 'NordPass' },
  es: { text: 'No guardes esta contraseña en una nota. Guárdala cifrada.', cta: 'NordPass' },
  fr: { text: 'Ne gardez pas ce mot de passe dans une note. Stockez-le chiffré.', cta: 'NordPass' },
  de: { text: 'Speichern Sie dieses Passwort nicht in einer Notiz. Sondern verschlüsselt.', cta: 'NordPass' },
  it: { text: 'Non salvare questa password in una nota. Conservala cifrata.', cta: 'NordPass' },
  pt: { text: 'Não guarde esta senha em uma nota. Guarde criptografada.', cta: 'NordPass' },
  ru: { text: 'Не храните этот пароль в заметках. Держите его зашифрованным.', cta: 'NordPass' },
  zh: { text: '不要把密码记在便签里，请加密保存。', cta: 'NordPass' },
  ja: { text: 'パスワードをメモに残さず、暗号化して保存しましょう。', cta: 'NordPass' },
  pl: { text: 'Nie zapisuj tego hasła w notatce. Przechowuj je zaszyfrowane.', cta: 'NordPass' },
};

interface OfferStripProps {
  locale: string;
  className?: string;
}

/**
 * Compact single-line offer under the generator. Always renders (text only),
 * which makes it the safe fallback when no raster creative exists for a locale.
 */
export default function OfferStrip({ locale, className = '' }: OfferStripProps) {
  const copy = COPY[locale] ?? COPY.en;
  const geo = useGeoCountry();
  const target = resolveAffiliateUrl('nordpass', { locale, placement: 'strip-under-tool', geo });

  return (
    <div className={`mx-auto mt-4 w-full max-w-3xl px-4 ${className}`}>
      <a
        href={target.href}
        target="_blank"
        rel="sponsored noopener"
        data-affiliate="nordpass"
        data-placement="strip-under-tool"
        className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5F6FF] bg-white px-4 py-3 shadow-sm transition hover:border-[#05a9ff] dark:border-[#374151] dark:bg-[#1c1c1c]"
      >
        <span className="flex min-w-0 items-center gap-2">
          <ShieldOutlinedIcon sx={{ fontSize: 20 }} className="shrink-0 text-[#05a9ff]" aria-hidden="true" />
          <span className="truncate text-[14px] text-[#374151] dark:text-[#c7c7c7]">{copy.text}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#05a9ff] px-3 py-1.5 text-[13px] font-semibold !text-[#0a1e2a]">
          {copy.cta}
        </span>
      </a>
    </div>
  );
}
