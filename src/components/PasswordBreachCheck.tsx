'use client';

import { useState, useCallback, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { parseHibpRange } from '../utils/parseHibpRange.mjs';
import lang from './lang.json';

function t(key: string, language: string): string {
  const entry = (lang as unknown as Record<string, Record<string, string>>)[key];
  return entry?.[language] ?? entry?.['en'] ?? key;
}

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
                : 'bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#2A4E63]'
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
        )}

        <p className={`mt-4 text-[13px] ${isDarkMode ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
          {t('breach_privacy_note', language)}
        </p>
      </div>
    </div>
  );
}
