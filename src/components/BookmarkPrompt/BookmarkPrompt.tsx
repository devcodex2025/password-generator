'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bookmark } from 'lucide-react';
import BookmarkInstructions from './BookmarkInstructions';
import {
  BOOKMARK_EVENTS,
  BOOKMARK_STORAGE_KEY,
  buildBookmarkEventParams,
  detectBraveBrowser,
  detectPlatform,
  dismissBookmarkPrompt,
  isBookmarkPromptHidden,
  readBookmarkState,
  trackBookmarkEvent,
} from './bookmarkUtils.mjs';
import type { CloseMethod, PlatformInfo } from './bookmarkTypes';

interface BookmarkPromptProps {
  /** Locale from the URL, used for analytics only (copy comes from i18next). */
  language: string;
  /** The prompt only becomes eligible once the generator produced a password. */
  active: boolean;
}

/**
 * Compact "Bookmark this tool" block rendered directly under the generator.
 *
 * - appears after the first successful password generation, never as a pop-up;
 * - a dismissal is stored in localStorage and respected for 180 days;
 * - opening the instructions is always a manual action;
 * - renders nothing on the server / before hydration, so there is no
 *   hydration mismatch and the generator is never blocked.
 */
export default function BookmarkPrompt({ language, active }: BookmarkPromptProps) {
  const { t } = useTranslation();
  const [detected, setDetected] = useState<PlatformInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const viewTrackedRef = useRef(false);

  // Device detection runs only in the browser: the server cannot know the
  // visitor's platform and guessing would cause a hydration mismatch.
  useEffect(() => {
    let cancelled = false;

    setDetected(
      detectPlatform({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints ?? 0,
        coarsePointer: window.matchMedia?.('(pointer: coarse)')?.matches === true,
        viewportWidth: window.innerWidth,
      })
    );

    // Brave hides behind a Chrome user agent and can only be asked directly.
    const braveNavigator = navigator as Navigator & {
      brave?: { isBrave?: () => Promise<boolean> };
    };
    void detectBraveBrowser(braveNavigator).then((isBrave) => {
      if (cancelled || !isBrave) return;
      setDetected((current) => (current ? { ...current, browser: 'brave' } : current));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Reveal on the next frame so the block never competes with the generator's
  // first paint, and only when the visitor has not dismissed it recently.
  useEffect(() => {
    if (!active || !detected) return;
    if (isBookmarkPromptHidden(readBookmarkState())) return;

    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [active, detected]);

  // Keep tabs consistent: dismissing in one tab hides the block in the others.
  useEffect(() => {
    if (!isVisible) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== BOOKMARK_STORAGE_KEY) return;
      if (isBookmarkPromptHidden(readBookmarkState())) setIsVisible(false);
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [isVisible]);

  // One impression per mount, with the detected platform attached.
  useEffect(() => {
    if (!isVisible || !detected || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    trackBookmarkEvent(BOOKMARK_EVENTS.promptView, buildBookmarkEventParams(detected, language));
  }, [isVisible, detected, language]);

  const handleDismiss = useCallback(() => {
    dismissBookmarkPrompt();
    setInstructionsOpen(false);
    setIsVisible(false);
    if (detected) {
      trackBookmarkEvent(BOOKMARK_EVENTS.promptDismiss, buildBookmarkEventParams(detected, language));
    }
  }, [detected, language]);

  const handleOpenInstructions = useCallback(() => {
    setInstructionsOpen(true);
    if (detected) {
      trackBookmarkEvent(BOOKMARK_EVENTS.promptClick, buildBookmarkEventParams(detected, language));
    }
  }, [detected, language]);

  const handleCloseInstructions = useCallback(
    (method: CloseMethod) => {
      setInstructionsOpen(false);

      if (method === 'marked_done') {
        // The visitor confirmed they saved the page themselves — we store that
        // acknowledgement and stop asking, without claiming a verified success.
        dismissBookmarkPrompt({ markedDone: true });
        setIsVisible(false);
        return;
      }

      if (detected) {
        trackBookmarkEvent(BOOKMARK_EVENTS.instructionsClose, {
          ...buildBookmarkEventParams(detected, language),
          close_method: method,
        });
      }
    },
    [detected, language]
  );

  if (!isVisible || !detected) return null;

  return (
    <>
      <section
        aria-labelledby="bookmark-prompt-title"
        className="mx-3 mb-4 mt-4 w-[calc(100%-1.5rem)] max-w-2xl animate-in self-center rounded-3xl border border-[#c9e6f5] bg-white p-4 fade-in shadow-sm duration-200 motion-reduce:animate-none dark:border-[#374151] dark:bg-[#1c1c1c] sm:p-5 lg:mb-0 lg:w-9/12 lg:max-w-none"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF8FF] text-[#2A4E63] dark:bg-[#05a9ff]/15 dark:text-[#38beff] sm:h-11 sm:w-11"
            aria-hidden="true"
          >
            <Bookmark className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-6">
            {/* 65ch caps the line length on wide desktop cards: the card is
                ~940px wide, so uncapped copy ran to ~113 characters per line. */}
            <div className="min-w-0 sm:max-w-prose">
              <h2
                id="bookmark-prompt-title"
                className="text-[16px] font-bold leading-snug text-[#071016] dark:text-[#e0e0e0] sm:text-[18px]"
              >
                {t('bookmark_title')}
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-[#374151] dark:text-[#c7c7c7]">
                {t('bookmark_description')}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0 sm:shrink-0">
              <button
                type="button"
                onClick={handleOpenInstructions}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2A4E63] px-5 text-[14px] font-semibold text-white transition hover:bg-[#1f3b4c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/30 dark:bg-[#05a9ff] dark:text-[#16394a] dark:hover:bg-[#38beff] dark:focus-visible:ring-[#05a9ff]/40"
              >
                {t('bookmark_cta')}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[14px] font-medium text-[#6b7280] transition hover:bg-[#EAF8FF] hover:text-[#2A4E63] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2A4E63]/20 dark:text-[#9ca3af] dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:ring-[#05a9ff]/30"
              >
                {t('bookmark_dismiss')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {instructionsOpen ? (
        <BookmarkInstructions locale={language} platform={detected} onClose={handleCloseInstructions} />
      ) : null}
    </>
  );
}
