'use client';

import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useReward } from 'react-rewards';
import PasswordRow from './PasswordRow';
import PasswordSettings from './PasswordSettings';
import PasswordStrength from './PasswordStrength';
import PasswordStandards from './PasswordStandards';
import { GeneratorMode, loadWordlist, generatePassphrase, generatePin } from './generatorModes';
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

const characterSets: Record<string, string> = {
  'A-Z': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'a-z': 'abcdefghijklmnopqrstuvwxyz',
  '0-9': '0123456789',
  '#$%': '!@#$%^&*()',
};

function secureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

const passwordStandards: Record<string, { minLength: number; requiredSets: string[]; description: string }> = {
  nist: {
    minLength: 8,
    requiredSets: ['A-Z', 'a-z', '0-9', '#$%'],
    description: 'standard_nist_desc',
  },
  pci: {
    minLength: 12,
    requiredSets: ['A-Z', 'a-z', '0-9', '#$%'],
    description: 'standard_pci_desc',
  },
  custom: {
    minLength: 4,
    requiredSets: [],
    description: 'standard_custom_desc',
  },
};

interface PasswordGeneratorProps {
  language: string;
}

export default function PasswordGenerator({ language }: PasswordGeneratorProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [selectedCharacterSets, setSelectedCharacterSets] = useState<string[]>(['A-Z', 'a-z', '0-9', '#$%']);
  const [quantity, setQuantity] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<string>('nist');
  const [mode, setMode] = useState<GeneratorMode>('chars');
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

  // GA helper
  const ga = (event: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, params);
    }
  };

  // Клієнтська синхронізація (резервна)
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const generatePassword = useCallback(
    async (index: number) => {
      if (mode === 'pin') {
        const len = Math.min(12, Math.max(4, passwordLength));
        const pin = generatePin(len, secureRandomIndex);
        const updated = [...passwords];
        updated[index] = pin;
        setPasswords(updated);
        ga('password_generated', { length: len, mode, ui_language: language, surface: 'home' });
        return;
      }
      if (mode === 'words') {
        const count = Math.min(8, Math.max(3, passwordLength));
        try {
          const words = await loadWordlist();
          const phrase = generatePassphrase(words, count, separator, capitalize, secureRandomIndex);
          const updated = [...passwords];
          updated[index] = phrase;
          setPasswords(updated);
          ga('password_generated', { length: count, mode, ui_language: language, surface: 'home' });
        } catch {
          setSnackbars((prev) => [...prev, { id: Date.now(), message: t('warning_no_characters') }]);
        }
        return;
      }
      const standardConfig = passwordStandards[selectedStandard];
      const effectiveLength = Math.max(passwordLength, standardConfig.minLength);
      let password = '';

      if (selectedStandard === 'custom') {
        let allCharacters = '';
        selectedCharacterSets.forEach((set) => {
          allCharacters += characterSets[set];
        });

        if (allCharacters.length === 0) {
          const updatedPasswords = [...passwords];
          updatedPasswords[index] = '';
          setPasswords(updatedPasswords);
          setSnackbars((prev) => [
            ...prev,
            { id: Date.now(), message: t('warning_no_characters') },
          ]);
          setTimeout(() => {
            setSnackbars((prev) => prev.filter((s) => s.id !== Date.now()));
          }, 3000);
          return;
        }

        for (let i = 0; i < effectiveLength; i++) {
          password += allCharacters.charAt(secureRandomIndex(allCharacters.length));
        }
      } else {
        standardConfig.requiredSets.forEach((set) => {
          const chars = characterSets[set];
          if (chars) {
            password += chars.charAt(secureRandomIndex(chars.length));
          }
        });

        let allCharacters = '';
        selectedCharacterSets.forEach((set) => {
          allCharacters += characterSets[set];
        });

        for (let i = password.length; i < effectiveLength; i++) {
          password += allCharacters.charAt(secureRandomIndex(allCharacters.length));
        }
      }

      // Fisher-Yates shuffle using cryptographically secure random
      const arr = password.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      password = arr.join('');
      const updatedPasswords = [...passwords];
      updatedPasswords[index] = password;
      setPasswords(updatedPasswords);
      ga('password_generated', {
        length: effectiveLength,
        standard: selectedStandard,
        ui_language: language,
        surface: 'home',
      });
    },
    [passwords, passwordLength, selectedCharacterSets, selectedStandard, t, mode, separator, capitalize, language]
  );

  const generatePasswords = useCallback(async () => {
    const currentQuantity = passwords.length;
    const newQuantity = quantity - currentQuantity;
    if (newQuantity > 0) {
      const generatedPasswords = [...passwords];
      for (let i = 0; i < newQuantity; i++) {
        let password = '';
        if (mode === 'pin') {
          const len = Math.min(12, Math.max(4, passwordLength));
          password = generatePin(len, secureRandomIndex);
        } else if (mode === 'words') {
          const count = Math.min(8, Math.max(3, passwordLength));
          try {
            const words = await loadWordlist();
            password = generatePassphrase(words, count, separator, capitalize, secureRandomIndex);
          } catch {
            password = '';
          }
        } else {
          let characters = '';
          selectedCharacterSets.forEach((set) => {
            characters += characterSets[set];
          });

          if (characters.length === 0) {
            generatedPasswords.push('');
            continue;
          }

          for (let j = 0; j < passwordLength; j++) {
            password += characters.charAt(secureRandomIndex(characters.length));
          }
        }
        generatedPasswords.push(password);
      }
      setPasswords(generatedPasswords);
      ga('passwords_generated_batch', {
        count: newQuantity,
        length: passwordLength,
        mode,
        ui_language: language,
        surface: 'home',
      });
    } else if (currentQuantity > quantity) {
      setPasswords(passwords.slice(0, quantity));
    }
  }, [passwords, quantity, selectedCharacterSets, passwordLength, mode, separator, capitalize, language]);

  useEffect(() => {
    generatePasswords();
  }, [generatePasswords]);

  const handleCopyClick = (index: number) => {
    if (index >= 0 && index < passwords.length && passwords[index]) {
      navigator.clipboard.writeText(passwords[index]);
      setSnackbars((prev) => [
        ...prev,
        { id: Date.now(), message: t('snackbar_copied') },
      ]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== Date.now()));
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
      setSnackbars((prev) => [
        ...prev,
        { id: Date.now(), message: t('snackbar_all_copied') },
      ]);
      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== Date.now()));
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
            onGenerate={generatePassword}
            onCopy={handleCopyClick}
            isAnimating={isAnimating}
            isDarkMode={isDarkMode}
          />
        ) : (
          /* Layout placeholder: keeps the hero height stable before the first
             password is generated on the client (avoids a visible content shift). */
          <div className="my-5 flex h-auto w-full animate-pulse flex-row flex-wrap items-center gap-2 lg:my-1 lg:flex-nowrap">
            <div className={`surface-card h-16 w-full rounded-[120px] border-2 border-solid border-[#E5F6FF] dark:border-[#374151] lg:w-[80%]`} />
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
        {mode === 'chars' && (
        <PasswordStandards
          selectedStandard={selectedStandard}
          setSelectedStandard={setSelectedStandard}
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
          setSelectedCharacterSets={setSelectedCharacterSets}
        />
        )}
        {passwords.slice(1).map((password, index) => (
          <PasswordRow
            key={index + 1}
            password={password}
            index={index + 1}
            onGenerate={generatePassword}
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
            sx={{ bgcolor: '#2A4E63' }}
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
