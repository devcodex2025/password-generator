'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

/* The `dark` class lives on <html> only: it is set before the first paint by the
   inline script in layout.tsx, so every theme change has to go through the same
   root element to keep `.dark body` and `.dark *` selectors in sync. */
function applyTheme(isDark: boolean) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  document.documentElement.classList.toggle('dark', isDark);

  try {
    window.localStorage.setItem('darkMode', JSON.stringify(isDark));
  } catch {
    // Storage can be blocked (private mode, quotas); the class change still works.
  }
  document.cookie = `theme=${isDark ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`;
}

function readStoredDarkMode(): boolean | null {
  try {
    const saved = window.localStorage.getItem('darkMode');
    return saved === null ? null : JSON.parse(saved);
  } catch {
    return null;
  }
}

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

  // The class is toggled in the click handler instead of an effect so it lands
  // in the same frame as the click.
  const toggleMode = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    applyTheme(next);
    setIsDarkMode(next);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // <html class="dark"> is already correct: the pre-paint script in layout.tsx
    // has applied the stored/system preference. This effect only mirrors it into
    // React state, it must not repaint the document.
    const saved = readStoredDarkMode();
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    setIsDarkMode(saved !== null ? saved : mediaQuery?.matches || false);
    setIsInitialized(true);

    const handleChange = (e: MediaQueryListEvent) => {
      if (readStoredDarkMode() !== null) return;
      applyTheme(e.matches);
      setIsDarkMode(e.matches);
    };

    mediaQuery?.addEventListener('change', handleChange);
    return () => {
      mediaQuery?.removeEventListener('change', handleChange);
    };
  }, []);

  const theme = useMemo(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#2A4E63',
        },
        secondary: {
          main: '#E5F6FF',
        },
        background: {
          default: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          paper: mode === 'dark' ? '#2d2d2d' : '#ffffff',
        },
        text: {
          primary: mode === 'dark' ? '#e0e0e0' : '#071016',
          secondary: mode === 'dark' ? '#b0b0b0' : '#2A4E63',
        },
      },
    });
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode, isInitialized }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
