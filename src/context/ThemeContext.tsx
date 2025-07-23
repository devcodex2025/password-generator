'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleMode: () => void;
}

const defaultContextValue: ThemeContextType = {
  isDarkMode: false,
  toggleMode: () => {},
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
  const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Перевірка на клієнтське середовище
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined" && typeof window.matchMedia !== "undefined") {
      const saved = window.localStorage.getItem('darkMode');
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
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
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
