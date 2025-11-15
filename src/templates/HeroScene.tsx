import type { FC } from 'hono/jsx';

export const HeroScene: FC = () => (
  <div class="hero-scene" aria-hidden="true">
    <canvas data-hero-scene width="480" height="320" />
  </div>
);
