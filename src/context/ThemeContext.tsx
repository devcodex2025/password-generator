'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
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

  const toggleMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem('darkMode');
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    } else {
      setIsDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches || false);
    }

    setIsInitialized(true);

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
      }
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

  useEffect(() => {
    if (!isInitialized || typeof document === 'undefined' || typeof window === 'undefined') return;

    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`;
  }, [isDarkMode, isInitialized]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode, isInitialized }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
