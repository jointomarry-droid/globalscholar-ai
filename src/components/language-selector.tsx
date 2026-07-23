"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";

export function LanguageSelector() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = localeNames[locale as Locale] || localeNames.en;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, {locale: newLocale});
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent transition-all duration-200 text-sm"
        aria-label={t("common.language")}
      >
        <span className="text-base">🌐</span>
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
          {Object.entries(localeNames).map(([code, info]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Locale)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === code
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <span className="w-6 text-center font-medium">{code.toUpperCase()}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{info.nativeName}</span>
                <span className="text-xs text-muted-foreground">{info.name}</span>
              </div>
              {info.dir === "rtl" && (
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
