import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { career } from '@/content/home';
import { site } from '@/lib/site';

export function Career() {
  return (
    <section
      id="karriere"
      aria-labelledby="career-title"
      className="relative isolate overflow-hidden bg-sand py-[92px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[145px] left-[38%] -z-10 h-[340px] w-[440px] -rotate-12 text-olive opacity-[0.055] paver-grid [background-size:62px_34px] [mask-image:linear-gradient(90deg,transparent,#000,transparent)] max-md:opacity-[0.045]"
      />

      <div className="shell relative z-[2] grid grid-cols-[0.35fr_1.1fr_1fr_auto] items-center gap-[38px] max-lg:grid-cols-[1fr_2fr] max-md:grid-cols-1">
        <Eyebrow className="mb-0">{career.label}</Eyebrow>
        <h2 id="career-title" className="text-[clamp(2rem,3vw,3.35rem)] leading-[1.02] font-bold tracking-[-0.035em]">
          {career.title}
        </h2>
        <p className="text-stone max-lg:col-start-2 max-md:col-start-auto">{career.body}</p>
        <ButtonLink
          href={`mailto:${site.contact.email}?subject=Bewerbung%20als%20Landschaftsg%C3%A4rtner%2Fin`}
          variant="dark"
          className="max-lg:col-start-2 max-lg:justify-self-start max-md:col-start-auto"
        >
          {career.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
