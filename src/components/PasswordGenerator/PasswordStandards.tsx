'use client';

import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { PASSWORD_STANDARDS as passwordStandards } from './generatorCore.mjs';

interface PasswordStandardsProps {
  selectedStandard: string;
  setSelectedStandard: (standard: string) => void;
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  setSelectedCharacterSets: (sets: string[]) => void;
  /** Character-set toggles, rendered after the presets in the same row. */
  children: ReactNode;
}

// 'custom' is not a choice: it is the state when the settings match no preset
const PRESETS = Object.keys(passwordStandards).filter((standard) => standard !== 'custom');

export default function PasswordStandards({
  selectedStandard,
  setSelectedStandard,
  passwordLength,
  setPasswordLength,
  setSelectedCharacterSets,
  children,
}: PasswordStandardsProps) {
  const { t } = useTranslation();

  const handleStandardChange = (standard: string) => {
    // clicking the active preset releases it, keeping the current settings
    if (standard === selectedStandard) {
      setSelectedStandard('custom');
      return;
    }
    const standardConfig = passwordStandards[standard];
    setSelectedStandard(standard);
    setPasswordLength(Math.max(passwordLength, standardConfig.minLength));
    setSelectedCharacterSets(standardConfig.requiredSets);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span id="charsets-label" className="hero-muted-label text-[16px] md:text-[22px]">
          {t('use_characters')}
        </span>
        <span className="hero-muted-label text-[13px] font-normal" aria-live="polite">
          {t(`standard_${selectedStandard}_desc`)}
        </span>
      </div>
      <div role="group" aria-labelledby="charsets-label" className="flex flex-wrap items-center gap-2">
        {PRESETS.map((standard) => (
          <Button
            key={standard}
            variant="choice"
            size="md"
            className="rounded-lg"
            selected={selectedStandard === standard}
            aria-pressed={selectedStandard === standard}
            onClick={() => handleStandardChange(standard)}
          >
            {t(`standard_${standard}`)}
          </Button>
        ))}
        <span className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
