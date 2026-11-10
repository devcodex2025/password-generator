'use client';

import { useState, useEffect, useCallback, useRef, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useReward } from 'react-rewards';
import PasswordRow from './PasswordRow';
import PasswordSettings from './PasswordSettings';
import PasswordStrength from './PasswordStrength';
import BulkPasswords, { type BulkGenerationEvent } from './BulkPasswords';
import { GeneratorMode, loadWordlist } from './generatorModes';
import {
  DEFAULT_LENGTHS,
  type GeneratorRules,
  buildPassword,
  generationEventParams,
  planGenerationEvent,
  withModeLength,
} from './generatorCore.mjs';
import { ThemeContext } from '../../context/ThemeContext';
import { rankColor } from '../../functions/RankColor';
import { getStrengthWord } from '../../functions/GetStrengthWord';
import { formatCrackTime } from '@/functions/formatCrackTime';
import { Snackbar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SnackbarMessage } from '@/app/types/SnackBar';
import i18n from '@/components/i18n';
import SavePasswordModal, { shouldShowSavePrompt } from '@/components/affiliate/SavePasswordModal';
import BookmarkPrompt from '@/components/BookmarkPrompt/BookmarkPrompt';

function secureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

const REGENERATE_DEBOUNCE_MS = 250;

let snackbarSeq = 0;
const nextSnackbarId = () => ++snackbarSeq;

const ga = (event: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, params);
  }
};

type GenerationResult = { passwords: string[] } | { error: 'warning_no_characters' | 'warning_wordlist_failed' };

async function generateList(rules: GeneratorRules, count: number): Promise<GenerationResult> {
  let words: string[] | null = null;
  if (rules.mode === 'words') {
    try {
      words = await loadWordlist();
    } catch {
      return { error: 'warning_wordlist_failed' };
    }
  }
  const passwords = Array.from({ length: count }, () => buildPassword(rules, words, secureRandomIndex));
  return passwords.some((p) => !p) ? { error: 'warning_no_characters' } : { passwords };
}

interface PasswordGeneratorProps {
  language: string;
}

export default function PasswordGenerator({ language }: PasswordGeneratorProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedCharacterSets, setSelectedCharacterSets] = useState<string[]>(['A-Z', 'a-z', '0-9', '#$%']);
  const [bulkOpen, setBulkOpen] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<string>('nist');
  const [mode, setMode] = useState<GeneratorMode>('chars');
  // each mode remembers its own slider value
  const [lengths, setLengths] = useState<Record<GeneratorMode, number>>(DEFAULT_LENGTHS);
  const passwordLength = lengths[mode];
  const setPasswordLength = useCallback((length: number) => setLengths((prev) => withModeLength(prev, mode, length)), [mode]);
  const [separator, setSeparator] = useState<string>('-');
  const [capitalize, setCapitalize] = useState<boolean>(true);
  const maxQuantity = 100;
  const rewardAnchorRef = useRef<HTMLDivElement | null>(null);
  const rewardConfig = {
    elementCount: 180,
    elementSize: 5,
    spread: 175,
    lifetime: 300,
    startVelocity: 40,
  };
  const { reward } = useReward('rewardSingle', 'confetti', rewardConfig);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const ANIMATION_DURATION = 250;

  // Client-side language sync (fallback).
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const rules = useMemo<GeneratorRules>(
    () => ({ mode, passwordLength, selectedCharacterSets, selectedStandard, separator, capitalize }),
    [mode, passwordLength, selectedCharacterSets, selectedStandard, separator, capitalize]
  );

  // Values the generation effects read without re-running when they change.
  const latest = useRef({ language, t });
  useEffect(() => {
    latest.current = { language, t };
  });

  // The bulk layer covers the form: keep keyboard and screen readers out of what is underneath.
  // On close the covered form becomes reachable again, so focus returns to the Bulk button.
  // ponytail: set through the DOM because @types/react 18 has no `inert` prop
  const bulkWasOpen = useRef(false);
  useEffect(() => {
    formRef.current?.toggleAttribute('inert', bulkOpen);
    if (bulkWasOpen.current && !bulkOpen) {
      formRef.current?.querySelector<HTMLElement>('[data-bulk-opener]')?.focus();
    }
    bulkWasOpen.current = bulkOpen;
  }, [bulkOpen]);

  // One snackbar per message: repeated failures while dragging do not stack.
  const warn = useCallback((key: string) => {
    const message = latest.current.t(key);
    setSnackbars((prev) => (prev.some((s) => s.message === message) ? prev : [...prev, { id: nextSnackbarId(), message }]));
  }, []);

  // The form shows a single password; lists live in the bulk view.
  const regenerateRow = useCallback(async () => {
    const result = await generateList(rules, 1);
    if ('error' in result) {
      warn(result.error); // keep the previous value
      return;
    }
    setPasswords(result.passwords);
    ga('password_generated', generationEventParams(rules, result.passwords[0], language));
  }, [rules, warn, language]);

  // Rules changed: regenerate the password once the user settles (no work or GA event per slider tick).
  const hasGenerated = useRef(false);
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const { language: lang } = latest.current;
      const result = await generateList(rules, 1);
      if (cancelled) return;
      if ('error' in result) {
        warn(result.error);
        return;
      }
      setPasswords(result.passwords);
      const event = planGenerationEvent({
        previousQuantity: hasGenerated.current ? 1 : 0,
        nextQuantity: 1,
        generated: result.passwords,
        rules,
        language: lang,
      });
      if (event) ga(event.name, event.params);
      hasGenerated.current = true;
    }, hasGenerated.current ? REGENERATE_DEBOUNCE_MS : 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [rules, warn]);

  // Bulk events share the main generator's names; surface: 'bulk' tells them apart.
  const generateBulk = useCallback(
    async (count: number, event: BulkGenerationEvent) => {
      const result = await generateList(rules, count);
      if ('error' in result) {
        warn(result.error);
        return null;
      }
      const params = { ...generationEventParams(rules, result.passwords[0], language), surface: 'bulk' };
      ga(event, event === 'password_generated' ? params : { count, ...params });
      return result.passwords;
    },
    [rules, warn, language]
  );

  const trackBulk = useCallback(
    (event: string, params: Record<string, string | number> = {}) => ga(event, { ui_language: language, surface: 'bulk', ...params }),
    [language]
  );

  const openBulk = () => {
    setBulkOpen(true);
    ga('bulk_opened', { ui_language: language, surface: 'home' });
  };

  const handleCopyClick = async (index: number): Promise<boolean> => {
    if (index >= 0 && index < passwords.length && passwords[index]) {
      try {
        await navigator.clipboard.writeText(passwords[index]);
      } catch {
        warn('snackbar_copy_failed');
        return false;
      }
      const snackbarId = nextSnackbarId();
      setSnackbars((prev) => [...prev, { id: snackbarId, message: t('snackbar_copied') }]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== snackbarId));
      }, 500);
      runReward();
      ga('password_copied', { index, ui_language: language, surface: 'home' });

      // Highest-intent moment: offer to store the password. This runs on every
      // copy, which is the explicit action that makes the prompt relevant.
      if (shouldShowSavePrompt()) {
        window.setTimeout(() => setSaveModalOpen(true), 400);
      }
      return true;
    }
    return false;
  };

  const handleCopyAll = async (list: string[]): Promise<boolean> => {
    if (list.length === 0) return false;
    try {
      await navigator.clipboard.writeText(list.join('\n'));
    } catch {
      warn('snackbar_copy_failed');
      return false;
    }
    const snackbarId = nextSnackbarId();
    setSnackbars((prev) => [...prev, { id: snackbarId, message: t('snackbar_all_copied') }]);
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== snackbarId));
    }, 500);
    runReward();
    ga('passwords_copied_all', { count: list.length, ui_language: language, surface: 'bulk' });
    return true;
  };

  const handleDownloadAll = (list: string[]) => {
    if (list.length === 0) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([list.join('\n')], { type: 'text/plain' }));
    link.download = 'passwords.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    ga('passwords_downloaded', { count: list.length, ui_language: language, surface: 'bulk' });
  };

  const runReward = () => {
    // Confetti is the one reward, reserved for a successful copy: it tells the
    // visitor the password left the page. It is JS-driven, so the global
    // reduced-motion CSS cannot stop it; skip it when motion is not wanted.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      return;
    }
    if (isAnimating) return;
    setIsAnimating(true);
    reward();
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };

  const [passwordStrengthAnalysis, setPasswordStrengthAnalysis] = useState({
    strengthWord: '',
    scoreColor: '#000',
    strengthColor: { color: '#000' },
    strengthWordScoreLocalized: '',
  });

  useEffect(() => {
    let cancelled = false;

    const calculateStrength = async () => {
      if (cancelled) return;
      if (passwords.length === 0) {
        setPasswordStrengthAnalysis({
          strengthWord: '',
          scoreColor: '#000',
          strengthColor: { color: '#000' },
          strengthWordScoreLocalized: '',
        });
        return;
      }

      try {
        const zxcvbn = (await import('zxcvbn')).default;
        if (cancelled) return;
        const TimeToCrackResult = zxcvbn(passwords[0]);
        const CrackScore = TimeToCrackResult.score;
        const strengthWord = getStrengthWord(CrackScore, i18n.language);
        const scoreColor = rankColor(CrackScore);
        const strengthColor = { color: scoreColor };
        const strengthWordScoreLocalized = formatCrackTime(
          String(TimeToCrackResult.crack_times_display.offline_slow_hashing_1e4_per_second),
          i18n.language
        );

        setPasswordStrengthAnalysis({
          strengthWord,
          scoreColor,
          strengthColor,
          strengthWordScoreLocalized,
        });
      } catch (error) {
        console.error("Failed to load zxcvbn", error);
      }
    };

    // zxcvbn ships ~800 KB of dictionaries, so load and run it when the browser is
    // idle so it never competes with LCP/TBT on first paint.
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
    const id = ric ? ric(() => void calculateStrength(), { timeout: 2500 }) : window.setTimeout(() => void calculateStrength(), 1200);

    return () => {
      cancelled = true;
      if (cic) cic(id);
      else clearTimeout(id);
    };
  }, [passwords, t]);

  return (
    <div
      className={`surface-hero flex flex-col justify-center items-center mb-2 w-full rounded-[72px] pt-3 md:pt-10 lg:pt-12 lg:pb-8 lg:bg-[url('/images/vector-bg.svg')] lg:bg-no-repeat lg:bg-center lg:bg-cover lg:bg-blend-overlay`}
    >
      <h1
        className="page-title text-title mx-2 md:mb-1 text-[30px] lg:text-[44px] font-bold tracking-tight text-center"
      >
        {t('main_title')}
      </h1>
      <p className="hero-subtitle text-center text-[20px] md:text-[22px] mx-2 mb-3 font-normal">
        {t('main_subtitle')}
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      >
        <div
          id="rewardSingle"
          ref={rewardAnchorRef}
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        className={`surface-card relative flex w-full min-w-0 max-w-full flex-col overflow-visible rounded-[48px] shadow drop-shadow-lg p-[16px] md:p-8 lg:w-[calc(100%-4rem)] lg:max-w-[68rem]`}
      >
        <div ref={formRef} className="contents">
          {passwords.length > 0 ? (
            <PasswordRow
              password={passwords[0]}
              index={0}
              onGenerate={regenerateRow}
              onCopy={handleCopyClick}
              onShare={(target) => ga('password_shared', { target, count: 1, ui_language: language, surface: 'home' })}
              isAnimating={isAnimating}
              isDarkMode={isDarkMode}
            />
          ) : (
            /* Layout placeholder: keeps the hero height stable before the first
               password is generated on the client (avoids a visible content shift). */
            <div className="my-3 w-full animate-pulse lg:my-1">
              <div className="h-16 w-full rounded-[120px] border-2 border-solid border-[#E5F6FF] bg-[#ffffff] dark:border-transparent dark:bg-[#000000]" />
            </div>
          )}
          <PasswordSettings
            strength={<PasswordStrength analysis={passwordStrengthAnalysis} />}
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
            onOpenBulk={openBulk}
            selectedCharacterSets={selectedCharacterSets}
            setSelectedCharacterSets={setSelectedCharacterSets}
            selectedStandard={selectedStandard}
            setSelectedStandard={setSelectedStandard}
            setSnackbars={setSnackbars}
            mode={mode}
            onModeChange={setMode}
            separator={separator}
            setSeparator={setSeparator}
            capitalize={capitalize}
            setCapitalize={setCapitalize}
          />
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <VerifiedUserIcon sx={{ fontSize: 16 }} />
            <span>{t('generated_locally')}</span>
          </div>
        </div>
        {bulkOpen && (
          <BulkPasswords
            generate={generateBulk}
            maxQuantity={maxQuantity}
            onClose={() => setBulkOpen(false)}
            onCopy={handleCopyAll}
            onDownload={handleDownloadAll}
            track={trackBulk}
          />
        )}
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            open
            autoHideDuration={6000}
            onClose={() => setSnackbars((prev) => prev.filter((s) => s.id !== snackbar.id))}
            message={snackbar.message}
            ContentProps={{
              // Paint from the CSS variables: MUI's own background comes from
              // emphasize(palette.background.default), which is the light mode
              // value once the palette holds literal colours.
              sx: { backgroundColor: 'var(--primary-color)', color: '#ffffff' },
            }}
          />
        ))}
        <SavePasswordModal
          locale={language}
          open={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
        />
      </div>
      {/* Pinned to the viewport bottom (portal) once a password exists and cookie consent is settled. */}
      <BookmarkPrompt
        language={language}
        active={passwords.length > 0 && Boolean(passwords[0])}
      />
    </div>
  );
}
