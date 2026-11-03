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

  // zxcvbn runs after hydration; without a reserved line the label grows from
  // 0 to 27 px and pushes .password-settings down (CLS 0.0064).
  return (
    <div
      className="hero-muted-label min-h-[27px] text-[16px] md:text-[18px] lg:mt-3 lg:flex"
      style={isDarkMode ? undefined : analysis.strengthColor}
    >
      {analysis.strengthWord && `${analysis.strengthWord} ${t('time_to_crack')} ${analysis.strengthWordScoreLocalized}`}
    </div>
  );
}
