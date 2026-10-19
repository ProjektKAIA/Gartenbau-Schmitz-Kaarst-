'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { shopCopy, shopModeCopy, shopProducts, shopTerms } from '@/content/shop';
import { cartStore } from '@/lib/shop/cart-store';
import { formatOrderTotal, requestKindOf, resolveLines } from '@/lib/shop/order';
import { CartLineItem } from './CartLineItem';
import { CheckoutForm } from './CheckoutForm';
import { useCart } from './useCart';
import { lockPageScroll } from '@/lib/scroll-lock';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Hält den Fokus im Dialog (Tab/Shift+Tab laufen im Kreis), schließt mit Escape,
 * sperrt das Scrollen der Seite und gibt den Fokus beim Schließen an den Auslöser zurück.
 */
const useModalBehavior = (
  dialogRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlockScroll = lockPageScroll();
    initialFocusRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cartStore.close();
        return;
      }
      const dialog = dialogRef.current;
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.getClientRects().length > 0,
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockScroll();
      trigger?.focus();
    };
  }, [dialogRef, initialFocusRef]);
};

/** Warenkorb als Seitenleiste: Positionen, Summe, Kundendaten und Absenden. Per Portal in `<body>`. */
export function CartDrawer() {
  const { lines: cart } = useCart();
  const lines = useMemo(() => resolveLines(shopProducts, cart), [cart]);
  const kind = requestKindOf(shopTerms.ordersOpen);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModalBehavior(dialogRef, closeRef);

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal-deep/50" onClick={cartStore.close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative flex h-dvh w-full max-w-[480px] flex-col bg-paper text-charcoal shadow-frame"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="cart-title" className="text-[1.35rem] font-bold">
            Warenkorb
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={cartStore.close}
            aria-label="Warenkorb schließen"
            className="grid size-11 place-items-center text-[1.6rem] leading-none hover:bg-mist"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
          {sent ? (
            <p role="status" className="mb-4 border-l-4 border-olive bg-mist p-4 text-[0.9rem]">
              {shopModeCopy[kind].sentMessage}
            </p>
          ) : null}

          {lines.length === 0 ? (
            <div className="grid gap-4">
              {sent ? null : <p className="text-[0.9rem] text-stone">{shopCopy.emptyCart}</p>}
              <Link
                href="/shop"
                onClick={cartStore.close}
                className="inline-flex min-h-[44px] items-center justify-center border border-olive bg-olive px-5 text-[0.88rem] font-bold text-white hover:bg-olive-dark"
              >
                {sent ? 'Weiter im Shop' : 'Zum Material-Shop'}
              </Link>
            </div>
          ) : (
            <>
              <ul className="grid list-none gap-3 p-0">
                {lines.map((line) => (
                  <CartLineItem key={line.variantId} line={line} />
                ))}
              </ul>
              <p className="mt-3 flex justify-between gap-3 text-[0.95rem] font-bold">
                <span>Summe inkl. MwSt. & Lieferung</span>
                <span className="whitespace-nowrap">{formatOrderTotal(lines)}</span>
              </p>
              <p className="mt-0.5 text-[0.75rem] text-stone">Zahlung auf Rechnung nach Lieferung.</p>

              <CheckoutForm lines={lines} kind={kind} onSent={() => setSent(true)} />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
