'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { browserThemeColor } from '@/lib/browser-theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleMode: () => void;
  isInitialized: boolean;
}

const defaultContextValue: ThemeContextType = {
  isDarkMode: false,
  toggleMode: () => { },
  isInitialized: false,
};
export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/* One theme for both modes. Every mode-dependent colour is a CSS variable that
   `.dark` redefines, so switching the class repaints in a single frame instead
   of rebuilding the MUI theme (which cost 200–300 ms and a second paint wave).

   Two palette entries must stay literal colours even though the page paints
   from variables: MUI parses them at render time and its helpers only accept
   hex/rgb/hsl. SnackbarContent calls emphasize(palette.background.default) and
   Button calls alpha(palette.text.primary) for its hover state; passing var()
   there throws "MUI: Unsupported `var(--…)` color" and unmounts the tree.
   `.dark body` and the `.dark .Mui*` rules in index.css repaint both in dark
   mode, so the literal values below never reach the screen as light colours. */
const theme = createTheme({
  palette: {
    primary: {
      main: '#2A4E63',
    },
    secondary: {
      main: '#E5F6FF',
    },
    background: {
      default: '#ffffff',
      paper: 'var(--surface-2)',
    },
    text: {
      primary: '#071016',
      secondary: 'var(--text-2)',
    },
    divider: 'var(--border-1)',
  },
});

/* Long enough to cover the frame(s) painted between the class change and the
   removal of the transition guard, short enough to be invisible. */
const THEME_SWITCH_MS = 120;

/* The address bar is part of the theme: a stored choice can disagree with the
   OS preference, so the meta tag is updated from the resolved theme, not from
   a prefers-color-scheme media query. */
function syncBrowserTheme(isDark: boolean) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = browserThemeColor(isDark);
}

/* Keeps the pre-paint class and browser chrome in sync without touching
   storage, used on mount and for OS-level preference changes. */
function setDocumentDark(isDark: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDark);
  syncBrowserTheme(isDark);
}

/**
 * Applies a stored user choice: class, storage and cookie change in the same
 * task as the click, so the next paint is already the final one.
 */
function applyTheme(isDark: boolean) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const root = document.documentElement;
  // Colour transitions would otherwise fade background and text at different
  // speeds, producing frames with ~1:1 contrast. Hover/motion transitions are
  // untouched outside this short window.
  root.classList.add('theme-switching');
  setDocumentDark(isDark);

  try {
    window.localStorage.setItem('darkMode', JSON.stringify(isDark));
  } catch {
    // Storage can be blocked (private mode, quotas); the class change still works.
  }
  document.cookie = `theme=${isDark ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`;

  window.setTimeout(() => root.classList.remove('theme-switching'), THEME_SWITCH_MS);
}

function readStoredDarkMode(): boolean | null {
  try {
    const saved = window.localStorage.getItem('darkMode');
    return saved === null ? null : JSON.parse(saved);
  } catch {
    return null;
  }
}

/* `useLayoutEffect` on the client so a remounted root layout (client-side locale
   switch) gets its theme class before the browser paints; rendering on the
   server has no layout phase, hence the fallback. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const CustomThemeProvider = ({
  children,
  initialDarkMode = false,
}: {
  children: React.ReactNode;
  initialDarkMode?: boolean;
}) => {
  // Keep first client render equal to server render to avoid hydration mismatch.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const [isInitialized, setIsInitialized] = useState(false);

  // The `<html class="dark">` element is set by the inline script in layout.tsx,
  // so the DOM is the source of truth here; reading it avoids a stale state and
  // keeps the class change synchronous with the click.
  const toggleMode = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    applyTheme(next);
    setIsDarkMode(next);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = readStoredDarkMode();
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    const resolved = saved !== null ? saved : mediaQuery?.matches || false;

    // On a cold load the pre-paint script already applied the class (no-op here).
    // A client-side locale switch re-creates the root layout and with it the
    // <html> element, so the class has to be re-asserted; otherwise the CSS
    // goes light while the JS-driven colours stay dark (half-themed page).
    setDocumentDark(resolved);
    setIsDarkMode(resolved);
    setIsInitialized(true);

    const handleChange = (e: MediaQueryListEvent) => {
      if (readStoredDarkMode() !== null) return;
      setDocumentDark(e.matches);
      setIsDarkMode(e.matches);
    };

    mediaQuery?.addEventListener('change', handleChange);
    return () => {
      mediaQuery?.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode, isInitialized }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
