'use client';

import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Slider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@/components/ui/Button';
import { SnackbarMessage } from '@/app/types/SnackBar';
import PasswordStandards from './PasswordStandards';
import { GeneratorMode, getModeLabels } from './generatorModes';
import { CHARACTER_SETS as characterSets, PASSWORD_STANDARDS as passwordStandards } from './generatorCore.mjs';

interface PasswordSettingsProps {
    /** Strength line, placed on the mode row from sm up (own line above it on mobile). */
    strength: ReactNode;
    passwordLength: number;
    setPasswordLength: (length: number) => void;
    onOpenBulk: () => void;
    selectedCharacterSets: string[];
    setSelectedCharacterSets: (sets: string[]) => void;
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

export default function PasswordSettings({
    passwordLength,
    setPasswordLength,
    onOpenBulk,
    selectedCharacterSets,
    setSelectedCharacterSets,
    selectedStandard,
    setSelectedStandard,
    setSnackbars,
    mode,
    onModeChange,
    separator,
    setSeparator,
    capitalize,
    setCapitalize,
    strength,
}: PasswordSettingsProps) {
    const { t, i18n } = useTranslation();
    const labels = getModeLabels(i18n.language);

    const standardMin = selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength;
    const sliderMin = mode === 'chars' ? 4 : mode === 'pin' ? 4 : 3;
    const sliderMax = mode === 'chars' ? 100 : mode === 'pin' ? 12 : 8;
    const lengthLabel = mode === 'chars' ? t('password_length') : mode === 'pin' ? `${labels.pin}:` : `${labels.wordCount}:`;

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
        <div className="password-settings grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2 lg:items-start lg:justify-between mt-1 lg:mt-2 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-x-8">
            {/* mobile: strength line, then modes + bulk; sm+: modes | strength | bulk on one row.
                Modes wrap among themselves; the bulk action keeps the top-right slot.
                BulkPasswords mirrors this row (and the mt-1/lg:mt-2 above it) to put Close where Bulk is. */}
            <div className="col-span-1 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[auto_1fr_auto] md:col-span-2 lg:col-span-2">
                <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:text-right">{strength}</div>
                <div className="row-start-2 flex min-w-0 flex-wrap items-center gap-2 self-start sm:col-start-1 sm:row-start-1">
                    {(['chars', 'words', 'pin'] as GeneratorMode[]).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => onModeChange(m)}
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
                {/* an action, not a mode: pushed apart and drawn as a pill with an icon */}
                <Button
                    variant="secondary"
                    className="col-start-2 row-start-2 shrink-0 self-start sm:col-start-3 sm:row-start-1"
                    onClick={onOpenBulk}
                    title={t('bulk_generate')}
                >
                    <PlaylistAddIcon aria-hidden="true" fontSize="small" />
                    {t('bulk')}
                </Button>
            </div>
            {/* sm+: label + slider on the left half, the mode's options beside them on the right; mobile: one column */}
            {/* xl + chars mode: shares its row with the character settings */}
            <div className={`col-span-1 mt-3 grid min-w-0 max-w-full grid-cols-1 items-center gap-3 sm:grid-cols-2 sm:gap-x-6 md:col-span-2 lg:col-span-2 ${mode === 'chars' ? 'xl:col-span-1 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-x-3' : ''}`}>
                <span className={`hero-muted-label text-[16px] sm:col-start-1 sm:row-start-1 md:text-[22px] ${mode === 'words' ? '' : 'sm:col-span-2'}`}>
                    {lengthLabel} {passwordLength}
                    {mode === 'chars' && selectedStandard !== 'custom' && (
                        <span className="ml-2 text-[14px] md:text-[16px] opacity-70">≥ {standardMin}</span>
                    )}
                </span>
                <div className="flex min-w-0 w-full max-w-full items-center gap-1 sm:col-start-1 sm:row-start-2 sm:gap-3">
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
                    <div className="flex flex-wrap items-center gap-2 sm:col-start-2 sm:row-start-2">
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
                    <>
                        <div className="flex items-center gap-1.5 sm:col-start-2 sm:row-start-2">
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
                        <label className="flex items-center gap-2 justify-self-start text-[14px] text-[#2A4E63] sm:col-start-2 sm:row-start-1 dark:text-[#e0e0e0]">
                            <input
                                type="checkbox"
                                checked={capitalize}
                                onChange={(e) => setCapitalize(e.target.checked)}
                                className="h-4 w-4 accent-[#2A4E63] dark:accent-[#05a9ff]"
                            />
                            {labels.capitalize}
                        </label>
                    </>
                )}
            </div>
            {mode === 'chars' && (
            <div className="password-settings-charsets col-span-1 w-full min-w-0 max-w-full md:col-span-2 lg:col-span-2 xl:col-span-1 xl:mt-3">
                <PasswordStandards
                    selectedStandard={selectedStandard}
                    setSelectedStandard={setSelectedStandard}
                    passwordLength={passwordLength}
                    setPasswordLength={setPasswordLength}
                    setSelectedCharacterSets={setSelectedCharacterSets}
                >
                    {Object.keys(characterSets).map((characterSet) => (
                        <Button
                            key={characterSet}
                            variant="choice"
                            size="md"
                            className="rounded-lg"
                            selected={selectedCharacterSets.includes(characterSet)}
                            aria-pressed={selectedCharacterSets.includes(characterSet)}
                            onClick={() => handleCheckboxChange(characterSet)}
                        >
                            {characterSet}
                        </Button>
                    ))}
                </PasswordStandards>
            </div>
            )}
        </div>
    );
}
