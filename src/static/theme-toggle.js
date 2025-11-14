const button = document.querySelector('[data-theme-toggle]');
if (button) {
  const label = button.querySelector('.theme-toggle__label');
  const root = document.documentElement;

  const apply = (theme) => {
    const isDark = theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
    button.dataset.state = isDark ? 'dark' : 'light';
    root.dataset.theme = theme;
    if (label) {
      label.textContent = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  };

  document.addEventListener('insta-theme-change', (event) => {
    apply(event.detail);
  });

  button.addEventListener('click', () => {
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    if (typeof window.__setTheme === 'function') {
      window.__setTheme(next);
    } else {
      apply(next);
    }
  });

  apply(root.dataset.theme || 'light');
}
