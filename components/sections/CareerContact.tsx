import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { career, contact } from '@/content/home';
import { site } from '@/lib/site';

const details = [
  { label: 'Telefon', value: site.contact.phone, href: site.contact.phoneHref },
  { label: 'E-Mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: 'Einsatzgebiet', value: site.serviceArea },
] as const;

/** Zweigeteilter Abschluss: links Karriere (Sand), rechts Projektanfrage (Olive). */
export function CareerContact() {
  return (
    <section id="kontakt" className="grid grid-cols-[42%_58%] max-lg:grid-cols-2 max-md:grid-cols-1">
      <div className="flex min-h-[610px] flex-col justify-center bg-sand py-[86px] pr-20 pl-[max(40px,calc((100vw-1280px)/2))] max-lg:px-12 max-md:min-h-[530px] max-md:px-[34px]">
        <SectionLabel>{career.label}</SectionLabel>
        <h2 className="max-w-[630px] font-serif text-[clamp(2.6rem,4.2vw,4.4rem)] leading-[0.98] font-normal tracking-[-0.045em]">
          {career.title}
        </h2>
        <p className="my-[26px] max-w-[480px] text-muted">{career.body}</p>
        <ArrowLink href={`mailto:${site.contact.email}?subject=Bewerbung`} arrow="↗" className="self-start">
          {career.cta}
        </ArrowLink>
      </div>

      <div className="flex min-h-[610px] flex-col justify-center bg-olive py-[86px] pr-[max(40px,calc((100vw-1280px)/2))] pl-20 text-white max-lg:px-12 max-md:min-h-[530px] max-md:px-[34px]">
        <SectionLabel tone="light">{contact.label}</SectionLabel>
        <h2 className="max-w-[630px] font-serif text-[clamp(2.6rem,4.2vw,4.4rem)] leading-[0.98] font-normal tracking-[-0.045em]">
          {contact.title}
        </h2>
        <dl className="mt-[38px] mb-[30px] grid grid-cols-2 gap-x-7 gap-y-0 max-sm:grid-cols-1">
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`grid border-b border-white/18 py-[15px] ${index === details.length - 1 ? 'col-span-full max-sm:col-span-1' : ''}`}
            >
              <dt className="text-[0.7rem] tracking-[0.12em] text-white/55 uppercase">
                {detail.label}
              </dt>
              <dd className="m-0">
                {'href' in detail ? <a href={detail.href}>{detail.value}</a> : detail.value}
              </dd>
            </div>
          ))}
        </dl>
        <ButtonLink
          href={`mailto:${site.contact.email}?subject=Projektanfrage`}
          variant="bronze"
          className="self-start"
        >
          {contact.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
