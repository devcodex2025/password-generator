'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { cn } from '@/lib/utils';
import { localeFontClass } from '@/lib/locale-font';
import { announceModalOpen, subscribeModalOpen } from '@/lib/modal-coordination';
import {
  BOOKMARK_EVENTS,
  BROWSER_LABELS,
  OPERATING_SYSTEM_LABELS,
  buildBookmarkEventParams,
  resolveBookmarkInstructions,
  trackBookmarkEvent,
} from './bookmarkUtils.mjs';
import type {
  BookmarkInstructionsPlan,
  BookmarkStepId,
  BrowserId,
  CloseMethod,
  DeviceType,
  OperatingSystem,
  PlatformInfo,
} from './bookmarkTypes';

const DEVICE_OPTIONS: DeviceType[] = ['desktop', 'tablet', 'mobile'];

const OS_OPTIONS: OperatingSystem[] = [
  'windows',
  'macos',
  'linux',
  'chromeos',
  'android',
  'ios',
  'ipados',
  'unknown',
];

const BROWSER_OPTIONS: BrowserId[] = [
  'chrome',
  'edge',
  'firefox',
  'safari',
  'brave',
  'opera',
  'samsung',
  'other',
];

const DESKTOP_OS: OperatingSystem[] = ['windows', 'macos', 'linux', 'chromeos'];

interface BookmarkInstructionsProps {
  locale: string;
  platform: PlatformInfo;
  onClose: (method: CloseMethod) => void;
}

/**
 * "Save this tool for later" dialog.
 *
 * - modal on desktop, bottom sheet on phones;
 * - closes on the close button, on backdrop click and on Escape;
 * - traps focus and restores it on close;
 * - lets the visitor override the detected platform;
 * - never claims the page was actually bookmarked; the confirmation is the
 *   visitor's own statement, tracked as `bookmark_marked_done`.
 */
export default function BookmarkInstructions({ locale, platform, onClose }: BookmarkInstructionsProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  const [deviceType, setDeviceType] = useState<DeviceType>(platform.deviceType);
  const [os, setOs] = useState<OperatingSystem>(platform.os);
  const [browser, setBrowser] = useState<BrowserId>(platform.browser);

  const plan = useMemo(
    () => resolveBookmarkInstructions({ deviceType, os, browser, isReliable: platform.isReliable }) as BookmarkInstructionsPlan,
    [deviceType, os, browser, platform.isReliable]
  );

  const osLabel = OPERATING_SYSTEM_LABELS[os] ?? t('bookmark_platform_other');
  const browserLabel = BROWSER_LABELS[browser] ?? t('bookmark_platform_other');

  // Keep only one modal on screen: opening this one closes the NordPass prompt,
  // and the NordPass prompt closes this one when it opens.
  useEffect(() => {
    announceModalOpen('bookmark-instructions');
    const unsubscribe = subscribeModalOpen((id) => {
      if (id !== 'bookmark-instructions') onClose('other_modal');
    });
    return unsubscribe;
  }, [onClose]);

  // One impression per open; the block click was already tracked separately.
  useEffect(() => {
    trackBookmarkEvent(
      BOOKMARK_EVENTS.instructionsView,
      buildBookmarkEventParams({ deviceType, os, browser, isReliable: platform.isReliable }, locale)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus management + scroll lock.
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      const previous = previouslyFocusedRef.current;
      if (previous instanceof HTMLElement && document.contains(previous)) {
        previous.focus();
      }
    };
  }, []);

  const handleDeviceChange = useCallback((next: DeviceType) => {
    setDeviceType(next);
    setOs((current) => {
      if (next === 'mobile') return current === 'ios' || current === 'android' ? current : 'android';
      if (next === 'tablet') return current === 'ipados' || current === 'android' ? current : 'ipados';
      return DESKTOP_OS.includes(current) ? current : 'windows';
    });
  }, []);

  const handleOsChange = useCallback((next: OperatingSystem) => {
    setOs(next);
    if (next === 'android' || next === 'ios') setDeviceType('mobile');
    else if (next === 'ipados') setDeviceType('tablet');
    else if (DESKTOP_OS.includes(next)) setDeviceType('desktop');
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose('backdrop');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose('escape');
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleMarkedDone = () => {
    trackBookmarkEvent(
      BOOKMARK_EVENTS.markedDone,
      buildBookmarkEventParams({ deviceType, os, browser, isReliable: platform.isReliable }, locale)
    );
    onClose('marked_done');
  };

  const stepText = (step: BookmarkStepId): string => {
    switch (step) {
      case 'press_shortcut':
        return t('bookmark_step_press_shortcut', { shortcut: plan.shortcut ?? '' });
      case 'open_menu':
        return t('bookmark_step_1');
      case 'choose_bookmark':
        return t('bookmark_step_2');
      case 'confirm':
        return t('bookmark_step_3');
      case 'share':
        return t('bookmark_step_share');
      case 'add_bookmark':
        return t('bookmark_step_add_bookmark');
      case 'save':
        return t('bookmark_step_save');
      default:
        return '';
    }
  };

  /**
   * Render the shortcut step with the key combination as a real <kbd> element.
   * The translation keeps `{{shortcut}}` so translators control word order; we
   * substitute a marker and split on it instead of injecting HTML.
   */
  const renderShortcutStep = (shortcut: string) => {
    const marker = '\u0000';
    const [before, after = ''] = t('bookmark_step_press_shortcut', { shortcut: marker }).split(marker);

    return (
      <>
        {before}
        <kbd
          aria-label={t('bookmark_keyboard_shortcut')}
          className="rounded-md border border-[#c9e6f5] bg-white px-1.5 py-0.5 font-mono text-[12px] text-[#2A4E63] dark:border-[#4b5563] dark:bg-[#2d2d2d] dark:text-[#9ed9ff]"
        >
          {shortcut}
        </kbd>
        {after}
      </>
    );
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10060] flex items-end justify-center bg-[#071016]/45 backdrop-blur-[2px] sm:items-center sm:p-3"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmark-instructions-title"
        aria-describedby="bookmark-instructions-description"
        className={cn(
          localeFontClass(locale),
          'max-h-[92vh] w-full max-w-lg animate-in overflow-y-auto rounded-t-3xl border border-[#E5F6FF] bg-white p-5 shadow-2xl fade-in duration-200 motion-reduce:animate-none dark:border-[#374151] dark:bg-[#1c1c1c] sm:rounded-3xl sm:p-6'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF8FF] text-[#2A4E63] dark:bg-[#05a9ff]/15 dark:text-[#38beff]"
              aria-hidden="true"
            >
              <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />
            </span>
            <h2
              id="bookmark-instructions-title"
              className="mt-2 text-[18px] font-bold leading-snug text-[#071016] dark:text-[#e0e0e0]"
            >
              {t('bookmark_modal_title')}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onClose('close')}
            aria-label={t('bookmark_close')}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#EAF8FF] hover:text-[#2A4E63] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/30 dark:text-[#9ca3af] dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-[#05a9ff]/40"
          >
            <CloseOutlinedIcon sx={{ fontSize: 20 }} aria-hidden="true" />
          </button>
        </div>

        <p
          id="bookmark-instructions-description"
          className="mt-3 max-w-prose text-[14px] leading-6 text-[#374151] dark:text-[#c7c7c7]"
        >
          {t('bookmark_modal_description')}
        </p>

        <p className="mt-2 text-[12px] leading-5 text-[#6b7280] dark:text-[#9ca3af]">
          {t('bookmark_detected', {
            device: t(`bookmark_platform_${deviceType}`),
            os: osLabel,
            browser: browserLabel,
          })}
        </p>

        <div className="mt-5 rounded-2xl border border-[#E5F6FF] bg-[#F7FCFF] p-4 dark:border-[#374151] dark:bg-[#242424]">
          <p className="text-[12px] font-semibold text-[#2A4E63] dark:text-[#9ed9ff]">
            {t('bookmark_manual_instructions')}
          </p>

          <fieldset className="mt-2">
            <legend className="text-[12px] text-[#4b5563] dark:text-[#bdbdbd]">
              {t('bookmark_platform_select')}
            </legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {DEVICE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDeviceChange(option)}
                  aria-pressed={deviceType === option}
                  className={cn(
                    'inline-flex min-h-10 items-center rounded-lg border px-3.5 text-[14px] font-semibold transition',
                    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/30 dark:focus-visible:ring-[#05a9ff]/40',
                    deviceType === option
                      ? 'border-[#2A4E63] bg-[#2A4E63] text-white dark:border-[#05a9ff] dark:bg-[#05a9ff] dark:text-[#16394a]'
                      : 'border-[#c9e6f5] bg-white text-[#2A4E63] hover:bg-[#EAF8FF] dark:border-[#4b5563] dark:bg-[#1c1c1c] dark:text-[#c7c7c7] dark:hover:bg-[#2d2d2d]'
                  )}
                >
                  {t(`bookmark_platform_${option}`)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[12px] text-[#4b5563] dark:text-[#bdbdbd]">
                {t('bookmark_os_label')}
              </span>
              <select
                value={os}
                onChange={(event) => handleOsChange(event.target.value as OperatingSystem)}
                className="mt-1 h-11 w-full rounded-lg border border-[#c9e6f5] bg-white px-3 text-[14px] text-[#071016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:border-[#4b5563] dark:bg-[#1c1c1c] dark:text-[#e0e0e0] dark:focus-visible:ring-[#05a9ff]"
              >
                {OS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {OPERATING_SYSTEM_LABELS[option] ?? t('bookmark_platform_other')}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[12px] text-[#4b5563] dark:text-[#bdbdbd]">
                {t('bookmark_browser_label')}
              </span>
              <select
                value={browser}
                onChange={(event) => setBrowser(event.target.value as BrowserId)}
                className="mt-1 h-11 w-full rounded-lg border border-[#c9e6f5] bg-white px-3 text-[14px] text-[#071016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:border-[#4b5563] dark:bg-[#1c1c1c] dark:text-[#e0e0e0] dark:focus-visible:ring-[#05a9ff]"
              >
                {BROWSER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {BROWSER_LABELS[option] ?? t('bookmark_platform_other')}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <ol className="mt-5 space-y-3">
          {plan.steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#2A4E63] text-[12px] font-semibold text-white dark:bg-[#05a9ff] dark:text-[#16394a]"
              >
                {index + 1}
              </span>
              <p className="text-[14px] leading-6 text-[#374151] dark:text-[#c7c7c7]">
                {step === 'press_shortcut' && plan.shortcut
                  ? renderShortcutStep(plan.shortcut)
                  : stepText(step)}
              </p>
            </li>
          ))}
        </ol>

        {/* With a known desktop OS the OS hint already explains the shortcut,
            so the generic desktop summary would only repeat it. */}
        {plan.noteKey && !plan.osHintKey ? (
          <p className="mt-3 max-w-prose text-[14px] leading-6 text-[#4b5563] dark:text-[#bdbdbd]">
            {t(plan.noteKey, { shortcut: plan.shortcut ?? '', browser: browserLabel })}
          </p>
        ) : null}

        {plan.osHintKey ? (
          <p className="mt-3 max-w-prose text-[14px] leading-6 text-[#4b5563] dark:text-[#bdbdbd]">
            {t(plan.osHintKey)}
          </p>
        ) : null}

        {plan.menuAlternative ? (
          <p className="mt-2 max-w-prose text-[14px] leading-6 text-[#4b5563] dark:text-[#bdbdbd]">
            {t('bookmark_step_menu_alternative', { menu: t('bookmark_browser_menu') })}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => onClose('close')}
            className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[14px] font-medium text-[#6b7280] transition hover:bg-[#EAF8FF] hover:text-[#2A4E63] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/20 dark:text-[#9ca3af] dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:ring-[#05a9ff]/30"
          >
            {t('bookmark_close')}
          </button>
          <button
            type="button"
            onClick={handleMarkedDone}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2A4E63] px-5 text-[14px] font-semibold text-white transition hover:bg-[#1f3b4c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/30 dark:bg-[#05a9ff] dark:text-[#16394a] dark:hover:bg-[#38beff] dark:focus-visible:ring-[#05a9ff]/40"
          >
            {t('bookmark_marked_done')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
