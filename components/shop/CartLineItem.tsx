'use client';

import { MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { cartStore } from '@/lib/shop/cart-store';
import type { ResolvedLine } from '@/lib/shop/order';
import { formatShopPrice } from '@/lib/shop/price';

const stepClass =
  'grid size-9 place-items-center border border-line bg-white text-[1.1rem] leading-none hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40';

/** Eine Warenkorb-Position: Menge per −/+ oder Eingabe ändern, entfernen. */
export function CartLineItem({ line }: { readonly line: ResolvedLine }) {
  const setQuantity = (quantity: number) =>
    cartStore.dispatch({ type: 'setQuantity', variantId: line.variantId, quantity });

  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 border-b border-line pb-3">
      <span className="text-[0.9rem] font-semibold">{line.label}</span>
      <span className="text-right text-[0.88rem] whitespace-nowrap">{formatShopPrice(line.totalCents)}</span>
      <span className="flex items-center gap-1.5 text-[0.8rem] text-stone">
        <button
          type="button"
          className={stepClass}
          disabled={line.quantity <= MIN_QUANTITY}
          onClick={() => setQuantity(line.quantity - 1)}
          aria-label={`Menge verringern: ${line.label}`}
        >
          −
        </button>
        <label className="sr-only" htmlFor={`qty-${line.variantId}`}>
          Menge {line.label}
        </label>
        <input
          id={`qty-${line.variantId}`}
          type="number"
          inputMode="numeric"
          min={MIN_QUANTITY}
          max={MAX_QUANTITY}
          value={line.quantity}
          onChange={(event) => setQuantity(event.target.valueAsNumber)}
          className="h-9 w-14 border border-line bg-white px-2 text-center text-charcoal"
        />
        <button
          type="button"
          className={stepClass}
          disabled={line.quantity >= MAX_QUANTITY}
          onClick={() => setQuantity(line.quantity + 1)}
          aria-label={`Menge erhöhen: ${line.label}`}
        >
          +
        </button>
        <span className="ml-1">{line.unit}</span>
      </span>
      <button
        type="button"
        onClick={() => cartStore.dispatch({ type: 'remove', variantId: line.variantId })}
        className="min-h-9 text-right text-[0.8rem] text-stone underline hover:text-charcoal"
      >
        Entfernen <span className="sr-only">{line.label}</span>
      </button>
    </li>
  );
}
