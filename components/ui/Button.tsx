import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'olive' | 'dark';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  readonly variant?: ButtonVariant;
  readonly size?: 'default' | 'small';
  readonly wide?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  olive: 'border-olive bg-olive text-white hover:border-olive-dark hover:bg-olive-dark',
  dark: 'border-charcoal bg-charcoal text-white hover:border-charcoal-deep hover:bg-charcoal-deep',
};

export function ButtonLink({
  variant = 'olive',
  size = 'default',
  wide = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-[2px] border text-[0.91rem] font-bold tracking-[0.02em] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5',
        size === 'small' ? 'min-h-[44px] px-[18px]' : 'min-h-[54px] px-[26px]',
        wide && 'w-full',
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
export function TextLink({
  className,
  children,
  arrow = '→',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { readonly arrow?: string }) {
  return (
    <a
      className={cn('inline-flex items-center gap-3.5 border-b border-current pb-1 font-bold', className)}
      {...props}
    >
      {children}
      <span aria-hidden="true">{arrow}</span>
    </a>
  );
}
