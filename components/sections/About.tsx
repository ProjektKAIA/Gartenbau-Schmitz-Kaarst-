import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { about } from '@/content/home';

export function About() {
  return (
    <section
      id="ueber-uns"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-charcoal py-[132px] text-white max-md:py-[92px]"
    >
      <div className="shell relative z-[2] grid grid-cols-[0.75fr_1.25fr] items-center gap-[90px] max-md:grid-cols-1 max-md:gap-12">
        <div className="grid min-h-[510px] place-items-center overflow-hidden bg-[#f4f4ef] max-md:min-h-[420px] max-sm:min-h-[340px]">
          <Image
            src="/assets/logo.png"
            alt={`Signet ${about.label}: Blatt über Pflasterfläche`}
            width={420}
            height={420}
            className="w-[72%]"
          />
        </div>

        <Reveal>
          <Eyebrow tone="light">{about.label}</Eyebrow>
          <h2 id="about-title" className="display-2">
            {about.titleFirst}
            <br />
            {about.titleSecond}
          </h2>
          <p className="my-[34px] max-w-[650px] text-[1.04rem] text-white/70">{about.body}</p>
          <dl className="my-[38px] grid grid-cols-3 gap-5 border-y border-white/16 py-7 max-sm:grid-cols-1">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid">
                <dt className="order-2 text-[0.76rem] text-white/56">{fact.label}</dt>
                <dd className="order-1 m-0 text-[1.32rem] font-bold text-olive-pale">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <TextLink href="#kontakt" className="text-white">
            {about.cta}
          </TextLink>
        </Reveal>
      </div>

      {/* Blattform mit zwei Adern als Hintergrundlinie. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[100px] -right-[120px] size-[720px] rotate-[22deg] rounded-[75%_8%_75%_8%] border border-white/8 before:absolute before:top-1/2 before:left-[5%] before:h-px before:w-[85%] before:rotate-[28deg] before:bg-white/7 before:content-[''] after:absolute after:top-1/2 after:left-[20%] after:h-px after:w-[70%] after:-rotate-[21deg] after:bg-white/7 after:content-['']"
      />
    </section>
  );
}
