const root = document.documentElement;
root.classList.add('has-js');

const sections = Array.from(document.querySelectorAll('[data-lazy-section]'));
if (!sections.length) {
  root.classList.add('lazy-ready');
} else {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = (section) => {
    if (section.classList.contains('is-visible')) {
      return;
    }
    section.classList.add('is-visible');
    section.querySelectorAll('[data-lazy-media]').forEach((media) => {
      const dataSrc = media.getAttribute('data-src');
      if (dataSrc && media.tagName === 'IMG' && media.getAttribute('src') !== dataSrc) {
        media.setAttribute('src', dataSrc);
      }
      const dataSrcSet = media.getAttribute('data-srcset');
      if (dataSrcSet && media.tagName === 'IMG') {
        media.setAttribute('srcset', dataSrcSet);
      }
      const dataBg = media.getAttribute('data-bg');
      if (dataBg) {
        media.style.setProperty('--lazy-background-image', `url(${dataBg})`);
      }
    });
    if (sections.every((node) => node.classList.contains('is-visible'))) {
      root.classList.add('lazy-ready');
    }
  };

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    sections.forEach((section) => reveal(section));
    root.classList.add('lazy-ready');
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
