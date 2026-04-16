'use client'

import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { CustomThemeProvider } from "@/context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import 'vanilla-cookieconsent/dist/cookieconsent.css';
const GeneratePassword = dynamic(() => import("@/components/PasswordGenerator/PasswordGenerator"), { ssr: false });
import TagManager from "react-gtm-module";

const TagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || ''
};

export function ClientOnly(language: string) {
  useEffect(() => {
  if (TagManagerArgs.gtmId) {
    TagManager.initialize(TagManagerArgs);
  }
}, []);
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <GeneratePassword language={language}/>
    </CustomThemeProvider>
  );
}