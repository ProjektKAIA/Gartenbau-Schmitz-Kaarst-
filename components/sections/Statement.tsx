import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { statement } from '@/content/home';

export function Statement() {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-[132px] max-md:py-[94px]">
      <div className="shell relative z-[2] grid grid-cols-[0.35fr_1.65fr] gap-[70px] max-md:grid-cols-1 max-md:gap-8">
        <SectionLabel number="01">{statement.label}</SectionLabel>
        <Reveal>
          <h2 className="display-2 max-w-[1030px]">
            {statement.titleLead}
            <em className="text-olive italic">{statement.titleAccent}</em>
          </h2>
          <p className="mt-[42px] ml-auto max-w-[650px] text-[1.08rem] text-muted max-md:ml-0">
            {statement.body}
          </p>
        </Reveal>
      </div>
      {/* Logo als sehr blasses Wasserzeichen. */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[230px] -left-[190px] -z-10 size-[660px] -rotate-[18deg] bg-[url('/assets/logo.png')] bg-contain bg-center bg-no-repeat opacity-[0.026] grayscale"
      />
    </section>
  );
}
