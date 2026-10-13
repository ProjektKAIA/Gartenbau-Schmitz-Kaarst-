import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Alle Buttons/Textlinks laufen über next/link: interne Ziele („/shop", „/#kontakt") ohne
 * Neuladen der Seite, externe sowie tel:/mailto: rendert Link als normalen Anker.
 */
type LinkProps = ComponentProps<typeof Link>;

export type ButtonVariant = 'olive' | 'dark' | 'light';

type ButtonLinkProps = LinkProps & {
  readonly variant?: ButtonVariant;
  readonly size?: 'default' | 'small';
  readonly wide?: boolean;
};

/** Farben je Variante – einzige Quelle, auch für <button>-Elemente in Formularen. */
export const buttonVariants: Record<ButtonVariant, string> = {
  olive: 'border-olive bg-olive text-white hover:border-olive-dark hover:bg-olive-dark',
  dark: 'border-charcoal bg-charcoal text-white hover:border-charcoal-deep hover:bg-charcoal-deep',
  light: 'border-white bg-white text-charcoal hover:border-mist hover:bg-mist',
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
    <Link
      className={cn(
        'inline-flex items-center justify-center rounded-[2px] border text-[0.91rem] font-bold tracking-[0.02em] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5',
        size === 'small' ? 'min-h-[44px] px-[18px]' : 'min-h-[54px] px-[26px]',
        wide && 'w-full',
        buttonVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Textlink mit Unterstrich und Pfeil. */
export function TextLink({
  className,
  children,
  arrow = '→',
  ...props
}: LinkProps & { readonly arrow?: string }) {
  return (
    <Link
      className={cn('inline-flex items-center gap-3.5 border-b border-current pb-1 font-bold', className)}
      {...props}
    >
      {children}
      <span aria-hidden="true">{arrow}</span>
    </Link>
  );
}
