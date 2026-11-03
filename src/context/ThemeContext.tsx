'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
   Only surface/text/border go through variables: MUI derives other palette
   entries with lighten()/darken()/alpha(), which cannot read var(). */
const theme = createTheme({
  palette: {
    primary: {
      main: '#2A4E63',
    },
    secondary: {
      main: '#E5F6FF',
    },
    background: {
      default: 'var(--surface-1)',
      paper: 'var(--surface-2)',
    },
    text: {
      primary: 'var(--text-1)',
      secondary: 'var(--text-2)',
    },
    divider: 'var(--border-1)',
  },
});

/* Long enough to cover the frame(s) painted between the class change and the
   removal of the transition guard, short enough to be invisible. */
const THEME_SWITCH_MS = 120;

/* Keeps the pre-paint class in sync without touching storage — used on mount and
   for OS-level preference changes. */
function setDocumentDark(isDark: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDark);
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
    // <html> element, so the class has to be re-asserted — otherwise the CSS
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
