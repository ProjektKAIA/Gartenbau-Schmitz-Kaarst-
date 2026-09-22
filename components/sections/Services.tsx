import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { services, type ServiceIcon } from '@/content/home';
import { cn } from '@/lib/cn';

/** Die drei Icons sind reine CSS-Formen – kein Bild, keine Icon-Bibliothek. */
function ServiceMark({ icon, dark }: { readonly icon: ServiceIcon; readonly dark: boolean }) {
  const stroke = dark ? 'border-olive-pale' : 'border-olive';
  const bar = dark ? 'bg-olive-pale' : 'bg-olive';

  if (icon === 'leaf') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'relative mt-[68px] mb-7 size-[92px] -rotate-[38deg] rounded-[90%_12%_88%_15%] border-2',
          stroke,
        )}
      >
        <span
          className={cn('absolute top-[42px] left-3 h-0.5 w-[110px] origin-left rotate-[38deg]', bar)}
        />
      </div>
    );
  }

  if (icon === 'paver') {
    return (
      <div
        aria-hidden="true"
        className="relative mt-[68px] mb-7 size-[92px] -skew-y-12 bg-[repeating-linear-gradient(0deg,transparent_0_23px,rgba(255,255,255,.78)_23px_25px),repeating-linear-gradient(90deg,transparent_0_43px,rgba(255,255,255,.78)_43px_45px)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="relative mt-[68px] mb-7 size-[92px]">
      <span className={cn('absolute top-10 left-2 h-0.5 w-[78px] rotate-[32deg]', bar)} />
      <span className={cn('absolute top-10 left-2 h-0.5 w-[78px] -rotate-[32deg]', bar)} />
    </div>
  );
}

export function Services() {
  return (
    <section
      id="leistungen"
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-paper py-[132px] max-md:py-[92px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[60px] -right-[180px] -z-10 h-[560px] w-[610px] -rotate-[16deg] text-olive opacity-[0.075] paver-grid [background-size:76px_42px] [mask-image:linear-gradient(110deg,transparent_0%,#000_38%,#000_75%,transparent_100%)] max-md:opacity-[0.045] max-sm:-right-[330px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2%] -left-[17%] -z-10 h-[420px] w-[72%] -rotate-[9deg] rounded-[50%] border border-[rgba(83,92,38,.085)] max-sm:hidden"
      />

      <div className="shell relative z-[2]">
        <div className="mb-[70px] grid grid-cols-[1.35fr_0.65fr] items-end gap-[70px] max-md:grid-cols-1 max-md:gap-7">
          <div>
            <Eyebrow>{services.label}</Eyebrow>
            <h2 id="services-title" className="display-2">
              {services.titleFirst}
              <br />
              {services.titleSecond}
            </h2>
          </div>
          <p className="max-w-[460px] text-stone">{services.intro}</p>
        </div>

        <div className="grid grid-cols-3 items-stretch gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {services.items.map((service, index) => (
            <Reveal
              key={service.index}
              className={cn(
                'h-full',
                service.dark && 'translate-y-[34px] max-md:translate-y-0',
                index === services.items.length - 1 && 'max-lg:col-span-full max-sm:col-span-1',
              )}
            >
              <article
                className={cn(
                  'group flex h-full min-h-[560px] flex-col border border-line p-[34px] transition-[transform,box-shadow] duration-200 hover:-translate-y-[7px] hover:shadow-frame max-sm:min-h-[520px] max-sm:p-7',
                  service.dark ? 'bg-charcoal text-white' : 'bg-white',
                  index === services.items.length - 1 && 'max-lg:min-h-[470px] max-sm:min-h-[520px]',
                )}
              >
                <p className="text-[0.75rem] text-stone">{service.index}</p>
                <ServiceMark icon={service.icon} dark={service.dark} />
                <h3 className="mb-[18px] text-[2rem] leading-[1.02] font-bold tracking-[-0.035em]">
                  {service.title}
                </h3>
                <p className={service.dark ? 'text-white/68' : 'text-stone'}>{service.body}</p>
                <ul className="mt-[30px] mb-10 list-none p-0">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        'border-b py-[9px] text-[0.91rem]',
                        service.dark ? 'border-white/13' : 'border-line',
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={cn(
                    'mt-auto font-bold',
                    service.dark ? 'text-olive-pale' : 'text-olive',
                  )}
                >
                  {service.cta} <span aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
