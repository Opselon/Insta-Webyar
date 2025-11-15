const selectors = ['[data-lazy-section]', '[data-lazy-grid]', '[data-lazy-accordion]', '.hero', '.site-header'];

const revealInstantly = () => {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add('is-visible');
      if ('lazyGrid' in element.dataset) {
        element.querySelectorAll(':scope > *').forEach((child) => {
          child.style.transitionDelay = '0ms';
        });
      }
    });
  });
};

const run = () => {
  if (!('IntersectionObserver' in window)) {
    revealInstantly();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if ('lazyGrid' in entry.target.dataset) {
            entry.target.querySelectorAll(':scope > *').forEach((child, index) => {
              child.style.transitionDelay = `${index * 60}ms`;
            });
          }
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '120px'
    }
  );

  const register = (selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if ('observe' in io) {
        io.observe(element);
      }
    });
  };

  selectors.forEach((selector) => {
    register(selector);
  });

  document.querySelectorAll('[data-lazy-grid]').forEach((grid) => {
    grid.dataset.lazyGrid = '';
  });

  const marquee = document.querySelector('[data-marquee]');
  if (marquee) {
    const track = marquee.querySelector('[data-marquee-track]');
    if (track && !marquee.dataset.marqueeReady) {
      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('marquee__track--clone');
      marquee.appendChild(clone);
      marquee.dataset.marqueeReady = 'true';
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run);
    } else {
      run();
    }
  });
} else {
  run();
}
