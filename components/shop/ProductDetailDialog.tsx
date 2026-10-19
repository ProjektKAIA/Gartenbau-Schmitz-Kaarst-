'use client';

import Image from 'next/image';
import { useEffect, useId, useRef } from 'react';
import { AddToCart, PriceLine, ProductOptions } from './ProductControls';
import type { ProductSelection } from './useProductSelection';
import { lockPageScroll } from '@/lib/scroll-lock';

type ProductDetailDialogProps = {
  readonly selection: ProductSelection;
  readonly categoryLabel: string;
  readonly onClose: () => void;
  /** Dialog schließen und danach den Warenkorb öffnen. */
  readonly onViewCart: () => void;
};

/**
 * Produktdetails als modaler Dialog. Natives `<dialog>` mit `showModal()`: liegt im Top Layer
 * (kein Ancestor mit `transform`/`filter` – etwa ein sticky Header – kann ihn einfangen),
 * macht den Rest der Seite inert und schließt mit Escape. Klick auf den Hintergrund schließt ebenfalls.
 * Wird nur gemountet, solange er offen ist; beim Schließen geht der Fokus an den Auslöser zurück.
 */
export function ProductDetailDialog({ selection, categoryLabel, onClose, onViewCart }: ProductDetailDialogProps) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { product, variant, size } = selection;
  const image = variant.image ?? product.image;
  const sizeNote = product.sizeNotes?.[size];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Auslöser merken: Erst nach dem Schließen ist die Seite nicht mehr inert und fokussierbar.
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Seite hinter dem Dialog nicht mitscrollen lassen.
    const unlockScroll = lockPageScroll();
    if (!dialog.open) dialog.showModal();
    return () => {
      unlockScroll();
      if (dialog.open) dialog.close();
      trigger?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-desc`}
      onCancel={(event) => {
        // Escape: Schließen selbst steuern, damit React-Zustand und Dialog nicht auseinanderlaufen.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Nur Klicks direkt auf das <dialog>-Element treffen den Hintergrund (::backdrop).
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[min(980px,calc(100%-48px))] max-w-none overflow-hidden border-0 bg-paper p-0 text-charcoal shadow-frame backdrop:bg-charcoal-deep/60 max-sm:h-dvh max-sm:max-h-none max-sm:w-full"
    >
      <div className="grid max-h-[calc(100dvh-48px)] grid-cols-[minmax(0,1fr)] overflow-y-auto overscroll-contain md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] max-sm:h-full max-sm:max-h-none">
        <div className="relative aspect-[4/3] bg-sand md:aspect-auto md:min-h-[440px]">
          <Image
            src={image}
            alt={`${product.name}${variant.image && size !== 'Standard' ? `, Körnung ${size}` : ''}`}
            fill
            sizes="(max-width: 819px) 100vw, 540px"
            className="object-cover"
          />
          {variant.image ? null : (
            <span className="absolute bottom-3 left-3 bg-charcoal-deep/70 px-2 py-0.5 text-[0.68rem] tracking-[0.06em] text-white">
              Abbildung ähnlich
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6 max-sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              {categoryLabel ? (
                <p className="mb-1 text-[0.7rem] font-bold tracking-[0.12em] text-olive uppercase">{categoryLabel}</p>
              ) : null}
              <h2 id={`${uid}-title`} className="text-[1.6rem] leading-tight font-bold">
                {product.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Details schließen"
              className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center text-[1.6rem] leading-none hover:bg-mist max-sm:fixed max-sm:top-3 max-sm:right-3 max-sm:mt-0 max-sm:mr-0 max-sm:bg-paper/90 max-sm:shadow-frame"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <p id={`${uid}-desc`} className="text-[0.95rem] leading-relaxed text-charcoal/85">
            {product.description}
          </p>

          <div className="grid gap-3 border-t border-line pt-4">
            <ProductOptions selection={selection} showFixed />
            {sizeNote ? <p className="text-[0.85rem] leading-snug text-olive">{sizeNote}</p> : null}
          </div>

          <div className="mt-auto grid gap-3 border-t border-line pt-4">
            <PriceLine selection={selection} large />
            <AddToCart selection={selection} onViewCart={onViewCart} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
