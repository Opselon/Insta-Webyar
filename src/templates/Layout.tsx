import type { FC } from 'hono/jsx';
import type { AppContent } from '../utils/i18n';
import { ThemeScript, ThemeToggle } from './ThemeToggle';

const LazySectionsScript = () => (
  <script type="module" src="/assets/progressive-sections.js"></script>
);

const AnnouncementBar: FC<{ announcement: AppContent['announcement'] }> = ({ announcement }) => (
  <div class="announcement" role="region" aria-label="Product update">
    <div class="container announcement__inner">
      <span class="announcement__label">{announcement.label}</span>
      <p class="announcement__message">{announcement.message}</p>
      <a class="announcement__link" href={announcement.href}>
        View what's new
      </a>
    </div>
  </div>
);

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

const TrustBar: FC<{ trustbar: AppContent['trustbar'] }> = ({ trustbar }) => (
  <section
    class="trustbar"
    aria-label="Trusted by partner brands"
    data-lazy-section
  >
    <div class="container">
      <h2>{trustbar.title}</h2>
      <ul>
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
      <h3>{section.title}</h3>
      <p>{section.description}</p>
    </div>
    <ul class="feature-panel__bullets">
      {section.bullets.map((bullet) => (
        <li>
          <span class="feature-panel__icon" aria-hidden="true">
            {bullet.icon}
          </span>
          <div>
            <strong>{bullet.title}</strong>
            <p>{bullet.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </article>
);

const ExperiencePillars: FC<{ pillars: AppContent['experience']['pillars'] }> = ({ pillars }) => (
  <ul class="experience-pillars">
    {pillars.map((pillar) => (
      <li>
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
      </li>
    ))}
  </ul>
);

const ExperienceCards: FC<{ cards: AppContent['experience']['cards'] }> = ({ cards }) => (
  <div class="experience-cards">
    {cards.map((card) => (
      <article class="experience-card">
        <header>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </header>
        <ul>
          {card.points.map((point) => (
            <li>{point}</li>
          ))}
        </ul>
      </article>
    ))}
  </div>
);

const WorkflowSteps: FC<{ workflow: AppContent['workflow'] }> = ({ workflow }) => (
  <section id="workflow" class="section section--workflow" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{workflow.title}</h2>
      </header>
      <ol class="workflow">
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
  <section id="analytics" class="section section--accent" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{analytics.title}</h2>
        <p class="section__subtitle">{analytics.subtitle}</p>
      </header>
      <div class="analytics-grid">
        {analytics.cards.map((card) => (
          <article class="analytics-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ShowcaseGallery: FC<{ showcase: AppContent['showcase'] }> = ({ showcase }) => (
  <section id="showcase" class="section section--showcase" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{showcase.title}</h2>
        <p class="section__subtitle">{showcase.subtitle}</p>
      </header>
      <div class="showcase-grid">
        {showcase.gallery.map((item) => {
          const media = (
            <figure class="showcase-card__media">
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={item.width ?? 720}
                height={item.height ?? 480}
                data-lazy-media
              />
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          );

          return (
            <article class="showcase-card">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {media}
                </a>
              ) : (
                media
              )}
              <div class="showcase-card__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      {showcase.cta && (
        <div class="showcase-cta">
          <a class="button button--ghost" href={showcase.cta.href}>
            {showcase.cta.label}
          </a>
        </div>
      )}
    </div>
  </section>
);

const BlueprintTimeline: FC<{ blueprints: AppContent['blueprints'] }> = ({ blueprints }) => (
  <section id="blueprints" class="section section--blueprints" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{blueprints.title}</h2>
        <p class="section__subtitle">{blueprints.subtitle}</p>
      </header>
      <ol class="blueprint-timeline">
        {blueprints.steps.map((step, index) => (
          <li class="blueprint-step">
            <div class="blueprint-step__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div class="blueprint-step__body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul class="blueprint-step__points">
                {step.points.map((point) => (
                  <li>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <a class="button button--ghost" href={blueprints.cta.href}>
        {blueprints.cta.label}
      </a>
    </div>
  </section>
);

const PlaygroundSection: FC<{ playground: AppContent['playground'] }> = ({ playground }) => (
  <section id="playground" class="section section--playground" data-lazy-section>
    <div class="container section--playground__inner">
      <div class="playground__copy">
        <header class="section__header">
          <h2>{playground.title}</h2>
          <p class="section__subtitle">{playground.subtitle}</p>
        </header>
        <div class="playground-grid">
          {playground.actions.map((action) => (
            <a class="playground-card" href={action.href}>
              <span class="playground-card__icon" aria-hidden="true">
                {action.icon}
              </span>
              <div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      {playground.preview && (
        <figure class="playground-preview">
          <img
            src={playground.preview.image}
            alt={playground.preview.alt}
            loading="lazy"
            width={playground.preview.width ?? 960}
            height={playground.preview.height ?? 540}
            data-lazy-media
          />
          {playground.preview.caption && (
            <figcaption>{playground.preview.caption}</figcaption>
          )}
        </figure>
      )}
    </div>
  </section>
);

const LocalizationMatrix: FC<{ localization: AppContent['localization'] }> = ({ localization }) => (
  <section id="localization" class="section section--localization" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{localization.title}</h2>
        <p class="section__subtitle">{localization.subtitle}</p>
      </header>
      <div class="localization-grid">
        {localization.locales.map((locale) => (
          <article class="localization-card">
            <header>
              <h3>{locale.name}</h3>
              <span class="localization-card__code">{locale.code}</span>
            </header>
            <p>{locale.description}</p>
            <p class="localization-card__audience">{locale.audience}</p>
          </article>
        ))}
      </div>
      <a class="button button--ghost" href={localization.cta.href}>
        {localization.cta.label}
      </a>
    </div>
  </section>
);

const IntegrationsShowcase: FC<{ integrations: AppContent['integrations'] }> = ({ integrations }) => (
  <section id="integrations" class="section section--integrations" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{integrations.title}</h2>
        <p class="section__subtitle">{integrations.subtitle}</p>
      </header>
      <div class="integrations-grid">
        {integrations.categories.map((category) => (
          <article class="integration-card">
            <header>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </header>
            <ul class="integration-logos">
              {category.logos.map((logo) => (
                <li>
                  <a href={logo.href} target="_blank" rel="noreferrer">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      width={logo.width ?? 72}
                      height={logo.height ?? 72}
                      data-lazy-media
                    />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <a class="button" href={integrations.cta.href}>
        {integrations.cta.label}
      </a>
    </div>
  </section>
);

const CommunitySpotlight: FC<{ community: AppContent['community'] }> = ({ community }) => (
  <section id="community" class="section section--community" data-lazy-section>
    <div class="container community-layout">
      <div class="community-intro">
        <header class="section__header">
          <h2>{community.title}</h2>
          <p class="section__subtitle">{community.subtitle}</p>
        </header>
        <div class="community-stats">
          {community.stats.map((stat) => (
            <div class="community-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div class="community-feed">
        {community.highlights.map((highlight) => (
          <article class="community-card">
            <h3>{highlight.title}</h3>
            <p>{highlight.summary}</p>
            <a href={highlight.href}>{highlight.cta}</a>
          </article>
        ))}
      </div>
      <aside class="community-testimonials">
        {community.testimonials.map((testimonial) => (
          <figure class="community-testimonial">
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </aside>
    </div>
  </section>
);

const CaseStudies: FC<{ caseStudies: AppContent['caseStudies'] }> = ({ caseStudies }) => (
  <section id="case-studies" class="section section--muted" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{caseStudies.title}</h2>
      </header>
      <div class="case-studies">
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
  <section id="testimonials" class="section section--testimonials" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{testimonials.title}</h2>
      </header>
      <div class="testimonial-grid">
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
  <section id="pricing" class="section section--pricing" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{pricing.title}</h2>
        <p class="section__subtitle">{pricing.subtitle}</p>
      </header>
      <div class="pricing-grid">
        {pricing.plans.map((plan) => (
          <article class={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}`}>
            {plan.popular && <span class="badge">Most popular</span>}
            <h3>{plan.name}</h3>
            <p class="pricing-card__price">
              {plan.price}
              <span>{plan.billing}</span>
            </p>
            <ul>
              {plan.features.map((feature) => (
                <li>{feature}</li>
              ))}
            </ul>
            <a class="button" href="#book">
              Select plan
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FAQ: FC<{ faq: AppContent['faq'] }> = ({ faq }) => (
  <section id="faq" class="section section--faq" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{faq.title}</h2>
      </header>
      <div class="faq">
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
  <section id="blog" class="section section--blog" data-lazy-section>
    <div class="container">
      <header class="section__header">
        <h2>{blog.title}</h2>
      </header>
      <div class="blog-grid">
        {blog.articles.map((article) => (
          <article class="blog-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.href}>Read article</a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CTA: FC<{ cta: AppContent['cta'] }> = ({ cta }) => (
  <section class="section section--cta" data-lazy-section>
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

export const Layout: FC<{ content: AppContent }> = ({ content }) => {
  const { meta } = content;
  const keywords = meta.keywords?.join(', ');

  const htmlLang = meta.lang ?? meta.locale?.split('_')[0] ?? 'en';
  const direction = meta.direction ?? (htmlLang === 'fa' || htmlLang === 'ar' ? 'rtl' : 'ltr');

  return (
    <html lang={htmlLang} dir={direction} data-theme="light" class="theme--light no-js">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {meta.author && <meta name="author" content={meta.author} />}
        {meta.robots && <meta name="robots" content={meta.robots} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {meta.canonical && <link rel="canonical" href={meta.canonical} />}
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
        <ThemeScript />
      </head>
      <body class="page-shell">
      <AnnouncementBar announcement={content.announcement} />
      <header class="site-header" id="top">
        <div class="container site-header__inner">
          <a class="logo" href="#hero">Insta-Webyar</a>
          <Navigation items={content.navigation} />
          <div class="site-header__actions">
            <a class="button button--ghost" href="#book">
              Book demo
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section id="hero" class="hero">
          <div class="container hero__inner">
            <div class="hero__copy">
              <p class="eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p class="lead">{content.hero.description}</p>
              <div class="hero__actions">
                <a class="button" href={content.hero.primaryAction.href}>
                  {content.hero.primaryAction.label}
                </a>
                <a class="button button--ghost" href={content.hero.secondaryAction.href}>
                  {content.hero.secondaryAction.label}
                </a>
              </div>
              <HeroHighlights highlights={content.hero.highlights} />
            </div>
          <div class="hero__aside">
              <HeroMedia media={content.hero.media} />
              <HeroMetrics metrics={content.hero.metrics} />
            </div>
          </div>
        </section>

        <TrustBar trustbar={content.trustbar} />

        <section
          id="features"
          class="section section--features"
          data-lazy-section
        >
          <div class="container">
            <header class="section__header">
              <h2>{content.features.title}</h2>
              <p class="section__subtitle">{content.features.subtitle}</p>
            </header>
            <div class="feature-panels">
              {content.features.sections.map((section) => (
                <FeatureSection section={section} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          class="section section--experience"
          data-lazy-section
        >
          <div class="container">
            <header class="section__header">
              <h2>{content.experience.title}</h2>
              <p class="section__subtitle">{content.experience.subtitle}</p>
            </header>
            <ExperiencePillars pillars={content.experience.pillars} />
            <ExperienceCards cards={content.experience.cards} />
          </div>
        </section>

        <WorkflowSteps workflow={content.workflow} />

        <AnalyticsCards analytics={content.analytics} />

        <ShowcaseGallery showcase={content.showcase} />

        <BlueprintTimeline blueprints={content.blueprints} />

        <PlaygroundSection playground={content.playground} />

        <LocalizationMatrix localization={content.localization} />

        <IntegrationsShowcase integrations={content.integrations} />

        <CommunitySpotlight community={content.community} />

        <CaseStudies caseStudies={content.caseStudies} />

        <Testimonials testimonials={content.testimonials} />

        <Pricing pricing={content.pricing} />

        <FAQ faq={content.faq} />

        <Blog blog={content.blog} />

        <CTA cta={content.cta} />
      </main>

      <Footer footer={content.footer} />

        <script type="module" src="/assets/theme-toggle.js"></script>
        <LazySectionsScript />
      </body>
    </html>
  );
};
