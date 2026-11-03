'use client';

import { useState, useCallback, useContext } from 'react';
import Image from 'next/image';
import { ThemeContext } from '../context/ThemeContext';
import { parseHibpRange } from '../utils/parseHibpRange.mjs';
import lang from './lang.json';
import { resolveAffiliateUrl } from '@/content/affiliate/links';
import { useGeoCountry } from './affiliate/useGeoCountry';

function t(key: string, language: string): string {
  const entry = (lang as unknown as Record<string, Record<string, string>>)[key];
  return entry?.[language] ?? entry?.['en'] ?? key;
}

/* ── Post-result CTA copy (kept local to avoid touching the shared lang.json) ── */
const CTA_TITLE: Record<string, string> = {
  en: 'Keep passwords in one place and audit them automatically.',
  ua: 'Тримайте паролі в одному місці й перевіряйте їх автоматично.',
  es: 'Guarda tus contraseñas en un solo lugar y audítalas automáticamente.',
  fr: 'Gardez vos mots de passe au même endroit et auditez-les automatiquement.',
  de: 'Bewahren Sie Passwörter an einem Ort auf und prüfen Sie sie automatisch.',
  it: 'Tieni le password in un unico posto e controllale automaticamente.',
  pt: 'Guarde suas senhas em um só lugar e verifique-as automaticamente.',
  ru: 'Храните пароли в одном месте и проверяйте их автоматически.',
  zh: '在一个地方保存密码并自动检查。',
  ja: 'パスワードを一か所に保管し、自動で点検しましょう。',
  pl: 'Trzymaj hasła w jednym miejscu i sprawdzaj je automatycznie.',
};

const CTA_BUTTON: Record<string, string> = {
  en: 'See password managers',
  ua: 'Обрати менеджер',
  es: 'Ver gestores',
  fr: 'Voir les gestionnaires',
  de: 'Passwort-Manager ansehen',
  it: 'Vedi i gestori',
  pt: 'Ver gerenciadores',
  ru: 'Выбрать менеджер',
  zh: '查看密码管理器',
  ja: 'マネージャーを見る',
  pl: 'Zobacz menedżery',
};

/** Affiliate target for the post-result CTA (resolved in the component). */

/* ── Data-source attribution (trust block): HIBP + Troy Hunt ── */
const SOURCE_LABEL: Record<string, string> = {
  en: 'Data source',
  ua: 'Джерело даних',
  es: 'Origen de los datos',
  fr: 'Source des données',
  de: 'Datenquelle',
  it: 'Fonte dei dati',
  pt: 'Fonte dos dados',
  ru: 'Источник данных',
  zh: '数据来源',
  ja: 'データソース',
  pl: 'Źródło danych',
};

const SOURCE_DESC: Record<string, string> = {
  en: 'Powered by the open Pwned Passwords database — billions of real credentials surfaced in public data breaches.',
  ua: 'Працює на відкритій базі Pwned Passwords — мільярди справжніх паролів, викритих у публічних витоках даних.',
  es: 'Funciona con la base abierta Pwned Passwords: miles de millones de contraseñas reales filtradas en fugas públicas de datos.',
  fr: 'Fonctionne avec la base ouverte Pwned Passwords : des milliards de mots de passe réels révélés par des fuites publiques de données.',
  de: 'Basiert auf der offenen Pwned-Passwords-Datenbank – Milliarden echter Passwörter aus öffentlich bekannten Datenschutzlecks.',
  it: 'Funziona con la base aperta Pwned Passwords: miliardi di password reali esposte in violazioni pubbliche di dati.',
  pt: 'Funciona com a base aberta Pwned Passwords: bilhões de senhas reais expostas em vazamentos públicos de dados.',
  ru: 'Работает на открытой базе Pwned Passwords — миллиарды настоящих паролей из публичных утечек данных.',
  zh: '基于开放的 Pwned Passwords 数据库——收录公开数据泄露中的数十亿条真实密码。',
  ja: 'オープンな Pwned Passwords データベースを利用。公表された情報漏洩における数十億件の実際のパスワードを収録。',
  pl: 'Działa na otwartej bazie Pwned Passwords — miliardy prawdziwych haseł ujawnionych w publicznych wyciekach danych.',
};

const AUTHOR_BIO: Record<string, string> = {
  en: 'Australian security researcher, founder of Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower and Microsoft Edge rely on HIBP data.',
  ua: 'Австралійський дослідник безпеки, засновник Have I Been Pwned (2013), Microsoft MVP. Дані HIBP використовують Firefox Monitor, 1Password Watchtower і Microsoft Edge.',
  es: 'Investigador de seguridad australiano, fundador de Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower y Microsoft Edge usan datos de HIBP.',
  fr: 'Chercheur en sécurité australien, fondateur de Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower et Microsoft Edge utilisent les données HIBP.',
  de: 'Australischer Security-Forscher, Gründer von Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower und Microsoft Edge nutzen HIBP-Daten.',
  it: 'Ricercatore di sicurezza australiano, fondatore di Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower e Microsoft Edge usano i dati HIBP.',
  pt: 'Pesquisador de segurança australiano, fundador do Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower e Microsoft Edge usam dados do HIBP.',
  ru: 'Австралийский исследователь безопасности, основатель Have I Been Pwned (2013), Microsoft MVP. Данными HIBP пользуются Firefox Monitor, 1Password Watchtower и Microsoft Edge.',
  zh: '澳大利亚安全研究员，Have I Been Pwned（2013）创始人，Microsoft MVP。Firefox Monitor、1Password Watchtower 和 Microsoft Edge 均使用 HIBP 数据。',
  ja: 'オーストラリアのセキュリティ研究者で Have I Been Pwned（2013年）創設者。Microsoft MVP。Firefox Monitor、1Password Watchtower、Microsoft Edge が HIBP データを利用。',
  pl: 'Australijski badacz bezpieczeństwa, założyciel Have I Been Pwned (2013), Microsoft MVP. Firefox Monitor, 1Password Watchtower i Microsoft Edge korzystają z danych HIBP.',
};

const AUTHOR_ALT: Record<string, string> = {
  en: 'Troy Hunt, founder of Have I Been Pwned',
  ua: 'Трой Хант, засновник Have I Been Pwned',
  es: 'Troy Hunt, fundador de Have I Been Pwned',
  fr: 'Troy Hunt, fondateur de Have I Been Pwned',
  de: 'Troy Hunt, Gründer von Have I Been Pwned',
  it: 'Troy Hunt, fondatore di Have I Been Pwned',
  pt: 'Troy Hunt, fundador do Have I Been Pwned',
  ru: 'Трой Хант, основатель Have I Been Pwned',
  zh: 'Troy Hunt，Have I Been Pwned 创始人',
  ja: 'Troy Hunt、Have I Been Pwned の創設者',
  pl: 'Troy Hunt, założyciel Have I Been Pwned',
};

/** Official pages only: service page, k-anonymity API docs, FAQ, author blog. */
const SOURCE_LINKS = [
  { label: 'haveibeenpwned.com', href: 'https://haveibeenpwned.com/Passwords' },
  { label: 'API · k-anonymity', href: 'https://haveibeenpwned.com/API/v3#PwnedPasswords' },
  { label: 'FAQ', href: 'https://haveibeenpwned.com/FAQ' },
  { label: 'troyhunt.com', href: 'https://www.troyhunt.com' },
];

interface PasswordBreachCheckProps {
  language: string;
}

async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export default function PasswordBreachCheck({ language }: PasswordBreachCheckProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const geo = useGeoCountry();
  const cta = resolveAffiliateUrl('nordpass', { locale: language, placement: 'breach-result', geo });
  const [inputPassword, setInputPassword] = useState('');
  const [result, setResult] = useState<{ checked: boolean; breached: boolean; count: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkBreach = useCallback(async () => {
    if (!inputPassword.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const hash = await sha1(inputPassword);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: { 'Add-Padding': 'true' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();
      const { breached, count } = parseHibpRange(text, suffix);

      setResult({ checked: true, breached, count });
    } catch {
      setError(t('breach_error', language));
    } finally {
      setLoading(false);
    }
  }, [inputPassword, language]);

  return (
    <div className={`w-full max-w-6xl mx-auto my-8 px-4 lg:px-8`}>
      <div className={`rounded-2xl border ${isDarkMode ? 'border-[#374151] bg-[#1c1c1c]' : 'border-[#E5F6FF] bg-white'} shadow p-6 lg:p-8`}>
        <h2 className={`text-[22px] lg:text-[28px] font-bold mb-2 ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>
          {t('breach_title', language)}
        </h2>
        <p className={`text-[16px] mb-6 ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
          {t('breach_description', language)}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
              setResult(null);
              setError('');
            }}
            placeholder={t('breach_placeholder', language)}
            className={`flex-1 px-4 py-3 rounded-xl border text-[16px] outline-none transition-colors ${
              isDarkMode
                ? 'bg-[#2a2a2a] border-[#374151] text-[#e0e0e0] placeholder-[#6B7280] focus:border-[#05a9ff]'
                : 'bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder-[#6B7280] focus:border-[#2A4E63]'
            }`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') checkBreach();
            }}
          />
          <button
            onClick={checkBreach}
            disabled={loading || !inputPassword.trim()}
            className={`px-6 py-3 rounded-xl font-semibold text-[16px] transition-all duration-200 cursor-pointer ${
              loading || !inputPassword.trim()
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              isDarkMode
                ? 'bg-[#05a9ff] text-[#0a1929] hover:bg-[#38beff]'
                : 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c]'
            }`}
          >
            {loading ? t('breach_checking', language) : t('breach_check_btn', language)}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-[14px]">
            {error}
          </div>
        )}

        {result && (
          <>
            <div
              className={`mt-4 p-4 rounded-xl text-[16px] ${
                result.breached
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              }`}
            >
              {result.breached ? (
                <div>
                  <p className="font-bold text-red-700 dark:text-red-400">
                    ⚠️ {t('breach_found', language)}
                  </p>
                  <p className="text-red-600 dark:text-red-400 mt-1">
                    {t('breach_found_detail', language).replace('{count}', result.count.toLocaleString())}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-green-700 dark:text-green-400">
                    {t('breach_safe', language)}
                  </p>
                  <p className="text-green-600 dark:text-green-400 mt-1">
                    {t('breach_safe_detail', language)}
                  </p>
                </div>
              )}
            </div>

            {/* Monetisation: next step after the check */}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className={`text-[14px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                {CTA_TITLE[language] ?? CTA_TITLE.en}
              </p>
              <a
                href={cta.href}
                target="_blank"
                rel="sponsored noopener"
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                      window.gtag('event', 'nordpass_affiliate_click', {
                        event_category: 'affiliate',
                        event_label: 'breach-result',
                        placement: 'breach-result',
                        ui_language: language,
                        offer: 'nordpass',
                        value: 7.74,
                        currency: 'USD',
                      });
                    }
                  } catch {
                    /* analytics must never break the UI */
                  }
                }}
                data-affiliate="nordpass"
                data-placement="breach-result"
                className={`inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-2.5 text-[15px] font-semibold transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-[#05a9ff] !text-[#0a1929] hover:bg-[#38beff]'
                    : 'bg-[#2A4E63] text-white hover:bg-[#1f3b4c]'
                }`}
              >
                {CTA_BUTTON[language] ?? CTA_BUTTON.en}
              </a>
            </div>
          </>
        )}

        <p className={`mt-4 text-[13px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
          {t('breach_privacy_note', language)}
        </p>

        {/* Visible data-source attribution: service, author, official links */}
        <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-[#374151]' : 'border-[#E5F6FF]'}`}>
          <div className="flex items-start gap-3">
            <Image
              src="/images/troy-hunt.png"
              alt={AUTHOR_ALT[language] ?? AUTHOR_ALT.en}
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl shrink-0"
            />
            <div className="min-w-0">
              <p className={`text-[12px] font-semibold uppercase tracking-wide ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                {SOURCE_LABEL[language] ?? SOURCE_LABEL.en}
              </p>
              <p className={`mt-1 text-[14px] ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
                {SOURCE_DESC[language] ?? SOURCE_DESC.en}
              </p>
              <p className={`mt-1 text-[14px] ${isDarkMode ? 'text-[#b0b0b0]' : 'text-[#4B5563]'}`}>
                <span className={`font-semibold ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#071016]'}`}>Troy Hunt</span>
                {' '}— {AUTHOR_BIO[language] ?? AUTHOR_BIO.en}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOURCE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  isDarkMode
                    ? 'border-[#374151] !text-[#38beff] hover:bg-[#0f1b24] hover:!border-[#38beff]'
                    : 'border-[#D1E9FF] text-[#2A4E63] hover:bg-[#F0F8FF]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
