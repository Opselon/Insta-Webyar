import type { FC } from 'hono/jsx';

export type IconId =
  | 'palette'
  | 'brain'
  | 'joystick'
  | 'shield'
  | 'handshake'
  | 'box'
  | 'bolt'
  | 'chart'
  | 'loop'
  | 'target'
  | 'globe'
  | 'layers'
  | 'sparkles'
  | 'cloud'
  | 'radar'
  | 'blueprint'
  | 'wand'
  | 'lock'
  | 'chat';

type IconProps = {
  title?: string;
  className?: string;
};

type IconComponent = FC<IconProps>;

const createSvg = (
  children: JSX.Element | JSX.Element[],
  viewBox = '0 0 24 24'
): IconComponent => ({ title, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    role="img"
    aria-hidden={title ? undefined : 'true'}
    class={`icon${className ? ` ${className}` : ''}`}
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

const PaletteIcon = createSvg([
  <circle cx="12" cy="12" r="7.5" />,
  <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />,
  <circle cx="12.6" cy="8.8" r="0.9" fill="currentColor" stroke="none" />,
  <circle cx="15" cy="11.4" r="0.9" fill="currentColor" stroke="none" />,
  <path d="M10.6 15.3c1.8-.7 4.2-.7 5.7.4" />
]);

const BrainIcon = createSvg([
  <path d="M9.5 4.5c-1.7 0-3 1.4-3 3v.9c-1.2.7-2 2-2 3.4 0 1.4.8 2.7 2 3.4v1.4c0 1.7 1.3 3 3 3" />,
  <path d="M14.5 4.5c1.7 0 3 1.4 3 3v.9c1.2.7 2 2 2 3.4 0 1.4-.8 2.7-2 3.4v1.4c0 1.7-1.3 3-3 3" />,
  <path d="M9.5 8c1 0 1.8.8 1.8 1.8s-.8 1.7-1.8 1.7" />,
  <path d="M14.5 8c-1 0-1.8.8-1.8 1.8s.8 1.7 1.8 1.7" />
]);

const JoystickIcon = createSvg([
  <circle cx="12" cy="8" r="2.2" />,
  <path d="M9 12h6" />,
  <path d="M8 16.5h8" />,
  <path d="M7 19.5h10" />
]);

const ShieldIcon = createSvg([
  <path d="M12 3.5 18 5.7v5.4c0 3.8-2.6 7.3-6 8.9-3.4-1.6-6-5.1-6-8.9V5.7Z" />
]);

const HandshakeIcon = createSvg([
  <path d="M7 11 4.5 8.5c-1-1-1-2.7 0-3.7 1-1 2.7-1 3.7 0l3 3" />,
  <path d="M17 11l2.5-2.5c1-1 1-2.7 0-3.7-1-1-2.7-1-3.7 0l-3 3" />,
  <path d="m8.5 13.5 2 2c1 1 2.6 1 3.6 0l2.4-2.4" />,
  <path d="m6.8 12.8 3.8 3.7" />,
  <path d="m12.4 12.4 3.7 3.7" />
]);

const BoxIcon = createSvg([
  <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />,
  <path d="M20 7.5v9L12 21l-8-4.5v-9" />,
  <path d="M12 12v9" />
]);

const BoltIcon = createSvg([
  <path d="M13.5 2.5 6.5 13h5l-1 8 7-10.5h-5Z" />
]);

const ChartIcon = createSvg([
  <path d="M5 18.5h14" />,
  <path d="M7.5 15V9.5" />,
  <path d="M12 15V6.5" />,
  <path d="M16.5 15v-4" />
]);

const LoopIcon = createSvg([
  <path d="M8 17H6a4 4 0 0 1 0-8h2" />,
  <path d="m9.5 19.5-1.5-2.5 1.5-2.5" />,
  <path d="M16 7h2a4 4 0 0 1 0 8h-2" />,
  <path d="m14.5 4.5 1.5 2.5-1.5 2.5" />
]);

const TargetIcon = createSvg([
  <circle cx="12" cy="12" r="6.5" />,
  <circle cx="12" cy="12" r="3.5" />,
  <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
]);

const GlobeIcon = createSvg([
  <circle cx="12" cy="12" r="7.5" />,
  <path d="M4.8 9h14.4" />,
  <path d="M4.8 15h14.4" />,
  <path d="M12 4.5c2.4 2.6 2.4 12.4 0 15" />,
  <path d="M12 4.5c-2.4 2.6-2.4 12.4 0 15" />
]);

const LayersIcon = createSvg([
  <path d="m12 5 7 4-7 4-7-4Z" />,
  <path d="m5 13 7 4 7-4" />,
  <path d="m5 17 7 4 7-4" />
]);

const SparklesIcon = createSvg([
  <path d="M12 5.5 13.6 9l3.4 1.4L13.6 12l-1.6 3.5L10.4 12 7 10.4 10.4 9Z" />,
  <path d="M6.5 4 7.4 6l2 .6-2 .6-.9 2-.9-2-2-.6 2-.6Z" />,
  <path d="M16.5 14l.9 2 2 .6-2 .6-.9 2-.9-2-2-.6 2-.6Z" />
]);

const CloudIcon = createSvg([
  <path d="M8.5 18.5h8.5a3 3 0 0 0 .5-6 4.5 4.5 0 0 0-8.8-1.4A3.5 3.5 0 0 0 8.5 18.5Z" />
]);

const RadarIcon = createSvg([
  <circle cx="12" cy="12" r="7.5" />,
  <circle cx="12" cy="12" r="4.5" />,
  <path d="M12 12 16.5 7.5" />,
  <path d="M12 4.5v3" />,
  <path d="M19.5 12h-3" />
]);

const BlueprintIcon = createSvg([
  <path d="M6.5 4.5h8.5a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-8.5a2.5 2.5 0 0 1-2.5-2.5V7a2.5 2.5 0 0 1 2.5-2.5Z" />,
  <path d="M9 9h6" />,
  <path d="M9 12h6" />,
  <path d="M9 15h4" />
]);

const WandIcon = createSvg([
  <path d="M5 18.5 18 5.5" />,
  <path d="M7.5 5 8 3.5 9.5 3" />,
  <path d="M15 20.5 15.5 19 17 18.5" />,
  <path d="M17.5 10 19 9.5 19.5 8" />
]);

const LockIcon = createSvg([
  <rect x="6.5" y="11" width="11" height="9" rx="2" />,
  <path d="M9 11V8a3 3 0 0 1 6 0v3" />,
  <circle cx="11.75" cy="15.5" r="1" fill="currentColor" stroke="none" />,
  <path d="M12 16.5v1.8" />
]);

const ChatIcon = createSvg([
  <path d="M6.5 6.5h11a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-4.2l-3.6 3.5v-3.5H6.5A2.5 2.5 0 0 1 4 14V9a2.5 2.5 0 0 1 2.5-2.5Z" />,
  <path d="M9 11h6" />,
  <path d="M9 14h3.5" />
]);

export const iconRegistry: Record<IconId, IconComponent> = {
  palette: PaletteIcon,
  brain: BrainIcon,
  joystick: JoystickIcon,
  shield: ShieldIcon,
  handshake: HandshakeIcon,
  box: BoxIcon,
  bolt: BoltIcon,
  chart: ChartIcon,
  loop: LoopIcon,
  target: TargetIcon,
  globe: GlobeIcon,
  layers: LayersIcon,
  sparkles: SparklesIcon,
  cloud: CloudIcon,
  radar: RadarIcon,
  blueprint: BlueprintIcon,
  wand: WandIcon,
  lock: LockIcon,
  chat: ChatIcon
};

export const renderIcon = (id: string, title?: string, className?: string) => {
  const Icon = iconRegistry[id as IconId];
  if (!Icon) {
    return null;
  }
  return <Icon title={title} className={className} />;
};
