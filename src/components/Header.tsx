'use client';

import { useState, useEffect, useContext, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Flag from 'react-world-flags'
import { Brightness4, Brightness7 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext'; // Updated path
import { getLanguagesWithFlags, getLanguageSelectionText, getThemeText } from '../utils/languageUtils';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAvailableLanguages } from '../utils/languageUtils'; // Ensure this utility function is defined


// CSS styles for animation
const languageIconStyles = `
  .language-flag {
    transition: all 0.3s ease;
    transform: scale(1);
  }
  
  .language-flag:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .language-select {
    transition: all 0.3s ease;
    transform: scale(1);
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232A4E63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
  }
  
  .language-select:hover {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a3a4a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(42, 78, 99, 0.3);
  }
  
  .language-select:focus {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(42, 78, 99, 0.4);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a3a4a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,15 12,9 18,15'%3e%3c/polyline%3e%3c/svg%3e");
  }
  
  .flag-container {
    transition: all 0.3s ease;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .flag-container:hover {
    transform: rotate(5deg) scale(1.1);
  }
  
  .language-change-animation {
    animation: languagePulse 0.6s ease-in-out;
  }
  
  .language-select.language-change-animation {
    animation: languagePulse 0.6s ease-in-out;
  }
  
  @keyframes languagePulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  
  .flag-container.language-change-animation {
    animation: flagRotate 0.6s ease-in-out;
  }
  
  @keyframes flagRotate {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.2); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
`;

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

const Header = ({ onLanguageChange, currentLanguage }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = /^\/[^/]+\/?$/.test(pathname || '');
  const availableLanguages = getAvailableLanguages();
  const [language, setLanguage] = useState<string>(() => {
    const pathSegments = typeof window !== 'undefined' ? window.location.pathname.split('/') : [''];
    const languageFromURL = pathSegments[1];
    if (availableLanguages.includes(languageFromURL)) {
      return languageFromURL;
    }

    const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
    const languageCode = browserLanguage.split(/[-_]/)[0];
    const mappedLanguageCode = languageCode === 'uk' ? 'ua' : languageCode;

    return availableLanguages.includes(mappedLanguageCode) ? mappedLanguageCode : 'en';
  });

  // Перевіряємо, чи маршрут є кореневим (/), і перенаправляємо
  useEffect(() => {
    const pathSegments = typeof window !== 'undefined' ? window.location.pathname.split('/') : [''];
    const isRootPath = pathSegments[1] === '' || pathSegments[1] === undefined;

    if (isRootPath) {
      const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.split(/[-_]/)[0] : 'en';
      const mappedLanguageCode = browserLanguage === 'uk' ? 'ua' : browserLanguage;
      const defaultLanguage = availableLanguages.includes(mappedLanguageCode) ? mappedLanguageCode : 'en';
      onLanguageChange(defaultLanguage); // Викликаємо onLanguageChange для перенаправлення
    } else if (currentLanguage !== language) {
      setLanguage(currentLanguage); // Синхронізуємо з пропсом
    }
  }, [currentLanguage, onLanguageChange, language, availableLanguages]);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value;
    setLanguage(lang);
    onLanguageChange(lang);
  };


  const { isDarkMode, toggleMode } = useContext(ThemeContext); // Use toggleMode

  // Get available languages

  const languages = getLanguagesWithFlags();

  const [isAnimating] = useState(false);

  // Add CSS styles for animation
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = languageIconStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Add styles for hamburger-dark
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .hamburger-dark {
        filter: invert(1) brightness(2) grayscale(1);
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Add styles for select.language-select in dark mode
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .dark .language-select {
        background-color: #121212 !important;
        color: #fff !important;
        border-color: #2A4E63 !important;
      }
      .dark .language-select option {
        background-color: #121212 !important;
        color: #fff !important;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const lang = event.target.value;
  //   setIsAnimating(true);
  //   setTimeout(() => setIsAnimating(false), 600);
  //   if (lang !== language) {
  //     onLanguageChange(lang); // основний контроль мови тут
  //   }
  // };

  const [state, setState] = useState<Record<Anchor, boolean>>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }}
      role="presentation"
    >
      <List sx={{ px: 2 }}>
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
          <InputLabel id="language-select-label" sx={{ width: '100%' }}>
            {getLanguageSelectionText(language)}
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            sx={{ width: '100%' }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    className={`flag-container flex align-center ${isAnimating ? 'language-change-animation' : ''
                      }`}
                    style={{ marginRight: 8 }}
                  >
                    <Flag code={lang.flagCode} width={32} />
                  </span>
                  <span>{lang.label}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
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
              sx={{
                color: isDarkMode ? '#9ca3af' : '#071016',
                '&:hover': {
                  color: isDarkMode ? '#9bdfff' : '#2A4E63',
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
              className="w-[50%] h-6 mr-1 logo"
              priority
              decoding="async"
              width={24}
              height={24}
            />
          </div>
        ) : (
          <Link
            href={`/${language}`}
            aria-label="Go to homepage"
            className="logo-link inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          >
            <Image
              src="/images/logo.svg"
              alt="Generate Password To Me - Secure Password Generator Logo"
              className="w-[50%] h-6 mr-1 logo"
              priority
              decoding="async"
              width={24}
              height={24}
            />
          </Link>
        )}
      </div>
      <ul className="lg:flex justify-end w-[55%] items-center hidden text-decoration-none gap-5 text-[#071016] text-xl font-medium">
        <li>
          <IconButton
            onClick={toggleMode} // Use toggleMode
            color="inherit"
            className={
              isHomePage
                ? 'transition-all duration-300 hover:scale-105'
                : 'rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#E5F6FF] dark:hover:bg-[#111827]'
            }
            sx={{
              color: isDarkMode ? '#9ca3af' : '#071016',
              '&:hover': {
                color: isDarkMode ? '#9bdfff' : '#2A4E63',
                backgroundColor: isDarkMode ? 'rgba(155, 223, 255, 0.12)' : 'rgba(42, 78, 99, 0.08)',
                transform: 'scale(1.05)',
              },
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </li>
      </ul>
      <select
        name="Language"
        value={language}
        onChange={(e) =>
          handleLanguageChange({ target: { value: e.target.value } } as SelectChangeEvent)
        }
        id="eng"
        className={`language-select py-3 lg:flex hidden px-4 justify-center border-2 border-[#2A4E63] rounded-[60px] bg-transparent w-auto ${isAnimating ? 'language-change-animation' : ''} ${isHomePage ? '' : 'hover:bg-[#E5F6FF] dark:hover:bg-[#111827] hover:border-[#1a3a4a]'}`}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="flex lg:hidden">
        {(['top'] as Anchor[]).map((anchor) => (
          <Fragment key={anchor}>
            <Image
              src="/images/hamburger.png"
              alt="Navigation menu toggle"
              onClick={toggleDrawer(anchor, true)}
              className={`cursor-pointer transition-all duration-200 ${isHomePage ? '' : 'hover:scale-110'}${isDarkMode ? ' hamburger-dark' : ''}`}
              loading="eager"
              decoding="async"
              width={24}
              height={24}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDrawer(anchor, true)(e);
                }
              }}
            />
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
          </Fragment>
        ))}
      </div>

    </header>
  );
};

export default Header;
