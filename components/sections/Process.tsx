import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { process } from '@/content/home';

export function Process() {
  return (
    <section
      id="ablauf"
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden bg-cream py-[132px] max-md:py-[94px]"
    >
      <div className="shell relative z-[2]">
        <div className="grid grid-cols-[0.4fr_1.6fr] items-start gap-[60px] max-md:grid-cols-1 max-md:gap-8">
          <SectionLabel number="03">{process.label}</SectionLabel>
          <h2 id="process-title" className="display-2">
            {process.title}
          </h2>
        </div>

        <ol className="mt-[86px] grid list-none grid-cols-4 gap-6 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
          {process.steps.map((step) => (
            <li key={step.number}>
              <Reveal className="flex min-h-[280px] flex-col border-t-[3px] border-bronze bg-white/62 px-6 py-7 shadow-[0_24px_60px_rgba(23,52,45,.06)]">
                <p className="text-[0.75rem] text-bronze">{step.number}</p>
                <h3 className="mt-[54px] mb-[18px] font-serif text-[2rem] leading-tight font-normal">
                  {step.title}
                </h3>
                <p className="text-[0.92rem] text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-[-52%] -left-[8%] -z-10 h-[720px] w-[116%] -rotate-4 rounded-[50%] border border-[rgba(104,114,64,.11)]"
      />
    </section>
  );
}
