import { contactCopy } from '@/content/contact';
import { site } from '@/lib/site';

const rows = [
  { label: 'Telefon', value: site.contact.phone, href: site.contact.phoneHref },
  { label: 'E-Mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
  {
    label: 'Adresse',
    value: `${site.legalName}\n${site.address.street}\n${site.address.postalCode} ${site.address.city}`,
  },
  { label: 'Einsatzgebiet', value: site.serviceArea },
] as const;

/** Kontaktblock neben dem Formular – auch der Ausweg, wenn der Versand nicht klappt. */
export function ContactDetails() {
  return (
    <aside aria-labelledby="contact-details-title" className="bg-charcoal p-[34px] text-white max-sm:p-6">
      <h2 id="contact-details-title" className="text-[1.6rem] leading-tight font-bold">
        {contactCopy.asideTitle}
      </h2>
      <p className="mt-2 text-[0.92rem] text-white/70">{contactCopy.asideBody}</p>
      <dl className="mt-4">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 border-b border-white/13 py-4 last:border-b-0">
            <dt className="text-[0.72rem] tracking-[0.13em] text-white/60 uppercase">{row.label}</dt>
            <dd className="m-0 text-[1.02rem] whitespace-pre-line">
              {'href' in row ? (
                <a href={row.href} className="font-semibold text-olive-pale underline-offset-4 hover:underline">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
