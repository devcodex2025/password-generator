'use client';

// Shared by PasswordRow and BulkPasswords. Kept out of PasswordRow.tsx so that file only
// exports a component (React Fast Refresh falls back to a full reload otherwise).
import { useLayoutEffect, useState, type RefObject } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// How the actions render, from the width of the password field (px):
// 'menu' = copy + a "more" dropdown, 'icons' = three icons, 'labels' = three labelled buttons.
// Fixed widths, not measured text: a very long translation may need a bigger LABELS_MIN.
const ICONS_MIN = 400;
const LABELS_MIN = 760;
type Density = 'menu' | 'icons' | 'labels';

export function useDensity(ref: RefObject<HTMLElement | null>) {
  const [density, setDensity] = useState<Density>('menu'); // mobile first
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setDensity(width >= LABELS_MIN ? 'labels' : width >= ICONS_MIN ? 'icons' : 'menu');
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return density;
}

/** Share links for `text`. */
export function shareTargets(text: string, subject: string) {
  const body = encodeURIComponent(text);
  return [
    { key: 'telegram', label: 'Telegram', Icon: TelegramIcon, color: '#2AABEE', href: `https://t.me/share/url?url=${body}` },
    { key: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon, color: '#25D366', href: `https://wa.me/?text=${body}` },
    { key: 'email', label: 'Email', Icon: EmailIcon, color: '#EA4335', href: `mailto:?subject=${encodeURIComponent(subject)}&body=${body}` },
  ];
}

export const menuPaperSx = (isDarkMode: boolean) => ({
  mt: 1,
  borderRadius: '16px',
  bgcolor: isDarkMode ? '#2d2d2d' : '#E5F6FF',
  color: isDarkMode ? '#ffffff' : '#2A4E63',
  minWidth: 200,
});
