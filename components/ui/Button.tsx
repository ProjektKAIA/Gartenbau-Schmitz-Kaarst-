import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'solid' | 'light' | 'bronze';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  readonly variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  solid: 'border-pine bg-pine text-white hover:bg-pine-light',
  light: 'border-cream bg-cream text-pine hover:bg-white',
  bronze: 'border-bronze bg-bronze text-white hover:brightness-110',
};

/** Flächiger Button des Entwurfs – bewusst ohne Radius, 54px hoch (Touch-Target). */
export function ButtonLink({ variant = 'solid', className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex min-h-[54px] items-center justify-center border px-[25px] text-[0.9rem] font-bold transition-[transform,background-color] duration-200 hover:-translate-y-0.5',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/** Textlink mit Unterstrich und Pfeil. */
export function ArrowLink({
  className,
  children,
  arrow = '→',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { readonly arrow?: string }) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-5 border-b border-current pb-1 text-[0.9rem] font-bold',
        className,
      )}
      {...props}
    >
      {children}
      <span aria-hidden="true">{arrow}</span>
    </a>
  );
}
