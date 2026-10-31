'use client';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Slider, FormControlLabel, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ThemeContext } from '../../context/ThemeContext';
import { SnackbarMessage } from '@/app/types/SnackBar';

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
}: PasswordSettingsProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext);

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
            <div className="mt-8 flex min-w-0 max-w-full flex-col gap-3 items-start lg:mt-6">
                <label htmlFor="password-length" className="hero-muted-label text-[16px] md:text-[22px]">
                    {t('password_length')} {passwordLength}
                </label>
                <div className="flex min-w-0 w-full max-w-full items-center gap-2 sm:gap-4">
                      <RemoveCircleOutlineIcon
                        aria-hidden={false}
                        onClick={() => {
                            const newLength = Math.max(
                                selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength,
                                passwordLength - 1
                            );
                            setPasswordLength(newLength);
                            if (selectedStandard !== 'custom' && newLength < passwordStandards[selectedStandard].minLength) {
                                setSelectedStandard('custom');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Decrease password length"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.currentTarget.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                        className="shrink-0"
                    />
                    <Slider
                        value={passwordLength}
                        min={selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength}
                        max={100}
                        onChange={(_, newValue) => {
                            const numericValue = Array.isArray(newValue) ? newValue[0] : newValue;
                            setPasswordLength(numericValue as number);
                            if (selectedStandard !== 'custom' && numericValue < passwordStandards[selectedStandard].minLength) {
                                setSelectedStandard('custom');
                            }
                        }}
                        aria-label="Password length slider"
                        valueLabelDisplay="auto"
                        className="h-[15px] min-w-0 flex-1"
                    />
                    <AddCircleOutlineIcon
                        aria-hidden={false}
                        onClick={() => {
                            const newLength = Math.min(100, passwordLength + 1);
                            setPasswordLength(newLength);
                            if (selectedStandard !== 'custom' && newLength < passwordStandards[selectedStandard].minLength) {
                                setSelectedStandard('custom');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Increase password length"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.currentTarget.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                        className="shrink-0"
                    />
                </div>
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
                            aria-label={`Set password length to ${preset}`}
                            className={`rounded-lg border-2 px-2.5 py-1 text-[13px] font-semibold transition-colors ${
                                passwordLength === preset
                                    ? 'border-[#2A4E63] bg-[#e5f6ff] text-[#2A4E63] dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#0a1e2a]'
                                    : 'border-gray-200 bg-white text-[#2A4E63] hover:border-[#2A4E63] dark:border-gray-600 dark:bg-[#374151] dark:text-[#e0e0e0]'
                            }`}
                        >
                            {preset}
                        </button>
                    ))}
                </div>
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
        </div>
    );
}
