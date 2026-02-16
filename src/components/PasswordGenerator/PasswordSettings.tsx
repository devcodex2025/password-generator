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
                const snackbarId = Date.now(); // Store the ID for consistent filtering
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
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4 items-center mt-1 lg:mt-3">
            <div className="flex flex-col gap-3 items-start mt-8 lg:mt-6">
                <label htmlFor="password-length" className="hero-muted-label text-[16px] md:text-[22px]">
                    {t('password_length')} {passwordLength}
                </label>
                <div className="flex items-center gap-4 w-full">
                    <RemoveCircleOutlineIcon
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
                        style={{ cursor: 'pointer' }}
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
                        className="h-[15px]"
                    />
                    <AddCircleOutlineIcon
                        onClick={() => {
                            const newLength = Math.min(100, passwordLength + 1);
                            setPasswordLength(newLength);
                            if (selectedStandard !== 'custom' && newLength < passwordStandards[selectedStandard].minLength) {
                                setSelectedStandard('custom');
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-start">
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
                    className={`${isDarkMode ? 'border-none' : ''
                        } border-2 border-[#E5F6FF] border-solid rounded-[18px] text-[#071016] text-[18px] md:text-[20px] py-3 md:py-5 px-3 outline-none w-full`}
                />
            </div>
            <div className="flex gap-3 flex-wrap items-center mt-9">
                <label className="hero-muted-label text-[16px] md:text-[22px]">{t('use_characters')}</label>
                <div className="flex items-start flex-nowrap text-[10px] md:text-[20px]">
                    {Object.keys(characterSets).map((characterSet) => (
                        <div key={characterSet} className="flex items-center gap-2">
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
