'use client';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Slider, FormControlLabel, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ThemeContext } from '../../context/ThemeContext';
import { SnackbarMessage } from '@/app/types/SnackBar';
import { GeneratorMode, getModeLabels } from './generatorModes';

interface PasswordSettingsProps {
    passwordLength: number;
    setPasswordLength: (length: number) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
    selectedCharacterSets: string[];
    setSelectedCharacterSets: (sets: string[]) => void;
    maxQuantity: number;
    selectedStandard: string;
    setSelectedStandard: (standard: string) => void;
    setSnackbars: React.Dispatch<React.SetStateAction<SnackbarMessage[]>>;
    mode: GeneratorMode;
    onModeChange: (mode: GeneratorMode) => void;
    separator: string;
    setSeparator: (separator: string) => void;
    capitalize: boolean;
    setCapitalize: (capitalize: boolean) => void;
}

const characterSets: Record<string, string> = {
    'A-Z': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'a-z': 'abcdefghijklmnopqrstuvwxyz',
    '0-9': '0123456789',
    '#$%': '!@#$%^&*()',
};

const passwordStandards: Record<string, { minLength: number; requiredSets: string[] }> = {
    nist: { minLength: 8, requiredSets: ['A-Z', 'a-z', '0-9', '#$%'] },
    pci: { minLength: 12, requiredSets: ['A-Z', 'a-z', '0-9', '#$%'] },
    custom: { minLength: 4, requiredSets: [] },
};

export default function PasswordSettings({
    passwordLength,
    setPasswordLength,
    quantity,
    setQuantity,
    selectedCharacterSets,
    setSelectedCharacterSets,
    maxQuantity,
    selectedStandard,
    setSelectedStandard,
    setSnackbars,
    mode,
    onModeChange,
    separator,
    setSeparator,
    capitalize,
    setCapitalize,
}: PasswordSettingsProps) {
    const { t, i18n } = useTranslation();
    const labels = getModeLabels(i18n.language);
    const { isDarkMode } = useContext(ThemeContext);

    const standardMin = selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength;
    const sliderMin = mode === 'chars' ? standardMin : mode === 'pin' ? 4 : 3;
    const sliderMax = mode === 'chars' ? 100 : mode === 'pin' ? 12 : 8;
    const lengthLabel = mode === 'chars' ? t('password_length') : mode === 'pin' ? `${labels.pin}:` : `${labels.wordCount}:`;

    const handleModeChange = (nextMode: GeneratorMode) => {
        if (nextMode === 'words' && (passwordLength < 3 || passwordLength > 8)) setPasswordLength(4);
        if (nextMode === 'pin' && (passwordLength < 4 || passwordLength > 12)) setPasswordLength(6);
        onModeChange(nextMode);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
        }
    };

    const handleCheckboxChange = (characterSet: string) => {
        let newSelectedCharacterSets: string[];

        if (selectedCharacterSets.includes(characterSet)) {
            if (selectedCharacterSets.length <= 1) {
                const snackbarId = Date.now();
                setSnackbars((prev) => [
                    ...prev,
                    { id: snackbarId, message: t('warning_last_checkbox') },
                ]);
                setTimeout(() => {
                    setSnackbars((prev) => prev.filter((s) => s.id !== snackbarId));
                }, 3000);
                return;
            }
            newSelectedCharacterSets = selectedCharacterSets.filter((set) => set !== characterSet);
        } else {
            newSelectedCharacterSets = [...selectedCharacterSets, characterSet];
        }

        setSelectedCharacterSets(newSelectedCharacterSets);

        const currentStandardConfig = passwordStandards[selectedStandard];
        const isStandardCompliant = currentStandardConfig.requiredSets.every((set) =>
            newSelectedCharacterSets.includes(set)
        );

        if (!isStandardCompliant) {
            setSelectedStandard('custom');
        }
    };

    return (
        <div className="password-settings grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 lg:items-start lg:justify-between mt-1 lg:mt-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-wrap items-center gap-2">
                {(['chars', 'words', 'pin'] as GeneratorMode[]).map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => handleModeChange(m)}
                        aria-pressed={mode === m}
                        className={`min-h-11 rounded-lg border-2 px-4 py-2 text-[14px] font-semibold transition-colors ${
                            mode === m
                                ? 'border-[#2A4E63] bg-[#e5f6ff] text-[#2A4E63] dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#0a1e2a]'
                                : 'border-gray-200 bg-white text-[#2A4E63] hover:border-[#2A4E63] dark:border-gray-600 dark:bg-[#374151] dark:text-[#e0e0e0]'
                        }`}
                    >
                        {labels[m]}
                    </button>
                ))}
            </div>
            <div className="mt-8 flex min-w-0 max-w-full flex-col gap-3 items-start lg:mt-6">
                <span className="hero-muted-label text-[16px] md:text-[22px]">
                    {lengthLabel} {passwordLength}
                </span>
                <div className="flex min-w-0 w-full max-w-full items-center gap-1 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => {
                            const newLength = Math.max(sliderMin, passwordLength - 1);
                            setPasswordLength(newLength);
                            if (mode === 'chars' && selectedStandard !== 'custom' && newLength < standardMin) {
                                setSelectedStandard('custom');
                            }
                        }}
                        aria-label={t('a11y_decrease_length')}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2A4E63] transition hover:bg-[#E5F6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:text-[#c7c7c7] dark:hover:bg-white/10 dark:focus-visible:ring-[#05a9ff]"
                      >
                        <RemoveCircleOutlineIcon aria-hidden="true" />
                      </button>
                    <Slider
                        value={passwordLength}
                        min={sliderMin}
                        max={sliderMax}
                        onChange={(_, newValue) => {
                            const numericValue = Array.isArray(newValue) ? newValue[0] : newValue;
                            setPasswordLength(numericValue as number);
                            if (mode === 'chars' && selectedStandard !== 'custom' && (numericValue as number) < standardMin) {
                                setSelectedStandard('custom');
                            }
                        }}
                        aria-label={t('a11y_length_slider')}
                        valueLabelDisplay="auto"
                        className="h-6 min-w-0 flex-1"
                        sx={{
                            '& .MuiSlider-thumb': { width: 24, height: 24 },
                            '& .MuiSlider-thumb input': { width: 24, height: 24 },
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            const newLength = Math.min(sliderMax, passwordLength + 1);
                            setPasswordLength(newLength);
                            if (mode === 'chars' && selectedStandard !== 'custom' && newLength < standardMin) {
                                setSelectedStandard('custom');
                            }
                        }}
                        aria-label={t('a11y_increase_length')}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2A4E63] transition hover:bg-[#E5F6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:text-[#c7c7c7] dark:hover:bg-white/10 dark:focus-visible:ring-[#05a9ff]"
                    >
                        <AddCircleOutlineIcon aria-hidden="true" />
                    </button>
                </div>
                {mode === 'chars' && (
                    <div className="flex flex-wrap items-center gap-2">
                        {[8, 12, 16, 20].map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => {
                                    setPasswordLength(preset);
                                    if (selectedStandard !== 'custom' && preset < passwordStandards[selectedStandard].minLength) {
                                        setSelectedStandard('custom');
                                    }
                                }}
                                aria-label={t('a11y_length_preset', { length: preset })}
                                className={`min-h-11 min-w-11 rounded-lg border-2 px-3 text-[14px] font-semibold transition-colors ${
                                    passwordLength === preset
                                        ? 'border-[#2A4E63] bg-[#e5f6ff] text-[#2A4E63] dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#0a1e2a]'
                                        : 'border-gray-200 bg-white text-[#2A4E63] hover:border-[#2A4E63] dark:border-gray-600 dark:bg-[#374151] dark:text-[#e0e0e0]'
                                }`}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                )}
                {mode === 'words' && (
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            {['-', '_', '.', ' '].map((sep) => (
                                <button
                                    key={sep}
                                    type="button"
                                    onClick={() => setSeparator(sep)}
                                    aria-label={t('a11y_separator', { separator: sep === ' ' ? t('a11y_space') : sep })}
                                    className={`h-11 w-11 rounded-lg border-2 text-[16px] font-semibold transition-colors ${
                                        separator === sep
                                            ? 'border-[#2A4E63] bg-[#e5f6ff] text-[#2A4E63] dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#0a1e2a]'
                                            : 'border-gray-200 bg-white text-[#2A4E63] hover:border-[#2A4E63] dark:border-gray-600 dark:bg-[#374151] dark:text-[#e0e0e0]'
                                    }`}
                                >
                                    {sep === ' ' ? '␣' : sep}
                                </button>
                            ))}
                        </div>
                        <label className="flex items-center gap-2 text-[14px] text-[#2A4E63] dark:text-[#e0e0e0]">
                            <input
                                type="checkbox"
                                checked={capitalize}
                                onChange={(e) => setCapitalize(e.target.checked)}
                                className="h-4 w-4 accent-[#2A4E63] dark:accent-[#05a9ff]"
                            />
                            {labels.capitalize}
                        </label>
                    </div>
                )}
            </div>
            <div className="flex min-w-0 w-full max-w-full flex-col gap-3 items-start">
                <label htmlFor="quantity" className="hero-muted-label text-[16px] md:text-[22px]">
                    {t('quantity')}
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={`w-full max-w-full min-w-0 rounded-[18px] border-2 border-[#E5F6FF] border-solid py-3 px-3 text-[18px] text-[#071016] outline-none md:py-5 md:text-[20px] ${isDarkMode ? 'border-none' : ''}`}
                />
            </div>
            {mode === 'chars' && (
            <div className="password-settings-charsets col-span-1 mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:mt-9 md:col-span-2 lg:col-span-2">
                <label className="hero-muted-label shrink-0 text-[16px] md:text-[22px]">{t('use_characters')}</label>
                <div className="flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:gap-x-4 md:text-[20px]">
                    {Object.keys(characterSets).map((characterSet) => (
                        <div key={characterSet} className="flex min-w-0 items-center gap-2">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCharacterSets.includes(characterSet)}
                                        onChange={() => handleCheckboxChange(characterSet)}
                                        checkedIcon={<CheckBoxOutlinedIcon />}
                                        sx={{ color: '#2A4E63', '&.Mui-checked': { color: '#2A4E63' } }}
                                        className="h-[24px] text-sm md:text-[22px]"
                                    />
                                }
                                label={<span className="text-[18px] md:text-[16px]">{characterSet}</span>}
                            />
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
}
