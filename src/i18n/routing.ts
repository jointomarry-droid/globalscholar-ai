import {defineRouting} from 'next-intl/routing';

export const locales = [
  'en', 'es', 'fr', 'de', 'zh', 'ar',
  'hi', 'ja', 'ko', 'pt', 'ru', 'tr'
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, {nativeName: string; name: string; dir: 'ltr' | 'rtl'}> = {
  en: {nativeName: 'English', name: 'English', dir: 'ltr'},
  es: {nativeName: 'Español', name: 'Spanish', dir: 'ltr'},
  fr: {nativeName: 'Français', name: 'French', dir: 'ltr'},
  de: {nativeName: 'Deutsch', name: 'German', dir: 'ltr'},
  zh: {nativeName: '中文', name: 'Chinese', dir: 'ltr'},
  ar: {nativeName: 'العربية', name: 'Arabic', dir: 'rtl'},
  hi: {nativeName: 'हिन्दी', name: 'Hindi', dir: 'ltr'},
  ja: {nativeName: '日本語', name: 'Japanese', dir: 'ltr'},
  ko: {nativeName: '한국어', name: 'Korean', dir: 'ltr'},
  pt: {nativeName: 'Português', name: 'Portuguese', dir: 'ltr'},
  ru: {nativeName: 'Русский', name: 'Russian', dir: 'ltr'},
  tr: {nativeName: 'Türkçe', name: 'Turkish', dir: 'ltr'},
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
