import en from '../data/en.json';
import fa from '../data/fa.json';

export type AppContent = typeof en;

export const defaultLocale = 'fa';

const locales: Record<string, AppContent> = {
  en,
  fa
};

const availableLocales = Object.keys(locales).sort((a, b) => {
  if (a === defaultLocale) {
    return -1;
  }
  if (b === defaultLocale) {
    return 1;
  }
  return a.localeCompare(b);
});

const normalizeLocale = (locale: string): string => {
  const normalized = locale.toLowerCase();
  const primary = normalized.split('-')[0];
  if (availableLocales.includes(normalized)) {
    return normalized;
  }
  if (availableLocales.includes(primary)) {
    return primary;
  }
  return defaultLocale;
};

export const resolveLocale = (requested?: string | null): string => {
  if (!requested) {
    return defaultLocale;
  }
  return normalizeLocale(requested);
};

export const getContent = (locale: string = defaultLocale): AppContent => {
  const resolved = resolveLocale(locale);
  return locales[resolved];
};

export const getAvailableLocales = (): string[] => availableLocales.slice();
