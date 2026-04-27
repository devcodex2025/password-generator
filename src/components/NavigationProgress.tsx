'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const locale = pathname?.split('/').filter(Boolean)[0] || 'en';
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
  const loadingText = loadingLabel[locale] || loadingLabel.en;

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

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${destination.pathname}${destination.search}`;
      if (current === next) return;

      setActive(true);
    };

    document.addEventListener('click', onPointerDown, { capture: true });
    return () => {
      document.removeEventListener('click', onPointerDown, { capture: true });
    };
  }, []);

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[9999] grid place-items-center bg-black/20 backdrop-blur-[1px]">
      <div className="flex items-center gap-3 rounded-full bg-white/90 dark:bg-[#1c1c1c]/90 px-4 py-2 shadow-lg">
        <span className="inline-block h-5 w-5 rounded-full border-[3px] border-[#2A4E63] border-r-transparent animate-spin" />
        <span className="text-sm font-medium !text-[#2A4E63] dark:!text-[#d7f2ff]">{loadingText}</span>
      </div>
    </div>
  );
}
