import en from '../data/en.json';
import fa from '../data/fa.json';

export type AppContent = typeof en;

export const defaultLocale = 'fa';

const locales: Record<string, AppContent> = {
  en,
  fa
};

export const getContent = (locale: string = defaultLocale): AppContent => {
  const normalized = locale.toLowerCase();
  const primary = normalized.split('-')[0];
  return locales[normalized] ?? locales[primary] ?? locales[defaultLocale];
};
