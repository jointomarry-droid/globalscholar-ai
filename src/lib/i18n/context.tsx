"use client";

import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";
import { translations, type TranslationKey } from "./translations";
import { LANGUAGES, type LanguageCode, isRTL } from "./config";

type TranslationValue = string | { [key: string]: TranslationValue };

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isRTL: boolean;
  languages: typeof LANGUAGES;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

function ChildrenWrapper({ children, languageKey }: { children: React.ReactNode; languageKey: string }) {
  return <>{children}</>;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguageStore();
  const [renderKey, setRenderKey] = useState(0);

  // Force re-render when language changes
  useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      const translationsObj = translations[language] || translations.en;
      return getNestedValue(translationsObj, key);
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRTL: isRTL(language),
      languages: LANGUAGES,
    }),
    [language, setLanguage, t]
  );

  return (
    <I18nContext.Provider value={value}>
      <ChildrenWrapper key={renderKey} languageKey={language}>
        {children}
      </ChildrenWrapper>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
