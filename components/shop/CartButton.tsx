'use client';

import { cartStore } from '@/lib/shop/cart-store';
import { countItems } from '@/lib/shop/cart';
import { cn } from '@/lib/cn';
import { CartDrawer } from './CartDrawer';
import { useCart } from './useCart';

type CartButtonProps = {
  readonly className?: string;
};

/** Anzahl im Badge; ab dreistellig gekürzt, damit das Badge rund bleibt. */
const badgeLabel = (count: number): string => (count > 99 ? '99+' : String(count));

/**
 * Warenkorb-Knopf mit Anzahl-Badge für den Header. Öffnet den Warenkorb als Dialog;
 * der Dialog wird hier gerendert, damit es ihn auf jeder Seite genau einmal gibt.
 */
export function CartButton({ className }: CartButtonProps) {
  const { lines, isOpen } = useCart();
  const count = countItems(lines);

  return (
    <>
      <button
        type="button"
        onClick={cartStore.open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={count > 0 ? `Warenkorb, ${count} Artikel` : 'Warenkorb, leer'}
        className={cn(
          'relative grid size-[46px] shrink-0 place-items-center rounded-[2px] transition-colors hover:bg-white hover:text-charcoal',
          className,
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.6 8H6.1" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="9.5" cy="19.5" r="1.4" />
          <circle cx="17" cy="19.5" r="1.4" />
        </svg>
        {count > 0 ? (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-olive px-1 text-[0.68rem] leading-none font-bold text-white"
          >
            {badgeLabel(count)}
          </span>
        ) : null}
      </button>
      {isOpen ? <CartDrawer /> : null}
    </>
  );
}
