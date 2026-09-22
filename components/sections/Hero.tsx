import { ButtonLink, TextLink } from '@/components/ui/Button';
import { hero } from '@/content/home';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative grid min-h-[860px] items-center overflow-hidden text-white max-md:min-h-[790px] max-sm:min-h-[820px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-[1.015] bg-[url('/assets/hero.webp')] bg-cover bg-center bg-no-repeat max-md:bg-[62%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,10,.88)_0%,rgba(26,31,17,.58)_42%,rgba(26,31,17,.08)_74%)] max-md:bg-[linear-gradient(90deg,rgba(18,22,10,.88),rgba(18,22,10,.42))]"
      />
      {/* Angedeuteter Wegbogen als Linie über dem Bild. */}
      <div
        aria-hidden="true"
        className="absolute top-[12%] left-[53%] h-[105%] w-[38vw] rotate-[19deg] rounded-t-[48%_45%] border border-white/24"
      />

      <div className="shell relative z-[2] pt-[110px] max-md:pt-[70px]">
        <div className="max-w-[710px]">
          <p className="mb-[18px] text-[0.78rem] font-extrabold tracking-[0.18em] text-olive-pale uppercase">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display-1">
            {hero.titleFirst}
            <br />
            {hero.titleSecond}
          </h1>
          <p className="mt-8 max-w-[650px] text-[clamp(1.05rem,1.5vw,1.3rem)] text-white/88">
            {hero.text}
          </p>
          <div className="mt-[42px] flex items-center gap-[30px] max-sm:flex-col max-sm:items-start max-sm:gap-5">
            <ButtonLink href="#kontakt">{hero.primaryCta}</ButtonLink>
            <TextLink href="#leistungen" arrow="↘" className="text-white">
              {hero.secondaryCta}
            </TextLink>
          </div>
        </div>
      </div>

      <ul className="absolute bottom-0 left-1/2 z-[2] grid list-none -translate-x-1/2 grid-cols-3 bg-[rgba(28,30,22,.84)] p-0 backdrop-blur-[14px] max-md:w-[calc(100%-32px)] max-md:grid-cols-1 max-sm:bottom-[18px]">
        {hero.facts.map((fact, index) => (
          <li
            key={fact.title}
            className={`flex min-h-[92px] flex-col justify-center border-r border-white/15 px-7 py-3.5 last:border-r-0 max-md:min-h-0 max-md:border-r-0 max-md:px-[18px] max-md:py-3 ${index < hero.facts.length - 1 ? 'max-md:border-b max-md:border-b-white/13' : ''}`}
          >
            <strong className="text-[0.94rem]">{fact.title}</strong>
            <span className="text-[0.8rem] text-white/66">{fact.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
