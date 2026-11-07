'use client';

import { useContext, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Button from '@/components/ui/Button';
import { ThemeContext } from '@/context/ThemeContext';
import ActionBtn from './buttons/ActionBtn';
import { menuPaperSx, shareTargets, useDensity } from './passwordActions';

const DEFAULT_QUANTITY = 10;
/** Typing "25" settles once instead of generating (and reporting) 2 and then 25. */
const QUANTITY_DEBOUNCE_MS = 250;
/** Messenger / mailto links get unreliable past ~2000 characters; leave room for the base URL. */
const SHARE_URL_LIMIT = 1800;

/** GA event a generation reports: list for a quantity, same-size list again, or one row. */
export type BulkGenerationEvent = 'passwords_generated_batch' | 'passwords_regenerated' | 'password_generated';

interface BulkPasswordsProps {
    /** Resolves to `count` fresh passwords for the current rules (reporting `event`), or null on failure. */
    generate: (count: number, event: BulkGenerationEvent) => Promise<string[] | null>;
    maxQuantity: number;
    onClose: () => void;
    onCopy: (passwords: string[]) => void;
    onDownload: (passwords: string[]) => void;
    /** GA hook for actions handled here; the caller adds ui_language and surface. */
    track: (event: string, params?: Record<string, string | number>) => void;
}

type ShareState = { anchor: HTMLElement; text: string; count: number; tooLong: boolean };

/**
 * In-place bulk view over the generator card: a quantity field, list actions and the
 * generated list. It replaces the form (which is inert meanwhile) rather than the page,
 * so it is a labelled region, not a modal dialog.
 */
export default function BulkPasswords({ generate, maxQuantity, onClose, onCopy, onDownload, track }: BulkPasswordsProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useContext(ThemeContext);
    const uid = useId();
    const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
    // what the field shows: may be empty while the visitor retypes the number
    const [draft, setDraft] = useState(String(DEFAULT_QUANTITY));
    const [round, setRound] = useState(0); // bumped by Generate: same quantity, new list
    const [passwords, setPasswords] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const [copiedRow, setCopiedRow] = useState<number | null>(null);
    // one menu for the toolbar (whole list) and the rows (one password)
    const [share, setShare] = useState<ShareState | null>(null);
    // how the next list generation runs: set by whatever triggered it
    const next = useRef<{ delay: number; event: BulkGenerationEvent }>({ delay: 0, event: 'passwords_generated_batch' });
    const inputRef = useRef<HTMLInputElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const showLabel = useDensity(toolbarRef) === 'labels';

    // Focus the field on open and hand focus back to the opener on close.
    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null;
        inputRef.current?.focus();
        return () => opener?.focus();
    }, []);

    // Every quantity change (debounced) or Generate replaces the list; a stale response is dropped.
    useEffect(() => {
        let cancelled = false;
        const { delay, event } = next.current;
        const timer = window.setTimeout(() => {
            generate(quantity, event).then((list) => {
                if (!cancelled && list) setPasswords(list);
            });
        }, delay);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [generate, quantity, round]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        const value = parseInt(raw, 10);
        if (Number.isNaN(value)) {
            setDraft(raw); // let the field be cleared and retyped; the list keeps the last valid quantity
            return;
        }
        const clamped = Math.min(maxQuantity, Math.max(1, value));
        setDraft(String(clamped));
        next.current = { delay: QUANTITY_DEBOUNCE_MS, event: 'passwords_generated_batch' };
        setQuantity(clamped);
    };

    const handleCopy = () => {
        onCopy(passwords);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const regenerate = () => {
        next.current = { delay: 0, event: 'passwords_regenerated' };
        setRound((r) => r + 1);
    };
    const longest = Math.max(1, ...passwords.map((p) => p.length));

    const copyRow = (index: number) => {
        navigator.clipboard.writeText(passwords[index]).then(
            () => {
                setCopiedRow(index);
                setTimeout(() => setCopiedRow((current) => (current === index ? null : current)), 1000);
                track('password_copied', { index });
            },
            () => {} // clipboard blocked: no false "Copied"
        );
    };

    const regenerateRow = async (index: number) => {
        const old = passwords[index];
        const [fresh] = (await generate(1, 'password_generated')) ?? [];
        // skip if the list was replaced meanwhile
        if (fresh) setPasswords((prev) => (prev[index] === old ? prev.map((p, i) => (i === index ? fresh : p)) : prev));
    };

    const openShare = (anchor: HTMLElement, list: string[]) => {
        const text = list.length === 1 ? `${t('share_message')}${list[0]}` : `${t('share_message')}\n${list.join('\n')}`;
        const tooLong = encodeURIComponent(text).length > SHARE_URL_LIMIT;
        // the system share sheet has no URL length limit and keeps passwords out of third-party URLs
        if (tooLong && typeof navigator.share === 'function') {
            navigator.share({ text }).then(() => track('password_shared', { target: 'native', count: list.length }), () => {});
            return;
        }
        setShare({ anchor, text, count: list.length, tooLong });
    };

    const rowIcon =
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#EAF8FF] hover:text-[#2A4E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:text-[#9ca3af] dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-[#05a9ff]';

    return (
        <div
            role="region"
            aria-labelledby="bulk-title"
            onKeyDown={(e) => e.key === 'Escape' && !share && onClose()}
            className="surface-card absolute inset-0 z-20 flex flex-col rounded-[48px] p-[16px] md:p-8"
        >
            {/* The first two rows mirror the form underneath (password row, then mode row), so
                opening/closing swaps only what is below them: the pill stays put and Close sits
                exactly where Bulk is. Keep these wrappers in sync with PasswordRow / PasswordSettings. */}
            <div className="my-3 w-full lg:my-1">
                <div
                    ref={toolbarRef}
                    className="flex h-16 w-full min-w-0 items-center gap-1.5 rounded-[120px] border-2 border-solid border-[#E5F6FF] bg-white py-0 pl-4 pr-2 text-[#071016] dark:border-transparent dark:bg-[#000000]"
                >
                    <label className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="hidden text-[#6b7280] sm:inline dark:text-[#9ca3af]">{t('quantity')}</span>
                        <input
                            ref={inputRef}
                            type="number"
                            name="quantity"
                            aria-label={t('quantity')}
                            min="1"
                            max={maxQuantity}
                            value={draft}
                            onChange={handleQuantityChange}
                            onBlur={() => setDraft(String(quantity))}
                            className="w-full min-w-0 max-w-24 border-none bg-transparent py-2 text-base outline-none dark:text-white md:text-lg"
                        />
                    </label>
                    <ActionBtn
                        variant="primary"
                        showLabel={showLabel}
                        label={copied ? t('copied_short') : t('copy')}
                        icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                        onClick={handleCopy}
                    />
                    <ActionBtn
                        showLabel={showLabel}
                        label={t('share')}
                        icon={<SendOutlinedIcon />}
                        aria-haspopup="menu"
                        aria-expanded={!!share}
                        onClick={(e) => openShare(e.currentTarget, passwords)}
                    />
                    <ActionBtn
                        showLabel={showLabel}
                        label={t('generate')}
                        icon={<RefreshIcon />}
                        onClick={regenerate}
                        onLongPress={regenerate}
                    />
                </div>
            </div>
            <div className="mt-1 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[auto_1fr_auto] lg:mt-2">
                {/* mobile: in the strength line's slot; sm+: where the mode buttons are */}
                <h2
                    id="bulk-title"
                    className="hero-muted-label col-span-2 min-h-[24px] text-[16px] font-semibold sm:col-span-1 sm:col-start-1 sm:row-start-1 md:text-[18px]"
                >
                    {t('bulk_generate')}
                </h2>
                {/* right-aligned, so Close keeps Bulk's spot and Download sits to its left */}
                <div className="col-start-2 row-start-2 flex shrink-0 items-center gap-2 self-start sm:col-start-3 sm:row-start-1">
                    <Button variant="secondary" onClick={() => onDownload(passwords)}>
                        <FileDownloadOutlinedIcon aria-hidden="true" fontSize="small" />
                        {t('download')}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        <CloseIcon aria-hidden="true" fontSize="small" />
                        {t('a11y_close')}
                    </Button>
                </div>
            </div>
            <Menu
                anchorEl={share?.anchor}
                open={!!share}
                onClose={() => setShare(null)}
                disableScrollLock
                PaperProps={{ sx: menuPaperSx(isDarkMode) }}
            >
                {share?.tooLong ? (
                    <MenuItem disabled sx={{ whiteSpace: 'normal', maxWidth: 300 }}>
                        {t('share_too_long')}
                    </MenuItem>
                ) : (
                    shareTargets(share?.text ?? '', t('share-password')).map(({ key, label, Icon, color, href }) => (
                        <MenuItem
                            key={key}
                            component="a"
                            href={href}
                            {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                            onClick={() => {
                                track('password_shared', { target: key, count: share?.count ?? 0 });
                                setShare(null);
                            }}
                        >
                            <ListItemIcon><Icon sx={{ color }} /></ListItemIcon>
                            {label}
                        </MenuItem>
                    ))
                )}
            </Menu>
            {/* row copies only swap an icon; this announces them */}
            <span role="status" className="sr-only">
                {copiedRow !== null ? t('copied_short') : ''}
            </span>
            <ul
                aria-label={t('bulk_passwords_list')}
                className="quantity-input mt-3 grid min-h-0 w-full flex-1 content-start overflow-y-auto rounded-[18px] border-2 border-solid border-[#E5F6FF] py-1 font-mono text-[15px] md:mt-4"
                // As many columns as the longest row fits (ch = one monospace char at the list's
                // font size; 8rem = padding + gaps + three 32px icons). min(100%, …) keeps a
                // row wider than the list in a single full-width column: no horizontal scroll.
                style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, calc(${longest}ch + 8rem)), 1fr))` }}
            >
                {passwords.map((password, index) => {
                    // the row's buttons are described by its password, so "Copy" says which one
                    const pwId = `${uid}-pw-${index}`;
                    return (
                        <li
                            key={index}
                            className="flex items-center gap-1 py-0.5 pl-3 pr-1 hover:bg-black/[.03] dark:hover:bg-white/5"
                        >
                            {/* font-mono again here: a global `*` font-family rule blocks inheritance from the list */}
                            <span id={pwId} className="min-w-0 flex-1 break-all font-mono text-[#071016] dark:text-white">
                                {password}
                            </span>
                            <button
                                type="button"
                                className={rowIcon}
                                aria-label={copiedRow === index ? t('copied_short') : t('copy')}
                                aria-describedby={pwId}
                                onClick={() => copyRow(index)}
                            >
                                {copiedRow === index ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                            </button>
                            <button
                                type="button"
                                className={rowIcon}
                                aria-label={t('share-password')}
                                aria-describedby={pwId}
                                aria-haspopup="menu"
                                onClick={(e) => openShare(e.currentTarget, [password])}
                            >
                                <SendOutlinedIcon fontSize="small" />
                            </button>
                            <button
                                type="button"
                                className={rowIcon}
                                aria-label={t('generate')}
                                aria-describedby={pwId}
                                onClick={() => regenerateRow(index)}
                            >
                                <RefreshIcon fontSize="small" />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
