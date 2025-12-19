'use client';

import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useReward } from 'react-rewards';
import PasswordRow from './PasswordRow';
import PasswordSettings from './PasswordSettings';
import PasswordStrength from './PasswordStrength';
import PasswordStandards from './PasswordStandards';
import { ThemeContext } from '../../context/ThemeContext';
import { rankColor } from '../../functions/RankColor';
import { getStrengthWord } from '../../functions/GetStrengthWord';
import { formatCrackTime } from '@/functions/formatCrackTime';
import { Button, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Image from 'next/image';
import AnimatedPassword from './AnimatedPassword';
import { SnackbarMessage } from '@/app/types/SnackBar';
import i18n from '@/components/i18n';

const characterSets: Record<string, string> = {
  'A-Z': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'a-z': 'abcdefghijklmnopqrstuvwxyz',
  '0-9': '0123456789',
  '#$%': '!@#$%^&*()',
};

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
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [selectedCharacterSets, setSelectedCharacterSets] = useState<string[]>(['A-Z', 'a-z', '0-9', '#$%']);
  const [quantity, setQuantity] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<string>('nist');
  const maxQuantity = 100;
  const rewardQueue = useRef<string[]>([]);
  const { reward } = useReward('centerReward', 'confetti', {
    elementCount: 100,
    spread: 70,
    lifetime: 200,
    startVelocity: 35,
  });
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
    (index: number) => {
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
          password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }
      } else {
        standardConfig.requiredSets.forEach((set) => {
          const chars = characterSets[set];
          if (chars) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        });

        let allCharacters = '';
        selectedCharacterSets.forEach((set) => {
          allCharacters += characterSets[set];
        });

        for (let i = password.length; i < effectiveLength; i++) {
          password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }
      }

      password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
      const updatedPasswords = [...passwords];
      updatedPasswords[index] = password;
      setPasswords(updatedPasswords);
      ga('password_generated', { length: effectiveLength, standard: selectedStandard });
    },
    [passwords, passwordLength, selectedCharacterSets, selectedStandard, t]
  );

  const generatePasswords = useCallback(() => {
    const currentQuantity = passwords.length;
    const newQuantity = quantity - currentQuantity;
    if (newQuantity > 0) {
      const generatedPasswords = [...passwords];
      for (let i = 0; i < newQuantity; i++) {
        let characters = '';
        selectedCharacterSets.forEach((set) => {
          characters += characterSets[set];
        });

        if (characters.length === 0) {
          generatedPasswords.push('');
          continue;
        }

        let password = '';
        for (let j = 0; j < passwordLength; j++) {
          password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        generatedPasswords.push(password);
      }
      setPasswords(generatedPasswords);
      ga('passwords_generated_batch', { count: newQuantity, length: passwordLength });
    } else if (currentQuantity > quantity) {
      setPasswords(passwords.slice(0, quantity));
    }
  }, [passwords, quantity, selectedCharacterSets, passwordLength]);

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
      ga('password_copied', { index });
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
      ga('passwords_copied_all', { count: passwords.length });
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
      ga('passwords_downloaded', { count: passwords.length });
    }
  };

  const runReward = (type: string) => {
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
    const calculateStrength = async () => {
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

    calculateStrength();
  }, [passwords, t]);

  return (
    <div
      className={`flex flex-col justify-center items-center mb-4 w-full rounded-[72px] pt-10 md:pt-32 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#E5F6FF]'} lg:bg-[url('/images/vector-bg.svg')] lg:bg-no-repeat lg:bg-center lg:bg-cover lg:bg-blend-overlay`}
    >
      <h1
        className={`page-title mx-2 md:mb-2 text-[30px] lg:text-[50px] font-bold tracking-tight text-center ${isDarkMode ? 'text-[#e0e0e0]' : 'text-gray-900'}`}
      >
        {t('main_title')}
      </h1>
      <h2 className="text-center text-[22px] text-[#2A4E63] mx-2 mb-4 font-normal">{t('main_subtitle')}</h2>
      <div
        className={`w-full lg:w-9/12 xl:w-9/12 2xl:w-7/12 flex flex-col ${isDarkMode ? 'bg-[#1c1c1c]' : 'bg-white'} drop-shadow-lg rounded-[48px] shadow p-[20px] md:p-[60px] relative`}
      >
        <div
          id="centerReward"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
        <div className="absolute hidden bg-white drop-shadow-lg top-[-20px] left-[-140px] border-[#E5F6FF] border-2 border-solid rounded-[120px] py-[2px] w-[200px] text-[#2A4E63] text-[30px] lg:flex items-center gap-2 overflow-hidden ">
          <div className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#E5F6FF]'} mr-3 ml-2 my-1 p-[12px] rounded-full`}>
            <Image
              src="/images/password.png"
              alt="password"
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="pt-[10px] relative">
            <AnimatedPassword length={7} />
          </p>
        </div>
        <div
          className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} absolute hidden justify-start drop-shadow-lg top-[150px] right-[-120px] border-[#E5F6FF] border-2 border-solid rounded-[120px] py-[2px] w-[200px] text-[#2A4E63] text-[30px] lg:flex lg:items-center gap-2 overflow-hidden`}
        >
          <div className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#E5F6FF]'} mr-3 ml-2 my-1 p-[12px] rounded-full`}>
            <Image
              src="/images/password.png"
              alt="password"
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="pt-[10px] relative">
            <AnimatedPassword length={7} />
          </p>
        </div>
        {passwords.length > 0 && (
          <PasswordRow
            password={passwords[0]}
            index={0}
            onGenerate={generatePassword}
            onCopy={handleCopyClick}
            isAnimating={isAnimating}
            isDarkMode={isDarkMode}
          />
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
        />
        <PasswordStandards
          selectedStandard={selectedStandard}
          setSelectedStandard={setSelectedStandard}
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
          setSelectedCharacterSets={setSelectedCharacterSets}
        />
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
              className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto`}
              onClick={handleCopyAllClick}
              disabled={isAnimating}
              style={isAnimating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <FileCopyIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
              {t('copy_all')}
            </Button>
            <Button
              className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto`}
              onClick={handleDownloadAllClick}
              disabled={isAnimating}
              style={isAnimating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <CloudDownloadIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
              {t('download_all')}
            </Button>
          </div>
        )}
        <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
      </div>
    </div>
  );
}