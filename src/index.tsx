import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { defaultLocale, getContent } from './utils/i18n';
import { Layout } from './templates/Layout';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './src/static' }));

const fallbackOrigin = 'https://imen.webyar.cloud/';

app.get('/', (c) => {
  const queryLocale = c.req.query('lang');
  const headerLocale = c
    .req
    .header('Accept-Language')
    ?.split(',')[0]
    ?.split(';')[0];
  const locale = queryLocale ?? headerLocale ?? defaultLocale;
  const content = getContent(locale);

  return c.html(<Layout content={content} />);
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
      (href) => `  <url>\n    <loc>${href}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
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
