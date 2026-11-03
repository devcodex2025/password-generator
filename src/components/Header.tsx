'use client';

import { useState, useEffect, useContext, useRef, Fragment, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext';
import { getLanguagesWithFlags, getLanguageSelectionText, getThemeText } from '../utils/languageUtils';
import type { SelectChangeEvent } from '@mui/material/Select';
import { getAvailableLanguages } from '../utils/languageUtils';
import { getLinkLabel, type LinkLabelKey } from '@/utils/linkTranslations';
import { startNavigationLoading } from '@/lib/navigation-events';

/* ── Lazy-loaded heavy dependencies (perf: saves ~1.4 MB from initial bundle) ── */
const Drawer = lazy(() => import('@mui/material/Drawer'));
const List = lazy(() => import('@mui/material/List'));
const ListItem = lazy(() => import('@mui/material/ListItem'));
const Box = lazy(() => import('@mui/material/Box'));
const Select = lazy(() => import('@mui/material/Select'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));
const IconButton = lazy(() => import('@mui/material/IconButton'));
const Flag = lazy(() => import('react-world-flags'));

/* Theme icons are tiny — importing them directly avoids an empty Suspense
   fallback that left a blank control in the header on first paint. */
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

const Header = ({ onLanguageChange, currentLanguage }: HeaderProps) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isHomePage = pathname === '/' || /^\/[^/]+\/?$/.test(pathname || '');
  const availableLanguages = getAvailableLanguages();
  const [language, setLanguage] = useState<string>(() => {
    const pathSegments = typeof window !== 'undefined' ? window.location.pathname.split('/') : [''];
    const languageFromURL = pathSegments[1];
    if (availableLanguages.includes(languageFromURL)) {
      return languageFromURL;
    }

    return availableLanguages.includes(currentLanguage) ? currentLanguage : 'en';
  });

  // Explicit locale: sub-pages render the header without changing the i18next
  // language first, so `t()` alone could return English labels there.
  const a11y = (key: string) => t(key, { lng: language });

  const localePrefix = `/${language}`;
  const homeHref = language === 'en' ? '/' : localePrefix;
  /* Keep only the primary pages in the header so each gets more internal
     weight. Legal/contact pages already live in the footer. */
  const navItemDefinitions: Array<{ labelKey: LinkLabelKey; href: string }> = [
    { labelKey: 'generator', href: homeHref },
    { labelKey: 'guides', href: `${localePrefix}/guides` },
    { labelKey: 'bestManagers', href: `${localePrefix}/best-password-managers-2026` },
    { labelKey: 'vpn', href: `${localePrefix}/guides/vpn-security-privacy-guide` },
  ];
  const navItems = navItemDefinitions.map((item) => ({
    ...item,
    label: getLinkLabel(item.labelKey, language),
  }));

  useEffect(() => {
    if (currentLanguage !== language) {
      setLanguage(currentLanguage);
    }
  }, [currentLanguage, language]);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value;
    if (lang === language) {
      return;
    }
    // Locale switches go through the router, not an <a> click, so start the
    // shared overlay explicitly before the new route begins loading.
    startNavigationLoading(lang);
    setLanguage(lang);
    onLanguageChange(lang);
  };

  const { isDarkMode, toggleMode } = useContext(ThemeContext); // Use toggleMode

  // Get available languages

  const languages = (() => {
    const all = getLanguagesWithFlags();
    const english = all.find((langItem) => langItem.value === 'en');
    if (!english) return all;
    return [english, ...all.filter((langItem) => langItem.value !== 'en')];
  })();

  const [state, setState] = useState<Record<Anchor, boolean>>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  /* Track whether the drawer has ever been opened so we can lazy-mount it
     on first open but keep it in the DOM afterward for MUI's closing animation */
  const hasOpenedDrawer = useRef(false);

  useEffect(() => {
    const isAnyDrawerOpen = Object.values(state).some((open) => open);
    if (isAnyDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'auto';
        document.body.style.overflowY = 'auto';
      };
    }
  }, [state]);
  type Anchor = 'left' | 'right' | 'top' | 'bottom';
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        if (open) hasOpenedDrawer.current = true;
        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }}
      role="presentation"
    >
      <List sx={{ px: 2 }}>
        <ListItem>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-[#38beff]"
              >
                {item.label}
              </Link>
            ))}
          </Box>
        </ListItem>
        {/* Language Selector */}
        <ListItem
          sx={
            isHomePage
              ? undefined
              : {
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(229, 246, 255, 0.7)',
                  },
                }
          }
        >
          <Box sx={{ width: '100%' }}>
            {/* A single visible label and one control: the old InputLabel +
                floating-label Select rendered the caption twice and left the
                select without an accessible name. */}
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              {getLanguageSelectionText(language)}
            </span>
            <Select
              value={language}
              onChange={handleLanguageChange as (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void}
              aria-label={a11y('a11y_language')}
              sx={{ width: '100%', minHeight: 44 }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="flag-container flex align-center"
                      style={{ marginRight: 8 }}
                    >
                      <Flag code={lang.flagCode} width={32} />
                    </span>
                    <span>{lang.label}</span>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </ListItem>

        {/* Theme Toggle */}
        <ListItem
          sx={
            isHomePage
              ? undefined
              : {
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(229, 246, 255, 0.7)',
                  },
                }
          }
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: isDarkMode ? '#e0e0e0' : 'black',
              }}
            >
              {getThemeText(language)}
            </span>
            <IconButton
              onClick={toggleMode}
              color="inherit"
              aria-label={isDarkMode ? a11y('a11y_theme_light') : a11y('a11y_theme_dark')}
              sx={{
                width: 44,
                height: 44,
                color: isDarkMode ? '#9ca3af' : '#071016',
                '&:hover': {
                  color: isDarkMode ? '#d7f2ff' : '#2A4E63',
                  backgroundColor: isDarkMode ? 'rgba(155, 223, 255, 0.12)' : 'rgba(42, 78, 99, 0.08)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className="py-4 lg:py-5 px-2 flex justify-between items-center w-full">
      <div className="flex items-center">
        {isHomePage ? (
          <div className="inline-flex">
            <Image
              src="/images/logo.svg"
              alt="Generate Password To Me - Secure Password Generator Logo"
              className="w-auto mr-2 logo shrink-0 object-contain"
              priority
              decoding="async"
              width={405}
              height={92}
            />
          </div>
        ) : (
          <Link
            href={homeHref}
            aria-label={a11y('a11y_go_home')}
            className="logo-link inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          >
            <Image
              src="/images/logo.svg"
              alt="Generate Password To Me - Secure Password Generator Logo"
              className="w-auto mr-2 logo shrink-0 object-contain"
              priority
              decoding="async"
              width={405}
              height={92}
            />
          </Link>
        )}
      </div>
      <ul className="lg:flex flex-1 justify-start items-center hidden gap-3 pl-4 xl:gap-5 xl:pl-8 whitespace-nowrap text-[#071016] text-sm font-medium">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-6 items-center py-1 text-slate-700 transition-all duration-200 hover:text-sky-600 dark:text-slate-200 dark:hover:text-[#38beff]"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="ml-auto pl-4 xl:pl-8">
          <Suspense fallback={<span className="w-10 h-10 inline-block" />}>
            <IconButton
              onClick={toggleMode}
              color="inherit"
              aria-label={isDarkMode ? a11y('a11y_theme_light') : a11y('a11y_theme_dark')}
              className={
                isHomePage
                  ? 'transition-all duration-300 hover:scale-105'
                  : 'rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#E5F6FF] dark:hover:bg-[#111827]'
              }
              sx={{
                width: 44,
                height: 44,
                color: isDarkMode ? '#9ca3af' : '#071016',
                '&:hover': {
                  color: isDarkMode ? '#d7f2ff' : '#2A4E63',
                  backgroundColor: isDarkMode ? 'rgba(155, 223, 255, 0.12)' : 'rgba(42, 78, 99, 0.08)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Suspense>
        </li>
      </ul>
      <label htmlFor="eng" className="sr-only">{a11y('a11y_language')}</label>
      <select
        name="Language"
        value={language}
        onChange={(e) =>
          handleLanguageChange({ target: { value: e.target.value } } as SelectChangeEvent)
        }
        id="eng"
        className={`language-select py-3 lg:flex hidden px-4 lg:ml-5 justify-center border-2 border-[#2A4E63] rounded-[60px] bg-transparent w-auto  ${isHomePage ? '' : 'hover:bg-[#E5F6FF] dark:hover:bg-[#111827] hover:border-[#1a3a4a]'}`}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="flex items-center lg:hidden">
        {(['top'] as Anchor[]).map((anchor) => (
          <Fragment key={anchor}>
            <button
              type="button"
              onClick={toggleDrawer(anchor, true)}
              aria-label={a11y('a11y_nav_menu')}
              aria-expanded={state[anchor]}
              aria-haspopup="dialog"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#E5F6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A4E63] dark:hover:bg-white/10 dark:focus-visible:ring-[#05a9ff]"
            >
              <Image
                src="/images/hamburger.png"
                alt=""
                aria-hidden="true"
                className={`h-[18px] w-6 object-contain${isDarkMode ? ' hamburger-dark' : ''}`}
                loading="eager"
                decoding="async"
                width={24}
                height={18}
              />
            </button>
            {/* Lazy-mount on first open; keep mounted so MUI animates close */}
            {(state[anchor] || hasOpenedDrawer.current) && (
              <Suspense fallback={null}>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  sx={{
                    '& .MuiDrawer-paper': {
                      width: { xs: '100vw' },
                      maxWidth: { xs: '100vw' },
                      boxSizing: 'border-box',
                    },
                  }}
                >
                  {list(anchor)}
                </Drawer>
              </Suspense>
            )}
          </Fragment>
        ))}
      </div>

    </header>
  );
};

export default Header;
