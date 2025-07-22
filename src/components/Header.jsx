import React, { createContext, useState, useEffect, useContext } from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Flag from 'react-world-flags';
import { useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { ThemeContext } from '../context/ThemeContext';
import lang from '../lang.json';
import { getLanguagesWithFlags, getLanguageSelectionText, getThemeText, getAvailableLanguages } from '../utils/languageUtils';

// Додаємо CSS стилі для анімації
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
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .flag-container.language-change-animation {
    animation: flagRotate 0.6s ease-in-out;
  }
  
  @keyframes flagRotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  
  /* Стилі для всіх посилань */
  a {
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
  }
  
  a:hover {
    color: #2A4E63;
    transform: translateY(-2px);
  }
  
  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #2A4E63;
    transition: width 0.3s ease;
  }
  
  a:hover::after {
    width: 100%;
  }
  
  /* Спеціальні стилі для посилань в навігації */
  .nav-link {
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }
  
  .nav-link:hover {
    color: #2A4E63;
    transform: scale(1.05);
  }
  
  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(42, 78, 99, 0.1);
    border-radius: 4px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .nav-link:hover::before {
    transform: scaleX(1);
  }
  
  /* Стилі для зовнішніх посилань */
  .external-link {
    transition: all 0.3s ease;
    position: relative;
  }
  
  .external-link:hover {
    color: #05a9ff;
    transform: translateY(-1px);
    text-shadow: 0 2px 4px rgba(5, 169, 255, 0.3);
  }
  
  .external-link::after {
    content: ' ↗';
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .external-link:hover::after {
    opacity: 1;
  }
`;

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const menuItems = [
  {
    label: (language) => t('menu_aboutus', language),
    href: '#aboutus',
  },
  {
    label: (language) => t('menu_howtouse', language),
    href: '#howtouse',
  },
  {
    label: (language) => t('menu_guide', language),
    href: '#guide',
  },
];

const Header = ({ onLanguageChange }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  // Отримуємо доступні мови автоматично
  const availableLanguages = getAvailableLanguages();
  const languages = getLanguagesWithFlags();
  
  const [language, setLanguage] = useState(() => {
    const pathSegments = window.location.pathname.split("/");
    const languageFromURL = pathSegments[1];
    
    if (availableLanguages.includes(languageFromURL)) {
      return languageFromURL;
    }

    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageCode = browserLanguage.split(/[-_]/)[0];
    const mappedLanguageCode = languageCode === "uk" ? "ua" : languageCode;

    if (availableLanguages.includes(mappedLanguageCode)) {
      return mappedLanguageCode;
    } else {
      return "en";
    }
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Save the selected language to localStorage
    localStorage.setItem("language", language);

    // Notify the parent component about the language change
    onLanguageChange(language);

    // Automatically navigate to the language-specific route
    navigate(`/${language}`);

    // Додаю зміну атрибута lang у <html>
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, onLanguageChange, navigate]);

  // Додаємо CSS стилі для анімації
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = languageIconStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Додаю стилі для hamburger-dark
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

  // Додаю стилі для select.language-select у dark mode
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

  const [state, setState] = React.useState({
    top: false,
  });

  // Контроль overflow body при відкритті/закритті меню
  useEffect(() => {
    const isAnyDrawerOpen = Object.values(state).some(open => open);
    
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ px: "10px" }}>
        {/* {menuItems.map((menuItem) => (
          <ListItem key={menuItem.href} disablePadding>
            <Link 
              href={menuItem.href} 
              underline="none"
              sx={{ 
                fontSize: '22px', 
                fontWeight: 'bolder', 
                color: 'black',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#2A4E63',
                  transform: 'scale(1.05)',
                  textDecoration: 'underline'
                }
              }}
            >
              <ListItemText primary={menuItem.label(language)} />
            </Link>
          </ListItem>
        ))}

        <Divider /> */}
        <ListItem>
          <InputLabel id="language-select-label" sx={{ width: '100%' }}>
            {getLanguageSelectionText(language)}
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            sx={{
              width: '100%'
            }}
            value={language}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={`flag-container flex align-center ${isAnimating ? 'language-change-animation' : ''}`}>
                    <span className="language-flag" style={{ marginRight: 8 }}>
                      <Flag code={lang.flagCode} width={32} />
                    </span>
                  </div>
                  <span className="ml-2">{lang.label}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </ListItem>
        
        <ListItem>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '22px', fontWeight: 400, color: isDarkMode ? '#e0e0e0' : 'black' }}>
              {getThemeText(language)}
            </span>
             <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                color: isDarkMode ? '#e0e0e0' : '#071016',
                '&:hover': {
                  color: '#2A4E63',
                  transform: 'scale(1.05)'
                }
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton> 
          </div>
        </ListItem>
      </List>
    </Box>
  );


  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    
    // Запускаємо анімацію
    setIsAnimating(true);
    
    // Зупиняємо анімацію через 600ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    setLanguage(lang);
    navigate(`/${lang}`);
  };

  return (
    <header className="py-7 px-2 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src='/images/logo.svg'
          alt="Generate Password To Me - Secure Password Generator Logo"
          className="w-[50%] h-6 mr-1 logo"
          loading="eager"
          decoding="async"
          width={24}
          height={24}
        />
      </div>
       <ul className="lg:flex justify-end w-[55%] items-center hidden text-decoration-none gap-5 text-[#071016] text-xl font-medium">
        {/* <li className="cursor-pointer transition-all duration-300 hover:text-[#2A4E63] hover:scale-105">
          <a href="#aboutus" className="nav-link">{t('menu_aboutus', language)}</a>
        </li>
        <li className="cursor-pointer transition-all duration-300 hover:text-[#2A4E63] hover:scale-105">
          <a href="#howtouse" className="nav-link">{t('menu_howtouse', language)}</a>
        </li>
        <li className="cursor-pointer transition-all duration-300 hover:text-[#2A4E63] hover:scale-105">
          <a href="#guide" className="nav-link">{t('menu_guide', language)}</a>
        </li> */}
        <li>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            className="transition-all duration-300 hover:scale-105"
            sx={{ 
              color: isDarkMode ? '#e0e0e0' : '#071016',
              '&:hover': {
                color: '#2A4E63',
                transform: 'scale(1.05)'
              }
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </li>
      </ul>

      <select 
        name="Language" 
        value={language} 
        onChange={handleLanguageChange} 
        id="eng" 
        className={`language-select py-3 lg:flex hidden px-4 justify-center border-2 border-[#2A4E63] rounded-[60px] bg-transparent w-auto ${isAnimating ? 'language-change-animation' : ''}`}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      <div className=" flex lg:hidden">
        {['top'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Image 
              src='/images/hamburger.png' 
              alt="Navigation menu toggle" 
              onClick={toggleDrawer(anchor, true)} 
              className={`cursor-pointer${isDarkMode ? ' hamburger-dark' : ''}`}
              loading="lazy"
              decoding="async"
              width={24}
              height={24}
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: { xs: '100vw', sm: 250 },
                  maxWidth: { xs: '100vw', sm: 250 },
                  boxSizing: 'border-box'
                }
              }}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
