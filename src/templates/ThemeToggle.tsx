import type { FC } from 'hono/jsx';

export const ThemeScript: FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(() => {
  const storageKey = 'insta-webyar-theme';
  const root = document.documentElement;
  const stored = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  const apply = (next) => {
    root.dataset.theme = next;
    root.classList.toggle('theme--dark', next === 'dark');
    root.classList.toggle('theme--light', next === 'light');
    localStorage.setItem(storageKey, next);
    document.dispatchEvent(new CustomEvent('insta-theme-change', { detail: next }));
  };
  apply(theme);
  window.__setTheme = apply;
})();`
    }}
  />
);

export const ThemeToggle: FC = () => (
  <button
    type="button"
    class="theme-toggle"
    aria-label="Toggle color mode"
    aria-live="polite"
    data-theme-toggle
  >
    <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀️</span>
    <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">🌙</span>
    <span class="theme-toggle__label">Switch to dark mode</span>
  </button>
);

declare global {
  interface Window {
    __setTheme(theme: 'light' | 'dark'): void;
  }
}
