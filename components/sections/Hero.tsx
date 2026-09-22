import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Reveal } from '@/components/ui/Reveal';
import { hero } from '@/content/home';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid min-h-[760px] grid-cols-[56%_44%] bg-cream max-lg:grid-cols-[58%_42%] max-md:flex max-md:min-h-0 max-md:flex-col"
    >
      <div className="relative flex flex-col overflow-hidden px-[max(40px,calc((100vw-1280px)/2))] pt-[120px] max-md:min-h-[680px] max-md:px-[30px] max-md:pt-[90px] max-sm:min-h-[720px] max-sm:px-[18px]">
        <Reveal className="max-w-[720px] pb-16">
          <p className="mb-5 text-[0.76rem] font-extrabold tracking-[0.16em] text-olive uppercase">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display-1">
            {hero.titleLine}
            <br />
            <em className="text-olive">{hero.titleAccent}</em>
          </h1>
          <p className="mt-8 max-w-[620px] text-[1.12rem] text-muted">{hero.intro}</p>
          <div className="mt-10 flex flex-wrap items-center gap-9 max-sm:flex-col max-sm:items-start max-sm:gap-6">
            <ButtonLink href="#kontakt">{hero.primaryCta}</ButtonLink>
            <ArrowLink href="#leistungen" arrow="↓">
              {hero.secondaryCta}
            </ArrowLink>
          </div>
        </Reveal>

        <ul className="relative z-[2] mt-auto grid list-none grid-cols-3 border-t border-line p-0">
          {hero.pillars.map((pillar) => (
            <li
              key={pillar.number}
              className="flex min-h-[92px] flex-col justify-center gap-[3px] border-r border-line pr-4 pl-0 text-[0.7rem] text-bronze last:border-r-0 max-sm:pl-2"
            >
              {pillar.number}
              <strong className="text-[0.9rem] text-ink">{pillar.label}</strong>
            </li>
          ))}
        </ul>

        {/* Dekorative Ringe im Hintergrund – rein visuell. */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-[100px] h-[680px] w-[500px] rotate-30 rounded-[48%] border border-[rgba(104,114,64,.11)] after:absolute after:inset-[70px] after:rounded-[48%] after:border after:border-[rgba(104,114,64,.08)] after:content-['']"
        />
      </div>

      <BeforeAfter
        beforeSrc="/assets/hero-before.webp"
        afterSrc="/assets/hero.webp"
        label="Interaktiver Vorher-Nachher-Vergleich eines Gartens"
        hintTitle="Veränderung erleben"
        hintSubline="Ziehen Sie den Regler"
      />
    </section>
  );
}
