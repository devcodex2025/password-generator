'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingProgress } from '@/components/ui/LoadingProgress';

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

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with system preference if available, otherwise default to light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (window.localStorage.getItem('darkMode') !== null) {
      return JSON.parse(window.localStorage.getItem('darkMode') || 'false');
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const initializeTheme = () => {
      if (typeof window === "undefined") return;

      // Apply theme class based on state
      if (isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      // Save to localStorage
      window.localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

      // Set initialized after a short delay to ensure smooth loading
      timeout = setTimeout(() => {
        setIsInitialized(true);
      }, 400);
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery?.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      if (timeout) clearTimeout(timeout);
      document.body.classList.remove('dark');
      mediaQuery?.removeEventListener('change', handleChange);
    };
  }, [isDarkMode]);

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
    if (!isInitialized) return;

    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const root = document.body;
      
      // Remove theme class first to prevent mixing
      root.classList.remove('dark');
      
      // Add dark class if needed
      if (isDarkMode) {
        root.classList.add('dark');
      }

      // Save to localStorage
      window.localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, isInitialized]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode, isInitialized }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {isInitialized ? children : <LoadingProgress />}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
