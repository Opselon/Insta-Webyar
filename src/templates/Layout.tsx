import type { FC } from 'hono/jsx';
import type { AppContent } from '../utils/i18n.js';
import { defaultLocale } from '../utils/i18n.js';
import { renderIcon } from '../icons/IconRegistry.js';
import { HeroScene } from './HeroScene.js';
import { ThemeScript, ThemeToggle } from './ThemeToggle.js';

const AnnouncementBar: FC<{ announcement: AppContent['announcement'] }> = ({ announcement }) => (
  <div class="announcement" role="region" aria-label="Product update">
    <div class="container announcement__inner">
      <span class="announcement__label">{announcement.label}</span>
      <p class="announcement__message">{announcement.message}</p>
      <a class="announcement__link" href={announcement.href}>
        {announcement.cta ?? "View what's new"}
      </a>
    </div>
  </div>
);

const localeLabels: Record<string, string> = {
  en: 'English',
  fa: 'فارسی'
};

const Navigation: FC<{ items: AppContent['navigation'] }> = ({ items }) => (
  <nav class="site-nav" aria-label="Primary navigation">
    <ul>
      {items.map((item) => (
        <li>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const createLocaleHref = (locale: string): string =>
  locale === defaultLocale ? '/' : `/?lang=${locale}`;

const LanguageSwitcher: FC<{ currentLocale: string; locales: string[] }> = ({
  currentLocale,
  locales
}) => (
  <nav class="language-switcher" aria-label="Language selector">
    <ul>
      {locales.map((locale) => {
        const label = localeLabels[locale] ?? locale.toUpperCase();
        const isActive = locale === currentLocale;
        return (
          <li>
            <a
              href={createLocaleHref(locale)}
              class={`language-switcher__link${
                isActive ? ' language-switcher__link--active' : ''
              }`}
              aria-current={isActive ? 'true' : undefined}
              hrefLang={locale}
              lang={locale}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

const HeroMetrics: FC<{ metrics: AppContent['hero']['metrics'] }> = ({ metrics }) => (
  <dl class="hero-metrics">
    {metrics.map((metric) => (
      <div class="hero-metric">
        <dt>{metric.label}</dt>
        <dd>{metric.value}</dd>
      </div>
    ))}
  </dl>
);

const HeroMedia: FC<{ media?: AppContent['hero']['media'] }> = ({ media }) => {
  if (!media) {
    return null;
  }

  const image = (
    <img
      src={media.src}
      alt={media.alt}
      loading="lazy"
      width={media.width ?? 640}
      height={media.height ?? 426}
    />
  );

  return (
    <figure class="hero-media">
      {media.href ? (
        <a href={media.href} target="_blank" rel="noreferrer">
          {image}
        </a>
      ) : (
        image
      )}
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
};

const HeroHighlights: FC<{ highlights: AppContent['hero']['highlights'] }> = ({ highlights }) => (
  <ul class="hero-highlights">
    {highlights.map((highlight) => (
      <li>{highlight}</li>
    ))}
  </ul>
);

const HeroShowcase: FC<{ hero: AppContent['hero'] }> = ({ hero }) => (
  <section id="hero" class="hero" data-lazy-section>
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p class="lead">{hero.description}</p>
        <div class="hero__actions">
          <a class="button" href={hero.primaryAction.href}>
            {hero.primaryAction.label}
          </a>
          <a class="button button--ghost" href={hero.secondaryAction.href}>
            {hero.secondaryAction.label}
          </a>
        </div>
        <HeroHighlights highlights={hero.highlights} />
        <div class="hero__footnotes">
          {hero.footnotes?.map((note) => (
            <p>{note}</p>
          ))}
        </div>
      </div>
      <div class="hero__aside">
        <HeroScene />
        <HeroMedia media={hero.media} />
        <HeroMetrics metrics={hero.metrics} />
      </div>
    </div>
  </section>
);

const TrustBar: FC<{ trustbar: AppContent['trustbar'] }> = ({ trustbar }) => (
  <section class="trustbar" aria-label="Trusted by partner brands">
    <div class="container">
      <h2>{trustbar.title}</h2>
      <ul data-lazy-grid>
        {trustbar.logos.map((logo) => (
          <li>
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noreferrer">
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </a>
            ) : (
              <img src={logo.src} alt={logo.name} loading="lazy" />
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const FeatureSection: FC<{ section: AppContent['features']['sections'][number] }> = ({ section }) => (
  <article id={section.id} class="feature-panel">
    <div class="feature-panel__copy">
      {section.ribbon && <span class="feature-panel__ribbon">{section.ribbon}</span>}
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.meta && <p class="feature-panel__meta">{section.meta}</p>}
    </div>
    <ul class="feature-panel__bullets">
      {section.bullets.map((bullet) => (
        <li>
          <span class="feature-panel__icon" aria-hidden="true">
            {renderIcon(bullet.icon, undefined, 'feature-panel__icon-svg') ?? (
              <span class="feature-panel__icon-fallback" aria-hidden="true">
                {bullet.icon}
              </span>
            )}
          </span>
          <div>
            <strong>{bullet.title}</strong>
            <p>{bullet.description}</p>
          </div>
        </li>
      ))}
    </ul>
    {section.media && (
      <figure class="feature-panel__media">
        <img
          src={section.media.src}
          alt={section.media.alt}
          loading="lazy"
          width={section.media.width ?? 720}
          height={section.media.height ?? 520}
        />
        {section.media.caption && (
          <figcaption>{section.media.caption}</figcaption>
        )}
      </figure>
    )}
  </article>
);

const ExperiencePillars: FC<{ pillars: AppContent['experience']['pillars'] }> = ({ pillars }) => (
  <ul class="experience-pillars" data-lazy-grid>
    {pillars.map((pillar) => (
      <li>
        <span class="experience-pillars__badge">{pillar.badge ?? '★'}</span>
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
      </li>
    ))}
  </ul>
);

const ExperienceCards: FC<{ cards: AppContent['experience']['cards'] }> = ({ cards }) => (
  <div class="experience-cards" data-lazy-grid>
    {cards.map((card) => (
      <article class="experience-card">
        <header>
          <div class="experience-card__meta">
            <span class="experience-card__index">{card.index}</span>
            <span class="experience-card__label">{card.label}</span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </header>
        <ul>
          {card.points.map((point) => (
            <li>{point}</li>
          ))}
        </ul>
        {card.metric && (
          <p class="experience-card__metric" aria-label={card.metric.label}>
            <strong>{card.metric.value}</strong>
            <span>{card.metric.label}</span>
          </p>
        )}
      </article>
    ))}
  </div>
);

const Marquee: FC<{ marquee: AppContent['marquee'] }> = ({ marquee }) => (
  <section id="marquee" class="section section--marquee" aria-label={marquee.title}>
    <div class="container section__header section__header--center">
      <p class="section__eyebrow">{marquee.title}</p>
      <h2>{marquee.subtitle}</h2>
      <p class="section__subtitle">{marquee.description}</p>
    </div>
    <div class="marquee" data-marquee>
      <div class="marquee__track" data-marquee-track>
        {marquee.ribbons.map((ribbon) => (
          <span class="marquee__pill">{ribbon}</span>
        ))}
      </div>
    </div>
    <div class="marquee__metrics" data-lazy-grid>
      {marquee.metrics.map((metric) => (
        <dl>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
          <dd class="marquee__metric-description">{metric.description}</dd>
        </dl>
      ))}
    </div>
  </section>
);

const Blueprint: FC<{ blueprint: AppContent['blueprint'] }> = ({ blueprint }) => (
  <section id="blueprint" class="section section--blueprint">
    <div class="container">
      <header class="section__header">
        <p class="section__eyebrow">{blueprint.title}</p>
        <h2>{blueprint.subtitle}</h2>
        <p class="section__subtitle">{blueprint.description}</p>
      </header>
      <div class="blueprint-grid" data-lazy-grid>
        {blueprint.layers.map((layer) => (
          <article class="blueprint-card">
            <header>
              <span class={`blueprint-card__badge blueprint-card__badge--${layer.intent}`}>
                {layer.intentLabel}
              </span>
              <h3>{layer.name}</h3>
              <p>{layer.description}</p>
            </header>
            <ul>
              {layer.capabilities.map((capability) => (
                <li>{capability}</li>
              ))}
            </ul>
            {layer.insight && <p class="blueprint-card__insight">{layer.insight}</p>}
          </article>
        ))}
      </div>
    </div>
  </section>
);

const InnovationGrid: FC<{ innovation: AppContent['innovation'] }> = ({ innovation }) => (
  <section id="innovation" class="section section--innovation">
    <div class="container">
      <header class="section__header section__header--center">
        <p class="section__eyebrow">{innovation.title}</p>
        <h2>{innovation.subtitle}</h2>
        <p class="section__subtitle">{innovation.description}</p>
      </header>
      <div class="innovation-grid" data-lazy-grid>
        {innovation.columns.map((column) => (
          <article class="innovation-card">
            <h3>{column.title}</h3>
            <p>{column.description}</p>
            <ul>
              {column.points.map((point) => (
                <li>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Journey: FC<{ journey: AppContent['journey'] }> = ({ journey }) => (
  <section id="journey" class="section section--journey">
    <div class="container">
      <header class="section__header">
        <p class="section__eyebrow">{journey.title}</p>
        <h2>{journey.subtitle}</h2>
        <p class="section__subtitle">{journey.description}</p>
      </header>
      <ol class="journey" data-lazy-grid>
        {journey.steps.map((step, index) => (
          <li>
            <div class="journey__index" aria-hidden="true">{index + 1}</div>
            <div class="journey__content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul>
                {step.details.map((detail) => (
                  <li>{detail}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const StudioShowcase: FC<{ studio: AppContent['studio'] }> = ({ studio }) => (
  <section id="studio" class="section section--studio">
    <div class="container">
      <header class="section__header section__header--split">
        <div>
          <p class="section__eyebrow">{studio.title}</p>
          <h2>{studio.subtitle}</h2>
        </div>
        <p class="section__subtitle">{studio.description}</p>
      </header>
      <div class="studio-grid" data-lazy-grid>
        {studio.cards.map((card) => (
          <article class="studio-card">
            <header>
              <span class="studio-card__icon" aria-hidden="true">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </header>
            <ul>
              {card.highlights.map((highlight) => (
                <li>{highlight}</li>
              ))}
            </ul>
            {card.badge && <span class="studio-card__badge">{card.badge}</span>}
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WorkflowSteps: FC<{ workflow: AppContent['workflow'] }> = ({ workflow }) => (
  <section id="workflow" class="section section--workflow">
    <div class="container">
      <header class="section__header">
        <h2>{workflow.title}</h2>
      </header>
      <ol class="workflow" data-lazy-grid>
        {workflow.steps.map((step, index) => (
          <li>
            <span class="workflow__index" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <a class="button button--ghost" href={workflow.cta.href}>
        {workflow.cta.label}
      </a>
    </div>
  </section>
);

const AnalyticsCards: FC<{ analytics: AppContent['analytics'] }> = ({ analytics }) => (
  <section id="analytics" class="section section--accent">
    <div class="container">
      <header class="section__header">
        <h2>{analytics.title}</h2>
        <p class="section__subtitle">{analytics.subtitle}</p>
      </header>
      <div class="analytics-grid" data-lazy-grid>
        {analytics.cards.map((card) => (
          <article class="analytics-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {card.insight && <p class="analytics-card__insight">{card.insight}</p>}
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudies: FC<{ caseStudies: AppContent['caseStudies'] }> = ({ caseStudies }) => (
  <section id="case-studies" class="section section--muted">
    <div class="container">
      <header class="section__header">
        <h2>{caseStudies.title}</h2>
      </header>
      <div class="case-studies" data-lazy-grid>
        {caseStudies.items.map((item) => (
          <article class="case-card">
            <h3>{item.name}</h3>
            <p class="case-card__headline">{item.headline}</p>
            <p>{item.summary}</p>
            <a href={item.link}>Read case study</a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials: FC<{ testimonials: AppContent['testimonials'] }> = ({ testimonials }) => (
  <section id="testimonials" class="section section--testimonials">
    <div class="container">
      <header class="section__header">
        <h2>{testimonials.title}</h2>
      </header>
      <div class="testimonial-grid" data-lazy-grid>
        {testimonials.items.map((item) => (
          <figure class="testimonial-card">
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const Pricing: FC<{ pricing: AppContent['pricing'] }> = ({ pricing }) => (
  <section id="pricing" class="section section--pricing">
    <div class="container">
      <header class="section__header section__header--center">
        <p class="section__eyebrow">{pricing.title}</p>
        <h2>{pricing.subtitle}</h2>
        <p class="section__subtitle">{pricing.description}</p>
      </header>
      <div class="pricing-highlights">
        {pricing.highlights.map((highlight) => (
          <div class="pricing-highlight">
            <span class="pricing-highlight__icon" aria-hidden="true">{highlight.icon}</span>
            <div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div class="pricing-grid" data-lazy-grid>
        {pricing.plans.map((plan) => (
          <article
            class={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}`}
            data-plan-intensity={plan.accent ?? 'calm'}
          >
            {plan.popular && <span class="badge">{plan.badge ?? 'Most popular'}</span>}
            <header>
              <div class="pricing-card__header">
                <h3>{plan.name}</h3>
                <p class="pricing-card__tagline">{plan.tagline}</p>
              </div>
              <p class="pricing-card__price">
                {plan.price}
                <span>{plan.billing}</span>
              </p>
            </header>
            <ul class="pricing-card__features">
              {plan.features.map((feature) => (
                <li>{feature}</li>
              ))}
            </ul>
            {plan.services && (
              <div class="pricing-card__services">
                <h4>{pricing.serviceLabel}</h4>
                <ul>
                  {plan.services.map((service) => (
                    <li>{service}</li>
                  ))}
                </ul>
              </div>
            )}
            <a class="button" href={plan.cta?.href ?? '#book'}>
              {plan.cta?.label ?? pricing.ctaLabel}
            </a>
          </article>
        ))}
      </div>
      <div class="pricing__footer">
        <p>{pricing.guarantee}</p>
        <div class="pricing__note">
          <span aria-hidden="true">★</span>
          <p>{pricing.note}</p>
        </div>
      </div>
    </div>
  </section>
);

const FAQ: FC<{ faq: AppContent['faq'] }> = ({ faq }) => (
  <section id="faq" class="section section--faq">
    <div class="container">
      <header class="section__header">
        <h2>{faq.title}</h2>
      </header>
      <div class="faq" data-lazy-accordion>
        {faq.items.map((item) => (
          <details>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Blog: FC<{ blog: AppContent['blog'] }> = ({ blog }) => (
  <section id="blog" class="section section--blog">
    <div class="container">
      <header class="section__header section__header--center">
        <p class="section__eyebrow">{blog.title}</p>
        <h2>{blog.subtitle}</h2>
        <p class="section__subtitle">{blog.description}</p>
      </header>
      <div class="blog-grid" data-lazy-grid>
        {blog.articles.map((article) => (
          <article class="blog-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.href}>{article.cta ?? 'Read article'}</a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CTA: FC<{ cta: AppContent['cta'] }> = ({ cta }) => (
  <section class="section section--cta">
    <div class="container section--cta__inner">
      <div class="cta__copy">
        <h2>{cta.title}</h2>
        <p>{cta.subtitle}</p>
      </div>
      <div class="cta__actions">
        <a class="button" href={cta.primaryAction.href}>
          {cta.primaryAction.label}
        </a>
        <a class="button button--ghost" href={cta.secondaryAction.href}>
          {cta.secondaryAction.label}
        </a>
      </div>
    </div>
  </section>
);

const Footer: FC<{ footer: AppContent['footer'] }> = ({ footer }) => {
  const year = String(new Date().getFullYear());
  const legalCopy = footer.legal?.replace('{year}', year) ?? footer.legal;

  return (
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__brand">
          <p class="logo">Insta-Webyar</p>
          <p>{footer.tagline}</p>
          <ul class="footer-links">
            {footer.links.map((link) => (
              <li>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div class="site-footer__columns">
          {footer.columns.map((column) => (
            <div>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div class="site-footer__legal">
        <div class="container">
          <small>{legalCopy}</small>
        </div>
      </div>
    </footer>
  );
};

export const Layout: FC<{ content: AppContent; locale: string; locales: string[] }> = ({
  content,
  locale,
  locales
}) => {
  const { meta } = content;
  const keywords = meta.keywords?.join(', ');

  const htmlLang = meta.lang ?? locale ?? meta.locale?.split('_')[0] ?? defaultLocale;
  const direction = meta.direction ?? (htmlLang === 'fa' || htmlLang === 'ar' ? 'rtl' : 'ltr');

  return (
    <html lang={htmlLang} dir={direction} data-theme="light" class="theme--light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {meta.author && <meta name="author" content={meta.author} />}
        {meta.robots && <meta name="robots" content={meta.robots} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {meta.canonical && <link rel="canonical" href={meta.canonical} />}
        {locales.map((availableLocale) => {
          const href =
            availableLocale === locale
              ? meta.canonical ?? createLocaleHref(availableLocale)
              : createLocaleHref(availableLocale);
          return (
            <link rel="alternate" hrefLang={availableLocale} href={href} />
          );
        })}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        {meta.canonical && <meta property="og:url" content={meta.canonical} />}
        {meta.siteName && <meta property="og:site_name" content={meta.siteName} />}
        {meta.locale && <meta property="og:locale" content={meta.locale} />}
        {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
        {meta.ogImageAlt && (
          <meta property="og:image:alt" content={meta.ogImageAlt} />
        )}
        {meta.twitterCard && (
          <meta name="twitter:card" content={meta.twitterCard} />
        )}
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
        {meta.twitterHandle && (
          <meta name="twitter:site" content={meta.twitterHandle} />
        )}
        {meta.twitterHandle && (
          <meta name="twitter:creator" content={meta.twitterHandle} />
        )}
        {meta.themeColorLight && (
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content={meta.themeColorLight}
          />
        )}
        {meta.themeColorDark && (
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content={meta.themeColorDark}
          />
        )}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/vazirmatn@33.003/FD/vazirmatn.min.css"
          integrity="sha384-VzPiGAYnJj1D7hMy3lLt4JahjexL+aSmkMeVxwYPNhLUqbl+J5zzSvs0gDEqCLrX"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/styles.css" />
        <link rel="stylesheet" href="/assets/legendary-theme.css" />
        <ThemeScript />
      </head>
      <body class="page-shell">
        <AnnouncementBar announcement={content.announcement} />
        <header class="site-header" id="top" data-lazy-section>
          <div class="container site-header__inner">
            <a class="logo" href="#hero">Insta-Webyar</a>
            <Navigation items={content.navigation} />
            <div class="site-header__actions">
              <LanguageSwitcher currentLocale={locale} locales={locales} />
              <a class="button button--ghost" href={content.hero.primaryAction.href}>
                {content.hero.primaryAction.label}
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main>
          <HeroShowcase hero={content.hero} />

          <TrustBar trustbar={content.trustbar} />

          <Marquee marquee={content.marquee} />

          <section id="features" class="section section--features">
            <div class="container">
              <header class="section__header">
                <p class="section__eyebrow">{content.features.eyebrow}</p>
                <h2>{content.features.title}</h2>
                <p class="section__subtitle">{content.features.subtitle}</p>
              </header>
              <div class="feature-panels" data-lazy-grid>
                {content.features.sections.map((section) => (
                  <FeatureSection section={section} />
                ))}
              </div>
            </div>
          </section>

          <section id="experience" class="section section--experience" data-lazy-section>
            <div class="container">
              <header class="section__header">
                <p class="section__eyebrow">{content.experience.eyebrow}</p>
                <h2>{content.experience.title}</h2>
                <p class="section__subtitle">{content.experience.subtitle}</p>
              </header>
              <ExperiencePillars pillars={content.experience.pillars} />
              <ExperienceCards cards={content.experience.cards} />
            </div>
          </section>

          <Blueprint blueprint={content.blueprint} />

          <InnovationGrid innovation={content.innovation} />

          <WorkflowSteps workflow={content.workflow} />

          <AnalyticsCards analytics={content.analytics} />

          <Journey journey={content.journey} />

          <CaseStudies caseStudies={content.caseStudies} />

          <StudioShowcase studio={content.studio} />

          <Testimonials testimonials={content.testimonials} />

          <Pricing pricing={content.pricing} />

          <FAQ faq={content.faq} />

          <Blog blog={content.blog} />

          <CTA cta={content.cta} />
        </main>

        <Footer footer={content.footer} />

        <script type="module" src="/assets/theme-toggle.js"></script>
        <script type="module" src="/assets/hero-scene.js" defer></script>
        <script type="module" src="/assets/lazy-panels.js" defer></script>
      </body>
    </html>
  );
};
