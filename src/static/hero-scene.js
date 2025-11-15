const themeColors = {
  light: {
    mesh: '#6b8af6',
    emissive: '#a8c1ff',
    light: 0.8
  },
  dark: {
    mesh: '#7dd3fc',
    emissive: '#0ea5e9',
    light: 1.1
  }
};

const getTheme = () => document.documentElement.dataset.theme || 'light';

const init = async () => {
  const canvas = document.querySelector('[data-hero-scene]');
  if (!canvas) {
    return;
  }

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let three;
  try {
    three = await import('https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js');
  } catch (error) {
    console.warn('[hero-scene] Unable to load three.js', error);
    return;
  }
  const scene = new three.Scene();

  const renderer = new three.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  const resize = () => {
    const width = canvas.clientWidth || canvas.parentElement?.clientWidth || 480;
    const height = canvas.clientHeight || width * 0.66;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const camera = new three.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 1.8, 4.6);

  const geometry = new three.PlaneGeometry(6, 4, 48, 32);
  const material = new three.MeshStandardMaterial({
    color: new three.Color(themeColors[getTheme()].mesh),
    emissive: new three.Color(themeColors[getTheme()].emissive),
    metalness: 0.2,
    roughness: 0.4
  });
  const wave = new three.Mesh(geometry, material);
  wave.rotation.x = -Math.PI / 3;
  wave.position.y = -0.5;
  scene.add(wave);

  const ambient = new three.AmbientLight(0xffffff, themeColors[getTheme()].light * 0.5);
  scene.add(ambient);

  const directional = new three.DirectionalLight(0xffffff, themeColors[getTheme()].light);
  directional.position.set(2.5, 4, 2.5);
  scene.add(directional);

  const clock = new three.Clock();
  const position = geometry.attributes.position;

  const updateTheme = (nextTheme) => {
    const palette = themeColors[nextTheme] || themeColors.light;
    material.color = new three.Color(palette.mesh);
    material.emissive = new three.Color(palette.emissive);
    ambient.intensity = palette.light * 0.5;
    directional.intensity = palette.light;
  };

  const handleThemeChange = (event) => {
    updateTheme(event?.detail || getTheme());
    renderFrame();
  };

  document.addEventListener('insta-theme-change', handleThemeChange);

  const renderFrame = () => {
    const elapsed = clock.getElapsedTime();
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = Math.sin(x * 1.8 + elapsed * 1.1) * 0.18 + Math.cos(y * 1.6 - elapsed * 0.8) * 0.14;
      position.setZ(i, z);
    }
    position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  let rafId;

  const loop = () => {
    renderFrame();
    rafId = requestAnimationFrame(loop);
  };

  resize();
  renderFrame();

  if (!shouldReduceMotion) {
    loop();
  }

  const handleVisibility = () => {
    if (shouldReduceMotion) {
      return;
    }
    if (document.hidden) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
    } else if (!rafId) {
      loop();
    }
  };

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', handleVisibility);
  updateTheme(getTheme());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
