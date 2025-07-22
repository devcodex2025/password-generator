"use client";

import React, { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CustomThemeProvider } from "@/context/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";
import HowToUse from "./HowToUse.jsx";
import AboutUs from "./AboutUs.jsx";
import { Button, Slider, FormControlLabel, Checkbox, Snackbar } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useReward } from "react-rewards";
import zxcvbn from "zxcvbn";
import seoData from "../SeoData.js";
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import lang from "../lang.json";
import { rankColor } from "../functions/RankColor.js";
import { getStrengthWord } from "../functions/GetStrengthWord.js";
import '../styles/index.css';
import { Analytics } from "@vercel/analytics/react"
import { getAvailableLanguages } from '../utils/languageUtils.js';
import SeoAccordion from "./SeoAccordion.jsx";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

function translateTimeUnits(str, language) {
  if (!str) return str;
  return str
    .replace(/years/g, t('time_years', language))
    .replace(/year/g, t('time_year', language))
    .replace(/months/g, t('time_months', language))
    .replace(/month/g, t('time_month', language))
    .replace(/days/g, t('time_days', language))
    .replace(/day/g, t('time_day', language))
    .replace(/hours/g, t('time_hours', language))
    .replace(/hour/g, t('time_hour', language))
    .replace(/minutes/g, t('time_minutes', language))
    .replace(/minute/g, t('time_minute', language))
    .replace(/seconds/g, t('time_seconds', language))
    .replace(/second/g, t('time_second', language))
    .replace(/centuries/g, t('time_centuries', language))
    .replace(/century/g, t('time_century', language))
    .replace(/less than a/g, t('time_less_than_a', language));
}

function PasswordRow({
  password,
  index,
  language,
  onGenerate,
  onCopy,
  refreash,
  isAnimating,
  isDarkMode
}) {
  const copyDisabledStyle = isAnimating
    ? { pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" }
    : { cursor: "pointer" };

  return (
    <div
      className="flex relative items-center flex-row lg:flex-row gap-2 h-auto w-[100%] my-5 lg:my-1 flex-wrap lg:flex-nowrap"
      key={index}
    >
      <div
        className={`${isDarkMode ? "border-none" : "border-[#E5F6FF]"} py-1 lg:px-4 w-[100%] lg:w-[80%] flex items-center border-2 h-14 border-solid rounded-[120px] text-[#071016] text-[12px] md:text-[20px]`}
        style={isDarkMode ? { backgroundColor: "#121212" } : {}}
      >
        <input
          type="text"
          value={password || ""}
          className="rounded-[40px] ml-[16px] border-none outline-none h-full w-[80%] lg:w-[80%] md:py-5 flex-grow-1 text-base lg:text-lg"
          readOnly
        />
        {/* For Desktop*/}
        <div className="hidden md:flex items-center lg:justify-end justify-center flex-nowrap w-full lg:max-w-[300px] max-w-[150px] h-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px]">
          <button
            className="bg-[#E5F6FF] text-[#2A4E63] font-semibold hidden lg:flex text-[18px] lg:text-[20px] rounded-[60px] px-[16px] py-[12px] w-full my-2 lg:w-auto lg:px-6 lg:py-2 mx-2 whitespace-nowrap justify-center"
            onClick={() => {
              onGenerate(index);
            }}
            style={{ cursor: "pointer" }}
          >
            {t("generate", language)}
          </button>
          <button
            className="bg-[#E5F6FF] text-[#2A4E63] font-semibold text-[16px] md:text-[18px] flex lg:hidden lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 mx-2 whitespace-nowrap justify-center py-0 items-center px-2 h-full"
            onClick={() => {
              onGenerate(index);
            }}
            style={{ cursor: "pointer" }}
          >
            {t("generate_short", language)}
          </button>
          <Image
            onClick={() => {
              onGenerate(index);
            }}
            src="/images/refreash.png"
            alt="refresh"
            className={`${isDarkMode ? "invert brightness-0" : ""} flex mr-2 h-[15px] md:h-[20px]`}
            style={{ cursor: "pointer" }}
            loading="lazy"
            decoding="async"
            width={20}
            height={20}
          />
        </div>
      </div>
      {/* For Mobile*/}
      <div className="flex md:hidden h-14 items-center justify-center flex-nowrap w-full bg-[#E5F6FF] lg:bg-transparent rounded-[40px] px-2">
        <button
          className="bg-[#E5F6FF] text-[#2A4E63] font-semibold hidden lg:flex text-[18px] lg:text-[20px] rounded-[60px] px-[16px] py-[12px] w-full my-2 lg:w-auto lg:px-6 lg:py-2 whitespace-nowrap justify-center"
          onClick={() => {
            onGenerate(index);
          }}
          style={{ cursor: "pointer" }}
        >
          {t("generate", language)}
        </button>
        <button
          className="bg-[#E5F6FF] text-[#2A4E63] font-semibold text-[16px] md:text-[18px] flex lg:hidden lg:text-[24px] rounded-[60px] px-[8px] md:px-[16px] py-[10px] md:py-[12px] lg:my-0 whitespace-nowrap justify-center py-0 items-center px-4 h-full w-full"
          onClick={() => {
            onGenerate(index);
          }}
          style={{ cursor: "pointer" }}
        >
          {t("generate_short", language)}
          <Image
            onClick={(e) => {
              e.stopPropagation();
              onGenerate(index);
            }}
            src="/images/refreash.png"
            alt="refresh"
            className="flex h-[15px] md:h-[20px] ml-2"
            style={{ cursor: "pointer" }}
            width={20}
            height={20}
          />
        </button>
      </div>
      <button
        disabled={password?.length < 1 || isAnimating}
        className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} w-[100%] -bottom-12 h-14 lg:w-[20%] ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[16px] md:text-[20px] rounded-[60px] py-[12px]`}
        style={
          password?.length < 1 || isAnimating
            ? { cursor: "not-allowed", opacity: 0.5 }
            : copyDisabledStyle
        }
        onClick={() => onCopy(index)}
      >
        {t("copy", language)}
      </button>
    </div>
  );
}

const passwordCrackingStyles = `
  .password-cracking {
    position: relative;
    font-family: 'Courier New', monospace;
  }
  .password-cracking::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(42, 78, 99, 0.3), transparent);
    animation: scanning 2s infinite;
  }
  .password-cracking .char {
    display: inline-block;
    transition: all 0.2s ease;
    opacity: 0.6;
  }
  .password-cracking .char.active {
    opacity: 1;
    transform: scale(1.2);
    color: #2A4E63;
    font-weight: bold;
  }
  .password-cracking .char:not(.active) {
    opacity: 0.4;
    transform: scale(0.9);
  }
  .password-cracking .char.complete {
    color: #2A4E63;
    font-weight: bold;
    opacity: 1;
    transform: scale(1.1);
  }
  .password-cracking .char.blinking {
    animation: blink 1.6s infinite;
    color: #2A4E63;
    font-weight: bold;
    opacity: 1;
    transform: scale(1.1);
  }
  @keyframes blink {
    0%, 50% {
      opacity: 1;
      transform: scale(1.1);
    }
    25%, 75% {
      opacity: 0.3;
      transform: scale(0.8);
    }
  }
  @keyframes scanning {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const AnimatedPassword = ({ length = 7 }) => {
  const [currentChars, setCurrentChars] = useState(Array(length).fill("*"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const characters = [
      "*",
      "A",
      "B",
      "C",
      "1",
      "2",
      "3",
      "X",
      "Y",
      "Z",
      "9",
      "8",
      "7",
    ];
    let charIndex = 0;
    let isPaused = false;

    const interval = setInterval(() => {
      if (!isPaused && !isBlinking) {
        setCurrentChars((prev) => {
          const newChars = [...prev];
          newChars[activeIndex] = characters[charIndex % characters.length];
          return newChars;
        });
        charIndex++;
        if (charIndex >= characters.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            charIndex = 0;
            if (activeIndex < length - 1) {
              setActiveIndex((prev) => prev + 1);
            } else {
              setIsComplete(true);
              setIsBlinking(true);
              const blinkInterval = setInterval(() => {
                setIsBlinking(false);
                setIsComplete(false);
                setCurrentChars(Array(length).fill("*"));
                setActiveIndex(0);
                clearInterval(blinkInterval);
              }, 4000);
            }
          }, 1000);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIndex, length, isComplete, isBlinking]);

  return (
    <span className="password-cracking">
      {currentChars.map((char, index) => (
        <span
          key={index}
          className={`char ${index === activeIndex ? "active" : ""} ${isComplete ? "complete" : ""} ${isBlinking ? "blinking" : ""}`}
          style={{
            "--char-index": index,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
// @ts-ignore
const getEffectiveLanguage = (propLang) => {
  if (propLang && supportedLangs.includes(propLang)) return propLang;
  const browserLang = navigator.language.slice(0, 2);
  if (supportedLangs.includes(browserLang)) return browserLang;
  return 'en';
};

const hreflangMap = {
  ua: 'uk',
};

// Lazy load non-critical components
const SeoText = lazy(() => import('../SeoText.jsx'));
const SeoList = lazy(() => import('../SeoList.jsx'));
const AdBanner = lazy(() => import('./Advertising/Adbanner.jsx'));
const AdBannerSecond = lazy(() => import('./Advertising/AddbannerSecond.jsx'));
const CookieConsentComponent = lazy(() => import('./CookieConsent/CookieConsent.tsx'));

export default function GeneratePassword({language: propLanguage}) {
  const { isDarkMode } = useContext(ThemeContext);
  const [snackbars, setSnackbars] = useState([]);
  const [passwordLength, setPasswordLength] = useState(12);
  const [selectedCharacterSets, setSelectedCharacterSets] = useState(["A-Z", "a-z", "0-9", "#$%"]);
  const [language, setLanguage] = useState("ua");
  const [quantity, setQuantity] = useState(1);
  const [passwords, setPasswords] = useState([]);
  const maxquantity = 100;
  const mode = "production";
  const [selectedStandard, setSelectedStandard] = useState("nist");

  const characterSets = useMemo(() => ({
    "A-Z": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "a-z": "abcdefghijklmnopqrstuvwxyz",
    "0-9": "0123456789",
    "#$%": "!@#$%^&*()",
  }), []);

  const handleQuantityChange = (event) => {
    setQuantity("");
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity <= maxquantity) {
      setQuantity(newQuantity);
    }
  };
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleCheckboxChange = (characterSet) => {
    let newSelectedCharacterSets;

    if (selectedCharacterSets.includes(characterSet)) {
      // Перевіряємо, чи не намагаємося зняти останню галочку
      if (selectedCharacterSets.length <= 1) {
        // Показуємо попередження, що не можна зняти останню галочку
        const newSnackbar = {
          id: new Date().getTime(),
          message: t("warning_last_checkbox", language),
        };
        setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
        setTimeout(() => {
          setSnackbars((prevSnackbars) =>
            prevSnackbars.filter((snackbar) => snackbar.id !== newSnackbar.id)
          );
        }, 3000);
        return; // Не змінюємо налаштування
      }
      newSelectedCharacterSets = selectedCharacterSets.filter((set) => set !== characterSet);
    } else {
      newSelectedCharacterSets = [...selectedCharacterSets, characterSet];
    }

    setSelectedCharacterSets(newSelectedCharacterSets);

    // Перевіряємо, чи поточні налаштування відповідають вибраному стандарту
    const currentStandardConfig = passwordStandards[selectedStandard];
    const standardSets = new Set(currentStandardConfig.requiredSets);
    const selectedSets = new Set(newSelectedCharacterSets);

    // Якщо налаштування не відповідають стандарту, встановлюємо кастомний стандарт
    const isStandardCompliant = currentStandardConfig.requiredSets.every(set =>
      newSelectedCharacterSets.includes(set)
    );

    if (!isStandardCompliant) {
      setSelectedStandard('custom');
    }

    // Генеруємо новий пароль з оновленими налаштуваннями
    setTimeout(() => {
      const updatedPasswords = [...passwords];
      for (let i = 0; i < updatedPasswords.length; i++) {
        let characters = "";
        newSelectedCharacterSets.forEach((set) => {
          characters += characterSets[set];
        });

        if (characters.length === 0) {
          updatedPasswords[i] = "";
          // Показуємо попередження тільки один раз, якщо не вибрано жодного набору символів
          if (i === 0) {
            const newSnackbar = {
              id: new Date().getTime(),
              message: t("warning_no_characters", language),
            };
            setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
            setTimeout(() => {
              setSnackbars((prevSnackbars) =>
                prevSnackbars.filter((snackbar) => snackbar.id !== newSnackbar.id)
              );
            }, 3000);
          }
          continue;
        }

        let password = "";
        for (let j = 0; j < passwordLength; j++) {
          password += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        updatedPasswords[i] = password;
      }
      setPasswords(updatedPasswords);
    }, 0);
  };

  const GeneratePasswords = useCallback(() => {
    const currentQuantity = passwords.length;
    const newQuantity = quantity - currentQuantity;
    if (newQuantity > 0) {
      const generatedPasswords = [...passwords];
      for (let i = 0; i < newQuantity; i++) {
        let characters = "";
        selectedCharacterSets.forEach((set) => {
          characters += characterSets[set];
        });

        if (characters.length === 0) {
          generatedPasswords.push("");
          continue;
        }

        let password = "";
        for (let j = 0; j < passwordLength; j++) {
          password += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        generatedPasswords.push(password);
      }
      setPasswords(generatedPasswords);
    } else if (currentQuantity > quantity) {
      setPasswords(passwords.slice(0, quantity));
    }
  }, [passwords, quantity, selectedCharacterSets, passwordLength, characterSets]);

  useEffect(() => {
    GeneratePasswords();
  }, [GeneratePasswords]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const seoInfo = seoData.find((data) => data.language === language);
      if (seoInfo) {
        document.title = seoInfo.title;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = seoInfo.description;
      }
    }

  }, [language]);

  const rewardTypes = ["confetti", "balloons", "emoji"];
  const rewardQueue = useRef([]);
  const { reward } = useReward("centerReward", "confetti", {
    elementCount: 100,
    spread: 70,
    lifetime: 200,
    startVelocity: 35,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const ANIMATION_DURATION = 250; // ms (lifetime + запас)

  const runReward = (type = "confetti") => {
    if (isAnimating) {
      rewardQueue.current.push(type);
      return;
    }
    setIsAnimating(true);
    reward();
    setTimeout(() => {
      setIsAnimating(false);
      if (rewardQueue.current.length > 0) {
        const nextType = rewardQueue.current.shift();
        runReward(nextType);
      }
    }, ANIMATION_DURATION);
  };

  const handleCopyClick = (index) => {
    if (index >= 0 && index < passwords.length) {
      navigator.clipboard.writeText(passwords[index]);
      const newSnackbar = {
        id: new Date().getTime(),
        message: t("snackbar_copied", language),
      };
      setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
      setTimeout(() => {
        setSnackbars((prevSnackbars) =>
          prevSnackbars.filter((snackbar) => snackbar.id !== newSnackbar.id)
        );
      }, 500);
      // Add confetti animation for single copy
      runReward("confetti");
    }
  };

  const handleCopyAllClick = () => {
    const allPasswords = passwords.join("\n");
    navigator.clipboard.writeText(allPasswords);
    const newSnackbar = {
      id: new Date().getTime(),
      message: t("snackbar_all_copied", language),
    };
    setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
    setTimeout(() => {
      setSnackbars((prevSnackbars) =>
        prevSnackbars.filter((snackbar) => snackbar.id !== newSnackbar.id)
      );
    }, 500);
    // Add balloons animation for copy all
    runReward("balloons");
  };

  const handleDownloadAllClick = () => {
    const allPasswords = passwords.join("\n");
    const blob = new Blob([allPasswords], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "passwords.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Add emoji animation for download
    runReward("emoji");
  };

  const handleGeneratePassword = (index) => {
    const standardConfig = passwordStandards[selectedStandard];

    // Ensure minimum length for the selected standard
    const effectiveLength = Math.max(passwordLength, standardConfig.minLength);

    // Generate password with required characters from each set
    let password = "";

    if (selectedStandard === 'custom') {
      // Для кастомного стандарту генеруємо пароль тільки з вибраних наборів символів
      let allCharacters = "";
      selectedCharacterSets.forEach((set) => {
        allCharacters += characterSets[set];
      });

      if (allCharacters.length === 0) {
        const updatedPasswords = [...passwords];
        updatedPasswords[index] = "";
        setPasswords(updatedPasswords);
        return;
      }

      for (let i = 0; i < effectiveLength; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      }
    } else {
      // Для стандартних стандартів спочатку додаємо один символ з кожного обов'язкового набору
      standardConfig.requiredSets.forEach((set) => {
        const chars = characterSets[set];
        if (chars) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      });

      // Потім заповнюємо решту випадковими символами з усіх вибраних наборів
      let allCharacters = "";
      selectedCharacterSets.forEach((set) => {
        allCharacters += characterSets[set];
      });

      // Додаємо решту символів до бажаної довжини
      for (let i = password.length; i < effectiveLength; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      }
    }

    // Перемішуємо пароль, щоб уникнути передбачуваних патернів
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    const updatedPasswords = [...passwords];
    updatedPasswords[index] = password;
    setPasswords(updatedPasswords);
  };

  const passwordInputs = passwords.map((password, index) => (
    <PasswordRow
      key={index}
      password={password}
      index={index}
      language={language}
      onGenerate={handleGeneratePassword}
      onCopy={handleCopyClick}
      isAnimating={isAnimating}
      isDarkMode={isDarkMode}
    />
  ));

  const firstPasswordInput = passwords.length > 0 ? passwordInputs[0] : null;

  // Мемоізуємо важкі обчислення аналізу сили паролю
  const passwordStrengthAnalysis = useMemo(() => {
    if (passwords.length === 0) {
      return {
        TimeToCrackResult: null,
        CrackScore: null,
        strengthWord: '',
        scoreColor: '#000',
        strengthColor: { color: '#000' },
        strengthWordScoreEn: null,
        strengthWordScoreLocalized: ''
      };
    }

    const TimeToCrackResult = zxcvbn(passwords[0]);
    const CrackScore = TimeToCrackResult.score;
    const strengthWord = getStrengthWord(CrackScore, language);
    const scoreColor = rankColor(CrackScore);
    const strengthColor = { color: scoreColor };
    const strengthWordScoreEn = TimeToCrackResult.crack_times_display.offline_slow_hashing_1e4_per_second;
    const strengthWordScoreLocalized = translateTimeUnits(strengthWordScoreEn, language);

    return {
      TimeToCrackResult,
      CrackScore,
      strengthWord,
      scoreColor,
      strengthColor,
      strengthWordScoreEn,
      strengthWordScoreLocalized
    };
  }, [passwords[0], language]); // Залежності: перший пароль та мова

  const restPasswordInputs = passwords.length > 1 ? passwordInputs.slice(1) : [];

  const renderedSnackbars = snackbars.map((snackbar) => (
    <Snackbar
      key={snackbar.id}
      open={true}
      autoHideDuration={6000}
      onClose={() =>
        setSnackbars((prevSnackbars) =>
          prevSnackbars.filter((item) => item.id !== snackbar.id)
        )
      }
      message={snackbar.message}
      color="bg-[#2A4E63]"
    />
  ));

  const availableLanguages = getAvailableLanguages();

  // Password standards configuration
  const passwordStandards = {
    nist: {
      minLength: 8,
      requiredSets: ["A-Z", "a-z", "0-9", "#$%"],
      description: "standard_nist_desc"
    },
    pci: {
      minLength: 12,
      requiredSets: ["A-Z", "a-z", "0-9", "#$%"],
      description: "standard_pci_desc"
    },
    custom: {
      minLength: 4,
      requiredSets: [],
      description: "standard_custom_desc"
    }
  };

  // Handle standard selection
  const handleStandardChange = (standard) => {
    setSelectedStandard(standard);
    const standardConfig = passwordStandards[standard];

    if (standard === 'custom') {
      // Для кастомного стандарту встановлюємо мінімальну довжину 4
      setPasswordLength(Math.max(passwordLength, standardConfig.minLength));
    } else {
      setPasswordLength(standardConfig.minLength);
      setSelectedCharacterSets(standardConfig.requiredSets);
    }
  };

  return (
    <div className={`container ${language} mx-auto px-3 ${isDarkMode ? "dark" : ""}`}>
      <div id="centerReward" style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 9999 }} />
      <Helmet>
        <title>{seoData.find((data) => data.language === language)?.title}</title>
        <meta name="description" content={seoData.find((data) => data.language === language)?.description} />
        <meta property="og:title" content={seoData.find((data) => data.language === language)?.title} />
        <meta property="og:description" content={seoData.find((data) => data.language === language)?.description} />
        <meta property="og:locale" content={language === 'ua' ? 'uk_UA' : language} />
        <html lang={language} />
        {availableLanguages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            href={`https://generatepasswordto.me/${lang}`}
            hreflang={hreflangMap[lang] || lang}
          />
        ))}
        <link rel="alternate" href="https://generatepasswordto.me/en" hreflang="x-default" />
      </Helmet>
      <div className="flex h-auto align-middle flex-col items-center justify-center mx-auto p-0 lg:p-3 font-sans">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        {renderedSnackbars}
        <main className="w-full">
          <Analytics />
          <div className={`flex flex-col justify-center items-center mb-4 w-full rounded-72 pt-10 md:pt-32 ${isDarkMode ? "dark:bg-[#1a1a1a]" : "bg-[#E5F6FF]"} lg:bg-[url('/images/vector-bg.svg')] lg:bg-no-repeat lg:bg-center lg:bg-cover lg:bg-blend-overlay`}>
            <h1 className={`page-title mx-2 md:mb-2 text-[30px] lg:text-[50px] font-bold tracking-tight text-center ${isDarkMode ? 'text-[#e0e0e0]' : 'text-gray-900'}`}>
              {t("main_title", language)}
            </h1>
            <p className="text-center text-[22px] text-[#2A4E63] mx-2 mb-4">
              {t("main_subtitle", language)}
            </p>
            <div className={`w-full lg:w-9/12 xl:w-9/12 2xl:w-7/12 flex flex-col ${isDarkMode ? "bg-[#1c1c1c]" : "bg-white"} drop-shadow-lg  rounded-48 shadow p-[20px] md:p-[60px] relative`}>
              <div className="absolute hidden bg-white drop-shadow-lg  top-[-20px] left-[-140px] border-[#E5F6FF] border-2 border-solid rounded-[120px] py-[2px] w-[200px] text-[#2A4E63] text-[30px] lg:flex items-center gap-2">
                <div className={`p-[12px] rounded-full ${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#E5F6FF]'} mr-3 ml-2 my-1`}>
                  <Image
                    src="/images/password.png"
                    alt="password"
                    width={20}
                    height={20}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="pt-[10px] relative">
                  <AnimatedPassword length={7} />
                </p>
              </div>
              {/* bottom passaword lock */}
              <div className={`${isDarkMode ? "bg-[#2d2d2d]" : "bg-white"} absolute hidden justify-start drop-shadow-lg  top-[150px] right-[-120px] border-[#E5F6FF] border-2 border-solid rounded-[120px]  py-[2px] w-[200px] text-[#2A4E63] text-[30px] lg:flex lg:items-center gap-2`}>
                <div className={`p-[12px] rounded-full ${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#E5F6FF]'} mr-3 ml-2 my-1`}>
                  <Image
                    src="/images/password.png"
                    alt="password"
                    width={20}
                    height={20}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="pt-[10px] relative">
                  <AnimatedPassword length={7} />
                </p>
              </div>
              {firstPasswordInput}
              <div className=" text-[#2A4E63] text-[16px] md:text-[18px] lg:mt-3 lg:flex" style={passwordStrengthAnalysis.strengthColor}>
                {`${passwordStrengthAnalysis.strengthWord} ${t("time_to_crack", language)} ${passwordStrengthAnalysis.strengthWordScoreLocalized}.`}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4 items-center mt-1 lg:mt-3">
                <div className="flex flex-col gap-3 items-start mt-8 lg:mt-6">
                  <label id="password-length-label" htmlFor="Password" className="text-[16px] md:text-[22px] text-[#2A4E63]">
                    {t("password_length", language)} {passwordLength}
                  </label>
                  <div className="flex items-center gap-4 w-full">
                    <RemoveCircleOutlineIcon onClick={() => {
                      const newLength = Math.max(selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength, passwordLength - 1);
                      setPasswordLength(newLength);

                      // Якщо нова довжина не відповідає вибраному стандарту, переходимо на кастомний
                      if (selectedStandard !== 'custom') {
                        const standardConfig = passwordStandards[selectedStandard];
                        if (newLength < standardConfig.minLength) {
                          setSelectedStandard('custom');
                        }
                      }
                    }} style={{ cursor: "pointer" }} />
                    <Slider
                      value={passwordLength}
                      min={selectedStandard === 'custom' ? 4 : passwordStandards[selectedStandard].minLength}
                      max={100}
                      onChange={(e) => {
                        const newLength = e.target.value;
                        setPasswordLength(newLength);

                        // Якщо нова довжина не відповідає вибраному стандарту, переходимо на кастомний
                        if (selectedStandard !== 'custom') {
                          const standardConfig = passwordStandards[selectedStandard];
                          if (newLength < standardConfig.minLength) {
                            setSelectedStandard('custom');
                          }
                        }
                      }}
                      aria-label="Password length slider"
                      aria-describedby="password-length-label"
                      valueLabelDisplay="auto"
                      className="h-[15px]"
                    />
                    <AddCircleOutlineIcon onClick={() => {
                      const newLength = Math.min(100, passwordLength + 1);
                      setPasswordLength(newLength);

                      // Якщо нова довжина не відповідає вибраному стандарту, переходимо на кастомний
                      if (selectedStandard !== 'custom') {
                        const standardConfig = passwordStandards[selectedStandard];
                        if (newLength < standardConfig.minLength) {
                          setSelectedStandard('custom');
                        }
                      }
                    }} style={{ cursor: "pointer" }} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label htmlFor="quantity" className="text-[16px] md:text-[22px] text-[#2A4E63]">
                    {t("quantity", language)}
                  </label>
                  <input type="number" id="quantity" name="quantity" min="1" max={maxquantity} value={quantity} onChange={handleQuantityChange} className={`${isDarkMode ? "border-none" : ""} border-2 border-[#E5F6FF] border-solid rounded-[18px] text-[#071016] text-[18px] md:text-[20px] py-3 md:py-5 px-3 outline-none w-full`} />
                </div>
              </div>
              <div className="flex gap-3 flex-wrap items-center mt-9 ">
                <label htmlFor="Character" className="text-[16px] md:text-[22px] text-[#2A4E63]">
                  {t('use_characters', language)}
                </label>
                <div className="flex items-start flex-nowrap text-[10px] md:text-[20px]">
                  {Object.keys(characterSets).map((characterSet) => (
                    <div key={characterSet} className="flex items-center gap-2">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCharacterSets.includes(characterSet)}
                            onChange={() => handleCheckboxChange(characterSet)}
                            checkedIcon={<CheckBoxOutlinedIcon />}
                            sx={{ color: "#2A4E63", "&.Mui-checked": { color: "#2A4E63" } }}
                            className="h-[24px] text-sm md:text-[22px]"
                          />
                        }
                        className="text-[18px] md:text-[20px]"
                        label={<span className="text-[18px] md:text-[16px]">{characterSet}</span>}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Password Standards Selector */}
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4">
                  <label className="text-[16px] md:text-[22px] text-[#2A4E63] whitespace-nowrap">
                    {t('password_standards_title', language)}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                    <button
                      className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-[14px] sm:text-[16px] md:text-[18px] transition-all border-2 focus:outline-none w-full sm:w-auto ${selectedStandard === 'nist' ? 'border-[#2A4E63] bg-[#e5f6ff] dark:bg-[#05a9ff] text-[#2A4E63] dark:text-[#e0e0e0]' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#374151] text-[#2A4E63] dark:text-[#e0e0e0]'}`}
                      onClick={() => handleStandardChange('nist')}
                    >
                      {t('standard_nist', language)}
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-[14px] sm:text-[16px] md:text-[18px] transition-all border-2 focus:outline-none w-full sm:w-auto ${selectedStandard === 'pci' ? 'border-[#2A4E63] bg-[#e5f6ff] dark:bg-[#05a9ff] text-[#2A4E63] dark:text-[#e0e0e0]' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#374151] text-[#2A4E63] dark:text-[#e0e0e0]'}`}
                      onClick={() => handleStandardChange('pci')}
                    >
                      {t('standard_pci', language)}
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-[14px] sm:text-[16px] md:text-[18px] transition-all border-2 focus:outline-none w-full sm:w-auto ${selectedStandard === 'custom' ? 'border-[#2A4E63] bg-[#e5f6ff] dark:bg-[#05a9ff] text-[#2A4E63] dark:text-[#e0e0e0]' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#374151] text-[#2A4E63] dark:text-[#e0e0e0]'}`}
                      onClick={() => handleStandardChange('custom')}
                    >
                      {t('standard_custom', language)}
                    </button>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <span className="mb-2 block text-[14px] sm:text-[17px] md:text-[20px] font-normal text-[#2A4E63] dark:text-[#e0e0e0] border-2 border-[#e5f6ff] dark:border-[#05a9ff] rounded-lg px-3 sm:px-4 py-2 mt-1">
                    {t(passwordStandards[selectedStandard].description, language)}
                  </span>
                </div>
              </div>
              {restPasswordInputs}
              {passwords.length >= 2 ? (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                  <Button
                    className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto`}
                    onClick={handleCopyAllClick}
                    disabled={isAnimating}
                    style={isAnimating ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                  >
                    <FileCopyIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
                    {t("copy_all", language)}
                  </Button>
                  <Button
                    className={`${isDarkMode ? 'bg-[#05a9ff]' : 'bg-[#2A4E63]'} ${isDarkMode ? 'text-[#e0e0e0]' : 'text-white'} font-semibold text-[14px] sm:text-[16px] md:text-[20px] rounded-[60px] px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] cursor-pointer w-full sm:w-auto`}
                    onClick={handleDownloadAllClick}
                    disabled={isAnimating}
                    style={isAnimating ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                  >
                    <CloudDownloadIcon sx={{ marginRight: 1, fontSize: { xs: '18px', sm: '20px' } }} />
                    {t("download_all", language)}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </main>
        <div className="w-full mt-10">
          <Suspense fallback={null}>
            <AdBanner language={language} isDarkMode={isDarkMode} />
          </Suspense>
        </div>
        <div className="lg:my-10 w-full">
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded"></div>}>
            <SeoAccordion language={language} />
          </Suspense>
        </div>
        <div className="mb-4 w-full mt-4">
          <Suspense fallback={null}>
            <AdBannerSecond language={language} isDarkMode={isDarkMode} />
          </Suspense>
        </div>
        <Footer language={language} />
        <Suspense fallback={null}>
          <CookieConsentComponent language={language} />
        </Suspense>
      </div>
    </div>
  );
} 