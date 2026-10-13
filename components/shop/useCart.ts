'use client';

import { useSyncExternalStore } from 'react';
import { cartStore, type CartState } from '@/lib/shop/cart-store';

/** Globaler Warenkorb-Zustand – auf dem Server und beim Hydrieren leer, danach aus `sessionStorage`. */
export const useCart = (): CartState =>
  useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
