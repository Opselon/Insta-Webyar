import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { serveStatic } from 'hono/cloudflare-workers';
import manifest from '__STATIC_CONTENT_MANIFEST';

import { Layout } from './templates/Layout.js';
import {
  defaultLocale,
  getAvailableLocales,
  getContent,
  resolveLocale
} from './utils/i18n.js';

const app = new Hono();

// Use the correct, platform-specific serveStatic middleware with the required manifest.
app.use(
  '/assets/*',
  serveStatic({
    manifest,
    rewriteRequestPath: (path) => path.replace(/^\/assets\//, ''),
  })
);

const availableLocales = getAvailableLocales();

app.use('*', jsxRenderer());

const fallbackOrigin = 'https://imen.webyar.cloud/';

app.get('/', (c) => {
  const queryLocale = c.req.query('lang');
  const locale = resolveLocale(queryLocale ?? undefined);

  if (queryLocale && locale !== queryLocale) {
    const target = locale === defaultLocale ? '/' : `/?lang=${locale}`;
    return c.redirect(target, 302);
  }

  if (queryLocale === defaultLocale) {
    return c.redirect('/', 302);
  }

  const content = getContent(locale);

  return c.render(<Layout content={content} locale={locale} locales={availableLocales} />);
});

app.get('/robots.txt', (c) => {
  const baseContent = getContent(defaultLocale);
  let canonicalUrl: URL;
  try {
    canonicalUrl = new URL(baseContent.meta.canonical ?? fallbackOrigin);
  } catch {
    canonicalUrl = new URL(fallbackOrigin);
  }

  const sitemapUrl = new URL('/sitemap.xml', canonicalUrl.origin);
  const body = [`User-agent: *`, 'Allow: /', `Sitemap: ${sitemapUrl.href}`].join('\n');

  return c.text(`${body}\n`);
});

app.get('/sitemap.xml', (c) => {
  const locales = [defaultLocale, 'en'];
  const urls = new Set<string>();

  locales.forEach((locale) => {
    const { meta } = getContent(locale);
    if (!meta.canonical) {
      return;
    }

    try {
      const canonicalUrl = new URL(meta.canonical);
      urls.add(canonicalUrl.href);
    } catch {
      // ignore invalid canonical URLs
    }
  });

  if (urls.size === 0) {
    urls.add(fallbackOrigin);
  }

  const lastmod = new Date().toISOString();
  const urlset = Array.from(urls)
    .map(
      (href) =>
        [
          '  <url>',
          `    <loc>${href}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          '    <changefreq>weekly</changefreq>',
          '    <priority>0.8</priority>',
          '  </url>'
        ].join('\n')
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;

  return c.newResponse(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8'
  });
});

app.notFound((c) =>
  c.json(
    {
      message: 'Not Found',
      docs: 'https://github.com/your-org/insta-webyar'
    },
    404
  )
);

export default app;
