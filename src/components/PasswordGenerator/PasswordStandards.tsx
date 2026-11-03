'use client';

import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { PASSWORD_STANDARDS as passwordStandards } from './generatorCore.mjs';

interface PasswordStandardsProps {
  selectedStandard: string;
  setSelectedStandard: (standard: string) => void;
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  setSelectedCharacterSets: (sets: string[]) => void;
}

export default function PasswordStandards({
  selectedStandard,
  setSelectedStandard,
  passwordLength,
  setPasswordLength,
  setSelectedCharacterSets,
}: PasswordStandardsProps) {
  const { t } = useTranslation();

  const handleStandardChange = (standard: string) => {
    setSelectedStandard(standard);
    const standardConfig = passwordStandards[standard];
    if (standard !== 'custom') {
      setPasswordLength(Math.max(passwordLength, standardConfig.minLength));
      setSelectedCharacterSets(standardConfig.requiredSets);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4">
        <label className="hero-muted-label text-[16px] md:text-[22px] whitespace-nowrap">
          {t('password_standards_title')}
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
          {Object.keys(passwordStandards).map((standard) => (
            <Button
              key={standard}
              variant="choice"
              selected={selectedStandard === standard}
              size="md"
              className="w-full sm:w-auto"
              onClick={() => handleStandardChange(standard)}
            >
              {t(`standard_${standard}`)}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full mt-2">
        <span
          className="hero-muted-label mb-2 block text-[14px] sm:text-[17px] md:text-[20px] font-normal border-2 border-[#e5f6ff] dark:border-[#05a9ff] rounded-lg px-3 sm:px-4 py-2 mt-1"
        >
          {t(`standard_${selectedStandard}_desc`)}
        </span>
      </div>
    </div>
  );
}
