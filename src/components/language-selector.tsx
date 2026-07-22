"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LANGUAGES, type LanguageCode } from "@/lib/i18n/config";

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent transition-all duration-200 text-sm"
        aria-label={t("common.language")}
      >
        <span className="text-base">{currentLang.code === "en" ? "🌐" : currentLang.code === "ar" ? "🌐" : currentLang.code === "zh" ? "🌐" : "🌐"}</span>
        <span className="hidden sm:inline font-medium">{currentLang.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl z-50 py-2 max-h-80 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as LanguageCode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                language === lang.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <span className="w-6 text-center font-medium">{lang.code.toUpperCase()}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
              {lang.dir === "rtl" && (
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  RTL
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
