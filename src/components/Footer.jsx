import React, { useEffect, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../context/ThemeContext";
import lang from './lang.json';
import seoData from './SeoData';

const referalLink = "https://hostinger.com.ua?REFERRALCODE=1098786";

// CSS стилі для посилань
const linkStyles = `
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

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useContext(ThemeContext);

  // Додаємо CSS стилі для посилань
  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleElement = document.createElement("style");
      styleElement.textContent = linkStyles;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }

  }, []);

  return (
    <>
      <footer className="w-full py-4 px-2 flex flex-wrap flex-col gap-5 lg:flex-row justify-between items-center">
        <div className="flex items-center">
          <Image
            src={isDarkMode ? "/images/logo.svg" : "/images/logo.svg"}
            alt="Generate Password To Me - Secure Password Generator Logo"
            width={24}
            height={24}
            className="w-6 h-6 mr-1 logo"
            priority
          />
        </div>
        {/* <ul className="lg:flex items-center hidden text-decoration-none gap-5 text-xl font-medium">
          <li className="cursor-pointer">
            <a href="#aboutus" className="nav-link">
              {t('menu_aboutus', language)}
            </a>
          </li>
          <li className="cursor-pointer">
            <a href="#howtouse" className="nav-link">
              {t('menu_howtouse', language)}
            </a>
          </li>
          <li className="cursor-pointer">
            <a href="#guide" className="nav-link">
              {t('menu_guide', language)}
            </a>
          </li>
        </ul> */}
        {/* <ul className="flex items-center text-decoration-none gap-4 ">
          <li className=" cursor-pointer border-[1px] border-[#2A4E63]   w-16 h-16 items-center  flex justify-center rounded-full border-solid"><img src={facebook} alt="Facebook social media icon" /></li>
          <li className=" cursor-pointer border-[1px] border-[#2A4E63]  w-16 h-16 items-center  flex justify-center rounded-full border-solid"><img src={twitter} alt="Twitter social media icon" /></li>
          <li className=" cursor-pointer border-[1px] border-[#2A4E63]  w-16 h-16 items-center  flex justify-center rounded-full border-solid"><img src={linkdIn} alt="LinkedIn social media icon" /></li>
        </ul> */}
        <div className="flex lg:flex-row flex-col xs:flex-wrap lg:flex-nowrap w-full">
          <div className="text-[18px] md:w-full lg:w-1/2 lg:text-left md:text-center font-medium my-5 ml-2">
            {t('footer_copyright', language)} ©{" "}
            <span className=" text-[#05a9ff] font-bold">
              GeneratePasswordTo.Me{" "}
            </span>
            {currentYear}
          </div>
          <div className="text-[18px] xs:w-full lg:w-1/2 lg:text-right md:text-center font-medium my-5 ml-2">
            <div className="flex flex-col lg:items-end items-center gap-2">
              <a
                href="https://github.com/devcodex2025/password-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#05a9ff] transition-colors group"
                aria-label="View source code on GitHub"
              >
                <span className="font-semibold group-hover:text-[#05a9ff] transition-colors">{t('footer_opensource', language)}</span>
                <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" className="group-hover:text-[#05a9ff] transition-colors">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              {language === 'ua' && (
                <div>
                  <p className="inline">
                    {t('footer_working_with', language) + ' '}
                  </p>
                  <a
                    className="external-link text-[18px] inline text-[#05a9ff] font-semibold cursor-pointer"
                    href={referalLink}
                    rel="nofollow"
                  >
                    {" "}
                    Hostinger
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
      {/* Visually hidden TL;DR for GEO/AEO, present in DOM but hidden */}
      <div className="sr-only" aria-hidden="true">
        <h2>TL;DR</h2>
        <p>
          {(seoData.find(d => d.language === (language || 'en')) || seoData.find(d => d.language === 'en'))?.description}
        </p>
      </div>
    </>
  );
};

export default Footer;
