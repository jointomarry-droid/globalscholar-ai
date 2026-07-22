import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type LanguageCode, DEFAULT_LANGUAGE } from "@/lib/i18n/config";

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "globalscholar-language",
    }
  )
);
