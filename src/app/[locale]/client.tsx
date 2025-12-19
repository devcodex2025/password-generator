'use client'

import dynamic from "next/dynamic";
import React, { useEffect } from 'react';
import { CustomThemeProvider } from "@/context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import 'vanilla-cookieconsent/dist/cookieconsent.css';
const GeneratePassword = dynamic(() => import("@/components/PasswordGenerator/PasswordGenerator"), { ssr: false });
import TagManager from "react-gtm-module";

const TagManagerArgs = {
  gtmId: 'GTM-KR2SHTKB'
};

export function ClientOnly(language: string) {
  useEffect(() => {
  TagManager.initialize(TagManagerArgs);
}, []);
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <GeneratePassword language={language}/>
    </CustomThemeProvider>
  );
}