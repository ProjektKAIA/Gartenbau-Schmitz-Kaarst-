import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { contactCta } from '@/content/contact';
import type { ContactTopicId } from '@/content/contact';
import { contactHref } from '@/lib/contact';
import { site } from '@/lib/site';

/** Abschluss-Band mit Weg zum Kontaktformular und direktem Anruf. */
export function ContactCtaBand({ topic }: { readonly topic?: ContactTopicId }) {
  return (
    <section aria-labelledby="cta-title" className="bg-olive py-20 text-white max-md:py-16">
      <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
        <div>
          <Eyebrow tone="light">{contactCta.label}</Eyebrow>
          <h2 id="cta-title" className="max-w-[720px] text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {contactCta.title}
          </h2>
          <p className="mt-4 max-w-[560px] text-white/75">{contactCta.body}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={contactHref(topic)} variant="light">
            {contactCta.cta}
          </ButtonLink>
          <ButtonLink href={site.contact.phoneHref} variant="dark">
            {site.contact.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
