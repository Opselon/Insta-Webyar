import type { FC } from 'hono/jsx';

type IconProps = {
  title?: string;
  className?: string;
};

const BaseSvg: FC<IconProps & { children: JSX.Element | JSX.Element[] }> = ({
  title,
  className,
  children
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-hidden={title ? undefined : 'true'}
    class={className}
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

export const SunIcon: FC<IconProps> = ({ title, className }) => (
  <BaseSvg title={title} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2.5" />
    <path d="M12 18.5V21" />
    <path d="M4.7 4.7 6.4 6.4" />
    <path d="M17.6 17.6 19.3 19.3" />
    <path d="M3 12h2.5" />
    <path d="M18.5 12H21" />
    <path d="M4.7 19.3 6.4 17.6" />
    <path d="M17.6 6.4 19.3 4.7" />
  </BaseSvg>
);

export const MoonIcon: FC<IconProps> = ({ title, className }) => (
  <BaseSvg title={title} className={className}>
    <path d="M18.2 15.9a6.8 6.8 0 0 1-9.8-9.4 7.2 7.2 0 1 0 9.8 9.4Z" />
  </BaseSvg>
);
