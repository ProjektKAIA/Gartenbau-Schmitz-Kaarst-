'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const INTRO_FROM = 22;
const INTRO_TO = 64;
const INTRO_DURATION_MS = 1800;
const FALLBACK_SPLIT = 58;

type BeforeAfterProps = {
  readonly beforeSrc: string;
  readonly afterSrc: string;
  readonly label: string;
  readonly hintTitle: string;
  readonly hintSubline: string;
};

/**
 * Vorher-/Nachher-Vergleich: das „Nachher"-Bild wird per clip-path beschnitten,
 * ein unsichtbarer Range-Slider darüber macht den Regler tastatur- und zeigerbedienbar.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  label,
  hintTitle,
  hintSubline,
}: BeforeAfterProps) {
  const [split, setSplit] = useState(FALLBACK_SPLIT);
  const introRef = useRef<number | null>(null);

  const stopIntro = () => {
    if (introRef.current !== null) {
      cancelAnimationFrame(introRef.current);
      introRef.current = null;
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSplit(FALLBACK_SPLIT);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / INTRO_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSplit(INTRO_FROM + (INTRO_TO - INTRO_FROM) * eased);
      if (progress < 1) {
        introRef.current = requestAnimationFrame(animate);
      } else {
        introRef.current = null;
      }
    };

    introRef.current = requestAnimationFrame(animate);
    return () => {
      if (introRef.current !== null) cancelAnimationFrame(introRef.current);
    };
  }, []);

  const rounded = Math.round(split);
  // React typisiert CSS-Custom-Properties nicht – deshalb hier ein Cast statt `any`.
  const style = { '--split': `${split}%` } as CSSProperties;

  return (
    <div
      className="relative min-h-[760px] overflow-hidden bg-[#26332b] max-md:min-h-[620px] max-sm:min-h-[520px]"
      style={style}
      aria-label={label}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[62%_center] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(23,52,45,.02), rgba(23,52,45,.22)), url(${beforeSrc})`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-[62%_center] bg-cover bg-no-repeat [clip-path:inset(0_calc(100%_-_var(--split))_0_0)]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(23,52,45,.02), rgba(23,52,45,.22)), url(${afterSrc})`,
        }}
      />

      <span className="pointer-events-none absolute top-[26px] left-[26px] z-[5] border border-white/55 bg-[rgba(18,34,29,.62)] px-[14px] py-[9px] text-[0.72rem] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-[8px] max-sm:top-4 max-sm:left-3.5 max-sm:px-2.5 max-sm:py-[7px]">
        Nachher
      </span>
      <span className="pointer-events-none absolute top-[26px] right-[26px] z-[5] border border-white/55 bg-[rgba(18,34,29,.62)] px-[14px] py-[9px] text-[0.72rem] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-[8px] max-sm:top-4 max-sm:right-3.5 max-sm:px-2.5 max-sm:py-[7px]">
        Vorher
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={rounded}
        aria-label="Vorher-Nachher-Regler"
        aria-valuetext={`${rounded} Prozent der fertigen Gartengestaltung sichtbar`}
        onPointerDown={stopIntro}
        onChange={(event) => {
          stopIntro();
          setSplit(Number(event.target.value));
        }}
        className="absolute inset-0 z-[8] m-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <div className="pointer-events-none absolute top-0 bottom-0 left-[var(--split)] z-[6] w-[3px] -translate-x-1/2 bg-white shadow-[0_0_22px_rgba(0,0,0,.34)]">
        <span className="absolute top-0 -left-1 size-[11px] rounded-full bg-bronze" />
        <span className="absolute bottom-0 -left-1 size-[11px] rounded-full bg-bronze" />
        <span className="absolute top-1/2 left-1/2 grid size-[66px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white bg-bronze text-[1.5rem] font-extrabold tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(0,0,0,.3)] max-md:size-[58px]">
          ‹›
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-[30px] left-1/2 z-[5] flex min-w-[190px] -translate-x-1/2 flex-col items-center bg-[rgba(23,52,45,.74)] px-[18px] py-3 text-white backdrop-blur-[10px] max-sm:bottom-[18px] max-sm:min-w-[170px]">
        <strong className="font-serif text-[1.05rem] font-normal">{hintTitle}</strong>
        <span className="text-[0.68rem] tracking-[0.08em] text-white/65 uppercase">
          {hintSubline}
        </span>
      </div>
    </div>
  );
}
