'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAVIGATION_START_EVENT } from '@/lib/navigation-events';

const MIN_LOCALE_VISIBLE_MS = 500;
const WATCHDOG_MS = 15000;

export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [navigated, setNavigated] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<string | null>(null);
  const shownAtRef = useRef(0);
  const minVisibleRef = useRef(0);
  const watchdogRef = useRef<number | null>(null);
  const isFirstPathRef = useRef(true);

  const locale = pathname?.split('/').filter(Boolean)[0] || 'en';
  const displayLocale = pendingLocale || locale;
  const loadingLabel: Record<string, string> = {
    en: 'Loading...',
    ua: 'Завантаження...',
    es: 'Cargando...',
    fr: 'Chargement...',
    de: 'Wird geladen...',
    it: 'Caricamento...',
    pt: 'Carregando...',
    ru: 'Загрузка...',
    zh: '加载中...',
    ja: '読み込み中...',
    pl: 'Ładowanie...',
  };
  const loadingText = loadingLabel[displayLocale] || loadingLabel.en;

  const beginLoading = useCallback((localeHint?: string, minVisibleMs = 0) => {
    shownAtRef.current = Date.now();
    minVisibleRef.current = minVisibleMs;
    setPendingLocale(localeHint ?? null);
    setNavigated(false);
    setActive(true);

    if (watchdogRef.current) {
      window.clearTimeout(watchdogRef.current);
    }
    // Do not leave a blocking overlay behind if a navigation is cancelled.
    watchdogRef.current = window.setTimeout(() => {
      setActive(false);
      setNavigated(false);
      setPendingLocale(null);
    }, WATCHDOG_MS);
  }, []);

  useEffect(() => {
    const onNavigationStart = (event: Event) => {
      const detail = (event as CustomEvent<{ locale?: string }>).detail;
      // Locale switches need a visible beat so the language change registers.
      beginLoading(detail?.locale, MIN_LOCALE_VISIBLE_MS);
    };

    window.addEventListener(NAVIGATION_START_EVENT, onNavigationStart);
    return () => {
      window.removeEventListener(NAVIGATION_START_EVENT, onNavigationStart);
      if (watchdogRef.current) {
        window.clearTimeout(watchdogRef.current);
      }
    };
  }, [beginLoading]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (anchor.target && anchor.target !== '_self') return;
      // a file download (e.g. a same-origin blob: URL) never changes the route
      if (anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${destination.pathname}${destination.search}`;
      if (current === next) return;

      beginLoading();
    };

    document.addEventListener('click', onPointerDown, { capture: true });
    return () => {
      document.removeEventListener('click', onPointerDown, { capture: true });
    };
  }, [beginLoading]);

  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }
    setNavigated(true);
  }, [pathname]);

  // Keep the spinner up until the next route has rendered. Locale switches also
  // enforce a short minimum so the language change does not flash by unseen.
  useEffect(() => {
    if (!active || !navigated) return;

    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, minVisibleRef.current - elapsed);
    const timer = window.setTimeout(() => {
      setActive(false);
      setNavigated(false);
      setPendingLocale(null);
      if (watchdogRef.current) {
        window.clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [active, navigated]);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={loadingText}
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/20"
    >
      <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-lg dark:bg-[#1c1c1c]/90">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-[#2A4E63] border-r-transparent" />
        <span className="text-sm font-medium !text-[#2A4E63] dark:!text-[#d7f2ff]">{loadingText}</span>
      </div>
    </div>
  );
}
