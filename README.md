# Insta-Webyar

Insta-Webyar is a Cloudflare Worker powered by [Hono](https://hono.dev/) that renders a mobile-first marketing site for the Insta-Webyar content studio. The app is written in TypeScript and uses Hono's JSX renderer to hydrate localized content, supports light and dark themes (light by default), and serves a modern UI that uses the Vazirmatn type family.

## Project layout

```
src/
  index.ts         # Cloudflare Worker entry that wires Hono, routing, and templates
  data/en.json     # Default locale copy (extend with additional locales as needed)
  static/          # Global CSS, theme scripts, and other static assets
  templates/       # JSX components for sections, layout, and theme logic
  utils/           # i18n helpers and shared logic
tests/             # (Reserved) Playwright E2E tests
wrangler.toml      # Worker configuration
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Worker locally with Wrangler:

   ```bash
   npm run dev
   ```

   Wrangler will watch for file changes and serve the Worker on a local tunnel. The site defaults to light mode, with a theme toggle stored in `localStorage`.

3. Deploy to Cloudflare (requires an authenticated Wrangler session):

   ```bash
   npm run deploy
   ```

## Extending content and locales

- Add additional locale JSON files under `src/data` (for example, `fa.json`).
- Register the new locale in `src/utils/i18n.ts` by extending the `locales` map.
- The UI will automatically pick up the correct locale when `?lang=<code>` is supplied or the `Accept-Language` header is set.

## UI/UX highlights

- Light theme by default with a persistent dark-mode toggle.
- Mobile-first spacing, typography, and layout grid.
- Vazirmatn font family for polished Persian and Latin typography.
- High-performance server-side rendering with minimal client-side JavaScript for enhanced Core Web Vitals.

## Testing

Playwright E2E tests can be added under `tests/`. Configure a GitHub action or local workflow to run them after `npm install`.
