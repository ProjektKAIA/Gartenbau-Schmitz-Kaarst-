'use client';

import { useId } from 'react';
import { Select } from '@/components/ui/Select';
import { MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { cartStore } from '@/lib/shop/cart-store';
import { unitPriceLabel } from '@/lib/shop/catalog';
import { cn } from '@/lib/cn';
import type { ProductSelection } from './useProductSelection';

/** Körnung „Standard" heißt: Das Produkt hat keine Körnung (z. B. Sackware wie Pflanzenerde). */
const hasRealSize = (size: string): boolean => size !== 'Standard';

type PriceLineProps = {
  readonly selection: ProductSelection;
  readonly large?: boolean;
};

/** Preis mit Bezugsgröße („0,00 € / m³ lose") und darunter „inkl. MwSt. & Lieferung". */
export function PriceLine({ selection, large = false }: PriceLineProps) {
  return (
    <p className="grid gap-0.5 text-[0.78rem] leading-snug text-stone">
      {/* Preis und Bezugsgröße bleiben zusammen; der Hinweis steht darunter statt umzubrechen. */}
      <strong className={cn('font-bold whitespace-nowrap text-charcoal', large ? 'text-[1.35rem]' : 'text-[1.1rem]')}>
        {unitPriceLabel(selection.variant)}
      </strong>
      <span>inkl. MwSt. &amp; Lieferung</span>
    </p>
  );
}

function FixedOption({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-[0.7rem] font-bold tracking-[0.12em] text-stone uppercase">{label}</span>
      <span className="flex min-h-[44px] items-center border border-transparent bg-mist px-3.5 text-[0.92rem] font-semibold">
        {value}
      </span>
    </div>
  );
}

type ProductOptionsProps = {
  readonly selection: ProductSelection;
  /** Im Dialog stehen auch feste Angaben (nur eine Option); auf der Karte entfallen sie. */
  readonly showFixed?: boolean;
};

/** Körnung und Lieferform: Auswahlfeld nur bei mehreren Optionen, sonst (optional) feste Angabe. */
export function ProductOptions({ selection, showFixed = false }: ProductOptionsProps) {
  const uid = useId();
  const { sizes, size, options, variant } = selection;
  const chooseSize = sizes.length > 1;
  const choosePackaging = options.length > 1;
  const showSize = chooseSize || (showFixed && hasRealSize(size));
  const showPackaging = choosePackaging || showFixed;
  if (!showSize && !showPackaging) return null;

  return (
    <div className={cn('grid gap-2.5', showSize && showPackaging ? 'grid-cols-2' : 'grid-cols-1')}>
      {chooseSize ? (
        <Select id={`${uid}-size`} label="Körnung" value={size} onChange={(event) => selection.selectSize(event.target.value)}>
          {sizes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      ) : showSize ? (
        <FixedOption label="Körnung" value={size} />
      ) : null}
      {choosePackaging ? (
        <Select
          id={`${uid}-packaging`}
          label="Lieferform"
          value={variant.id}
          onChange={(event) => selection.selectVariant(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.packaging}
            </option>
          ))}
        </Select>
      ) : showPackaging ? (
        <FixedOption label="Lieferform" value={variant.packaging} />
      ) : null}
    </div>
  );
}

type AddToCartProps = {
  readonly selection: ProductSelection;
  /** „ansehen" öffnet den Warenkorb; der Dialog schließt sich vorher selbst (Top Layer liegt sonst darüber). */
  readonly onViewCart?: () => void;
};

/** Menge und „In den Warenkorb" mit kurzer Rückmeldung darunter. */
export function AddToCart({ selection, onViewCart = cartStore.open }: AddToCartProps) {
  const uid = useId();
  const { variant, quantity, added } = selection;

  return (
    <div className="grid gap-1.5">
      <div className="flex items-end gap-2">
        <label className="grid w-[84px] shrink-0 gap-1.5" htmlFor={`${uid}-qty`}>
          <span className="text-[0.7rem] font-bold tracking-[0.12em] whitespace-nowrap text-stone uppercase">
            Menge <span className="tracking-normal normal-case">({variant.unit})</span>
          </span>
          <input
            id={`${uid}-qty`}
            type="number"
            inputMode="numeric"
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            step={1}
            value={quantity}
            onChange={(event) => selection.setQuantity(event.target.valueAsNumber)}
            className="min-h-[44px] w-full border border-line bg-white px-3 text-[0.95rem] font-semibold"
          />
        </label>
        <button
          type="button"
          onClick={selection.addToCart}
          className="min-h-[44px] flex-1 border border-olive bg-olive px-3 text-[0.88rem] font-bold whitespace-nowrap text-white transition-colors hover:bg-olive-dark"
        >
          In den Warenkorb
        </button>
      </div>
      <p aria-live="polite" className="min-h-6 text-[0.8rem] text-olive">
        {added ? (
          <>
            ✓ Im Warenkorb ·{' '}
            <button type="button" onClick={onViewCart} className="min-h-6 font-semibold underline hover:text-olive-dark">
              ansehen
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
}
