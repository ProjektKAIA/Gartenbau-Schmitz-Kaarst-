import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { contact } from '@/content/home';
import { site } from '@/lib/site';

const rows = [
  { label: 'Telefon', value: site.contact.phone, href: site.contact.phoneHref },
  { label: 'E-Mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: 'Einsatzgebiet', value: site.serviceArea },
] as const;

export function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-olive py-[132px] text-white max-md:py-[92px]"
    >
      <div className="shell relative z-[2] grid grid-cols-[1.15fr_0.85fr] items-center gap-[100px] max-md:grid-cols-1 max-md:gap-12">
        <div>
          <Eyebrow tone="light">{contact.label}</Eyebrow>
          <h2 id="contact-title" className="display-2 max-w-[780px]">
            {contact.title}
          </h2>
          <p className="mt-8 max-w-[620px] text-[1.05rem] text-white/75">{contact.body}</p>
        </div>

        <div className="bg-white p-[38px] text-charcoal shadow-[0_26px_70px_rgba(26,29,13,.3)] max-sm:p-7">
          <dl className="m-0">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-[5px] border-b border-line py-[18px]">
                <dt className="text-[0.75rem] tracking-[0.13em] text-stone uppercase">
                  {row.label}
                </dt>
                <dd className="m-0 text-[1.08rem]">
                  {'href' in row ? <a href={row.href}>{row.value}</a> : row.value}
                </dd>
              </div>
            ))}
          </dl>
          <ButtonLink
            href={`mailto:${site.contact.email}?subject=Projektanfrage`}
            wide
            className="mt-7"
          >
            {contact.cta}
          </ButtonLink>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[110px] -left-[110px] -z-10 size-[470px] -rotate-[18deg] text-white opacity-[0.085] paver-grid [background-size:64px_36px]"
      />
    </section>
  );
}
