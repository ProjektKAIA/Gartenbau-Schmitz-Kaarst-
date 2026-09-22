import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { company } from '@/content/home';

export function Company() {
  return (
    <section
      id="unternehmen"
      aria-labelledby="company-title"
      className="relative isolate overflow-hidden bg-pine py-[132px] text-white max-md:py-[94px]"
    >
      <div className="shell relative z-[2] grid grid-cols-2 gap-[110px] max-md:grid-cols-1 max-md:gap-[50px]">
        <div>
          <SectionLabel number="04" tone="light">
            {company.label}
          </SectionLabel>
          <h2 id="company-title" className="display-2 max-w-[650px]">
            {company.title}
          </h2>
        </div>
        <Reveal>
          <p className="font-serif text-[1.7rem] leading-[1.45] text-white">{company.lead}</p>
          <p className="mt-[26px] text-white/58">{company.body}</p>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-7 max-sm:grid-cols-1">
            {company.facts.map((fact) => (
              <div key={fact.label} className="grid">
                <dt className="order-2 text-[0.73rem] text-white/48">{fact.label}</dt>
                <dd className="order-1 m-0 font-serif text-[2rem] font-normal text-bronze-light">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-[-190px] -left-[110px] -z-10 w-[560px] -rotate-12 bg-[url('/assets/logo.png')] bg-contain bg-no-repeat opacity-[0.045] brightness-300 grayscale"
        style={{ aspectRatio: '1 / 1' }}
      />
    </section>
  );
}
