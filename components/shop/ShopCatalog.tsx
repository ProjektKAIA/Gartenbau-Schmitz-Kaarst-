'use client';

import { useMemo, useReducer } from 'react';
import { shopCategories, shopProducts } from '@/content/shop';
import { cartReducer, countItems } from '@/lib/shop/cart';
import { resolveLines } from '@/lib/shop/order';
import { ProductCard } from './ProductCard';
import { OrderPanel } from './OrderPanel';

/** Katalog nach Kategorien plus Bestellliste; der Zustand der Liste lebt nur hier. */
export function ShopCatalog() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const lines = useMemo(() => resolveLines(shopProducts, cart), [cart]);
  const count = countItems(cart);

  return (
    <div className="grid grid-cols-[1fr_380px] items-start gap-10 max-lg:grid-cols-1">
      <div className="grid gap-16">
        {shopCategories.map((category) => {
          const products = shopProducts.filter((product) => product.category === category.id);
          if (products.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <h2 id={`cat-${category.id}`} className="mb-6 border-b border-line pb-3 text-[2rem] font-bold">
                {category.label}
              </h2>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={(variantId, quantity) => dispatch({ type: 'add', variantId, quantity })}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto max-lg:static max-lg:max-h-none">
        <OrderPanel lines={lines} dispatch={dispatch} />
      </div>

      {/* Unterhalb von 1050px liegt die Bestellliste unter dem Katalog – der Knopf führt hin. */}
      {count > 0 ? (
        <a
          href="#bestellung"
          className="fixed right-4 bottom-4 z-40 hidden min-h-[48px] items-center gap-2 bg-charcoal px-5 text-[0.88rem] font-bold text-white shadow-[0_14px_34px_rgba(0,0,0,.25)] max-lg:flex"
        >
          Zur Bestellung <span className="grid size-6 place-items-center rounded-full bg-olive text-[0.75rem] text-white">{count}</span>
        </a>
      ) : null}
    </div>
  );
}
