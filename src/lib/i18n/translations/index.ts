import en from "./en";
import es from "./es";
import fr from "./fr";
import de from "./de";
import zh from "./zh";
import ar from "./ar";
import hi from "./hi";
import ja from "./ja";
import ko from "./ko";
import pt from "./pt";
import ru from "./ru";
import tr from "./tr";

export const translations = {
  en,
  es,
  fr,
  de,
  zh,
  ar,
  hi,
  ja,
  ko,
  pt,
  ru,
  tr,
} as const;

export type TranslationKey = keyof typeof en;
export type NestedTranslationKey = string;
