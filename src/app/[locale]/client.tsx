'use client'

import dynamic from "next/dynamic";
import React, { useEffect } from 'react';
import { CustomThemeProvider } from "@/context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { HelmetProvider } from "react-helmet-async";
import 'vanilla-cookieconsent/dist/cookieconsent.css';
const GeneratePassword = dynamic(() => import("@/components/PasswordGenerator/PasswordGenerator"), { ssr: false });
import TagManager from "react-gtm-module";

const TagManagerArgs = {
  gtmId: 'GTM-KR2SHTKB'
};

export function ClientOnly() {
  useEffect(() => {
  TagManager.initialize(TagManagerArgs);
}, []);
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <HelmetProvider>
        <GeneratePassword/>
      </HelmetProvider>
    </CustomThemeProvider>
  );
}