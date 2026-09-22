'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/**
 * Blendet den Inhalt beim ersten Sichtkontakt ein.
 *
 * Der Zustand wird ausschließlich aus dem Observer-Callback gesetzt – ein
 * synchrones setState im Effect würde eine zusätzliche Renderrunde auslösen.
 * Läuft kein JavaScript, hebt der noscript-Block im Layout das Ausblenden auf.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('reveal', className)} data-visible={visible}>
      {children}
    </div>
  );
}
