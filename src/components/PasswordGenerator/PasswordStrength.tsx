'use client';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface PasswordStrengthProps {
  analysis: {
    strengthWord: string;
    strengthColor: { color: string };
    strengthWordScoreLocalized: string;
  };
}

export default function PasswordStrength({ analysis }: PasswordStrengthProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className="hero-muted-label text-[16px] md:text-[18px] lg:mt-3 lg:flex"
      style={isDarkMode ? undefined : analysis.strengthColor}
    >
      {analysis.strengthWord && `${analysis.strengthWord} ${t('time_to_crack')} ${analysis.strengthWordScoreLocalized}`}
    </div>
  );
}
