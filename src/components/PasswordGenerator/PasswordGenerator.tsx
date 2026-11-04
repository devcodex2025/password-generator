'use client';

import { useState, useEffect, useCallback, useRef, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useReward } from 'react-rewards';
import PasswordRow from './PasswordRow';
import PasswordSettings from './PasswordSettings';
import PasswordStrength from './PasswordStrength';
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
import { Button, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
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
  const [quantity, setQuantity] = useState<number>(1);
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
  const rewardQueue = useRef<string[]>([]);
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

  // Клієнтська синхронізація (резервна)
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
  const latest = useRef({ rules, quantity, language, t, rowCount: passwords.length });
  useEffect(() => {
    latest.current = { rules, quantity, language, t, rowCount: passwords.length };
  });

  // One snackbar per message: repeated failures while dragging do not stack.
  const warn = useCallback((key: string) => {
    const message = latest.current.t(key);
    setSnackbars((prev) => (prev.some((s) => s.message === message) ? prev : [...prev, { id: nextSnackbarId(), message }]));
  }, []);

  const regenerateRow = useCallback(
    async (index: number) => {
      const result = await generateList(rules, 1);
      if ('error' in result) {
        warn(result.error); // keep the previous value
        return;
      }
      const [password] = result.passwords;
      if (index >= latest.current.rowCount) return; // row was removed meanwhile: no write, no event
      setPasswords((prev) => {
        if (index >= prev.length) return prev;
        const updated = [...prev];
        updated[index] = password;
        return updated;
      });
      ga('password_generated', generationEventParams(rules, password, language));
    },
    [rules, warn, language]
  );

  // Rules changed: regenerate the whole list once the user settles (no work or GA event per slider tick).
  const hasGenerated = useRef(false);
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const { quantity: count, language: lang } = latest.current;
      const result = await generateList(rules, count);
      if (cancelled) return;
      if ('error' in result) {
        warn(result.error);
        return;
      }
      setPasswords(result.passwords);
      const event = planGenerationEvent({
        previousQuantity: hasGenerated.current ? count : 0,
        nextQuantity: count,
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

  // Quantity changed: append or trim relative to the rows actually shown, so a failed or
  // cancelled append is retried by the next change instead of leaving the list short.
  useEffect(() => {
    const shown = latest.current.rowCount;
    if (quantity === shown || !hasGenerated.current) return;
    if (quantity < shown) {
      setPasswords((current) => current.slice(0, quantity));
      return;
    }
    let cancelled = false;
    (async () => {
      const { rules: currentRules, language: lang } = latest.current;
      const result = await generateList(currentRules, quantity - shown);
      if (cancelled) return;
      if ('error' in result) {
        warn(result.error);
        return;
      }
      setPasswords((current) => [...current, ...result.passwords].slice(0, quantity));
      const event = planGenerationEvent({
        previousQuantity: shown,
        nextQuantity: quantity,
        generated: result.passwords,
        rules: currentRules,
        language: lang,
      });
      if (event) ga(event.name, event.params);
    })();
    return () => {
      cancelled = true;
    };
  }, [quantity, warn]);

  const handleCopyClick = (index: number) => {
    if (index >= 0 && index < passwords.length && passwords[index]) {
      navigator.clipboard.writeText(passwords[index]);
      const snackbarId = nextSnackbarId();
      setSnackbars((prev) => [...prev, { id: snackbarId, message: t('snackbar_copied') }]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== snackbarId));
      }, 500);
      runReward('confetti');
      ga('password_copied', { index, ui_language: language, surface: 'home' });

      // Highest-intent moment: offer to store the password. This runs on every
      // copy, which is the explicit action that makes the prompt relevant.
      if (shouldShowSavePrompt()) {
        window.setTimeout(() => setSaveModalOpen(true), 400);
      }
    }
  };

  const handleCopyAllClick = () => {
    if (passwords.length > 0) {
      navigator.clipboard.writeText(passwords.join('\n'));
      const snackbarId = nextSnackbarId();
      setSnackbars((prev) => [...prev, { id: snackbarId, message: t('snackbar_all_copied') }]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== snackbarId));
      }, 500);
      runReward('balloons');
      ga('passwords_copied_all', { count: passwords.length, ui_language: language, surface: 'home' });
    }
  };

  const handleDownloadAllClick = () => {
    if (passwords.length > 0) {
      const allPasswords = passwords.join('\n');
      const blob = new Blob([allPasswords], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'passwords.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      runReward('emoji');
      ga('passwords_downloaded', { count: passwords.length, ui_language: language, surface: 'home' });
    }
  };

  const runReward = (type: string) => {
    // Confetti is driven by JS, so the global reduced-motion CSS cannot stop
    // it; skip the reward entirely when the visitor asked for less motion.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      return;
    }
    if (isAnimating) {
      rewardQueue.current.push(type);
      return;
    }
    setIsAnimating(true);
    reward();
    setTimeout(() => {
      setIsAnimating(false);
      if (rewardQueue.current.length > 0) {
        const nextType = rewardQueue.current.shift();
        if (nextType) runReward(nextType);
      }
    }, ANIMATION_DURATION);
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

    // zxcvbn ships ~800 KB of dictionaries — load and run it when the browser is
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
        className={`surface-card relative flex w-full min-w-0 max-w-full flex-col overflow-visible rounded-[48px] shadow drop-shadow-lg p-[16px] md:p-[40px] lg:w-9/12 xl:w-9/12 2xl:w-9/12`}
      >
        {passwords.length > 0 ? (
          <PasswordRow
            password={passwords[0]}
            index={0}
            onGenerate={regenerateRow}
            onCopy={handleCopyClick}
            isAnimating={isAnimating}
            isDarkMode={isDarkMode}
          />
        ) : (
          /* Layout placeholder: keeps the hero height stable before the first
             password is generated on the client (avoids a visible content shift). */
          <div className="my-5 flex h-auto w-full animate-pulse flex-row flex-wrap items-center gap-2 lg:my-1 lg:flex-nowrap">
            <div className={`h-16 w-full rounded-[120px] border-2 border-solid border-[#E5F6FF] bg-[#ffffff] dark:border-transparent dark:bg-[#000000] lg:w-[80%]`} />
            <div className={`h-14 w-full rounded-[60px] bg-[#c9dfeb] dark:bg-[#1f2937] lg:w-[20%]`} />
          </div>
        )}
        <PasswordStrength analysis={passwordStrengthAnalysis} />
        <PasswordSettings
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedCharacterSets={selectedCharacterSets}
          setSelectedCharacterSets={setSelectedCharacterSets}
          maxQuantity={maxQuantity}
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
        {passwords.slice(1).map((password, index) => (
          <PasswordRow
            key={index + 1}
            password={password}
            index={index + 1}
            onGenerate={regenerateRow}
            onCopy={handleCopyClick}
            isAnimating={isAnimating}
            isDarkMode={isDarkMode}
          />
        ))}
        {passwords.length >= 2 && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <Button
              className={`${isDarkMode ? 'bg-[#05a9ff] hover:bg-[#38beff]' : 'bg-[#2A4E63] hover:bg-[#1f3b4c]'} ${isDarkMode ? 'text-[#16394a]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto transition-all duration-200 hover:opacity-90`}
              onClick={handleCopyAllClick}
              disabled={isAnimating}
              style={isAnimating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <FileCopyIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
              {t('copy_all')}
            </Button>
            <Button
              className={`${isDarkMode ? 'bg-[#05a9ff] hover:bg-[#38beff]' : 'bg-[#2A4E63] hover:bg-[#1f3b4c]'} ${isDarkMode ? 'text-[#16394a]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto transition-all duration-200 hover:opacity-90`}
              onClick={handleDownloadAllClick}
              disabled={isAnimating}
              style={isAnimating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <CloudDownloadIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
              {t('download_all')}
            </Button>
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <VerifiedUserIcon sx={{ fontSize: 16 }} />
          <span>{t('generated_locally')}</span>
        </div>
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
      {/* Sits directly under the generator and appears after the first password. */}
      <BookmarkPrompt
        language={language}
        active={passwords.length > 0 && Boolean(passwords[0])}
      />
    </div>
  );
}
