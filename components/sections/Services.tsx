import { ArrowLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { services, type ServiceTone } from '@/content/home';
import { cn } from '@/lib/cn';

/** Jede Kachel hat ihren eigenen Farbklang; „Bauen" ist zusätzlich nach links versetzt. */
const toneStyles: Record<ServiceTone, string> = {
  plan: 'bg-paper',
  build: 'bg-pine text-white -translate-x-9 max-md:translate-x-0',
  care: 'bg-care',
};

const toneBodyStyles: Record<ServiceTone, string> = {
  plan: 'text-muted',
  build: 'text-white/68',
  care: 'text-muted',
};

export function Services() {
  return (
    <section
      id="leistungen"
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-sand py-[132px] max-md:py-[94px]"
    >
      <div className="shell relative z-[2] grid grid-cols-[0.72fr_1.28fr] items-start gap-[90px] max-lg:grid-cols-1 max-lg:gap-12">
        <div className="sticky top-8 pt-2 max-lg:static">
          <SectionLabel number="02">{services.label}</SectionLabel>
          <h2 className="display-2 max-w-[550px]">{services.title}</h2>
          <p className="my-[30px] max-w-[480px] text-muted">{services.intro}</p>
          <ArrowLink href="#kontakt" arrow="↗">
            {services.cta}
          </ArrowLink>
        </div>

        <div className="grid gap-5 max-lg:mx-auto max-lg:max-w-[850px]">
          {services.items.map((service) => (
            <Reveal key={service.number}>
              <article
                className={cn(
                  'grid min-h-[330px] grid-cols-[100px_1fr] border border-[rgba(29,41,37,.08)] p-[46px] max-sm:grid-cols-1 max-sm:px-[26px] max-sm:py-8',
                  toneStyles[service.tone],
                )}
              >
                <p className="text-[0.76rem] text-bronze max-sm:mb-7">{service.number}</p>
                <div>
                  <p className="text-[0.73rem] tracking-[0.14em] text-bronze uppercase">
                    {service.kicker}
                  </p>
                  <h3 className="mt-2.5 mb-[18px] font-serif text-[3.4rem] leading-none font-normal max-sm:text-[2.8rem]">
                    {service.title}
                  </h3>
                  <p className={cn('max-w-[520px]', toneBodyStyles[service.tone])}>{service.body}</p>
                  <ul className="mt-7 flex list-none flex-wrap gap-2 p-0">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-current px-[11px] py-[7px] text-[0.72rem] opacity-[0.78]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Angedeutetes Pflasterraster als Hintergrundgrafik. */}
      <div
        aria-hidden="true"
        className="absolute top-[60px] -left-[140px] -z-10 size-[520px] -rotate-[18deg] opacity-[0.06] [background-image:linear-gradient(var(--color-pine)_1px,transparent_1px),linear-gradient(90deg,var(--color-pine)_1px,transparent_1px)] [background-size:66px_36px]"
      />
    </section>
  );
}
