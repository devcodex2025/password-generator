'use client';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface PasswordStandardsProps {
  selectedStandard: string;
  setSelectedStandard: (standard: string) => void;
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  setSelectedCharacterSets: (sets: string[]) => void;
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

export default function PasswordStandards({
  selectedStandard,
  setSelectedStandard,
  passwordLength,
  setPasswordLength,
  setSelectedCharacterSets,
}: PasswordStandardsProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

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
            <button
              key={standard}
              className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-[14px] sm:text-[16px] md:text-[18px] transition-all border-2 focus:outline-none w-full sm:w-auto ${
                selectedStandard === standard
                  ? 'border-[#2A4E63] bg-[#e5f6ff] dark:bg-[#05a9ff] text-[#2A4E63] dark:text-[#e0e0e0]'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#374151] text-[#2A4E63] dark:text-[#e0e0e0]'
              }`}
              onClick={() => handleStandardChange(standard)}
            >
              {t(`standard_${standard}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full mt-2">
        <span
          className={`hero-muted-label mb-2 block text-[14px] sm:text-[17px] md:text-[20px] font-normal border-2 ${
            isDarkMode ? 'border-[#05a9ff]' : 'border-[#e5f6ff]'
          } rounded-lg px-3 sm:px-4 py-2 mt-1`}
        >
          {t(passwordStandards[selectedStandard].description)}
        </span>
      </div>
    </div>
  );
}
