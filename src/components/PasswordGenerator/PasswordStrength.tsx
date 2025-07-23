'use client';

import { useTranslation } from 'react-i18next';

interface PasswordStrengthProps {
  analysis: {
    strengthWord: string;
    strengthColor: { color: string };
    strengthWordScoreLocalized: string;
  };
}

export default function PasswordStrength({ analysis }: PasswordStrengthProps) {
  const { t } = useTranslation();

  return (
    <div
      className="text-[#2A4E63] text-[16px] md:text-[18px] lg:mt-3 lg:flex"
      style={analysis.strengthColor}
    >
      {analysis.strengthWord && `${analysis.strengthWord} ${t('time_to_crack')} ${analysis.strengthWordScoreLocalized}`}
    </div>
  );
}