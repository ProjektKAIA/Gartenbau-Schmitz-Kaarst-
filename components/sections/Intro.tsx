import { Reveal } from '@/components/ui/Reveal';
import { SectionKicker } from '@/components/ui/SectionLabel';
import { intro } from '@/content/home';

export function Intro() {
  return (
    <section className="relative isolate overflow-hidden bg-mist section-pad">
      {/* Logo als Wasserzeichen, dazu eine organische Kontur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[130px] -left-[155px] -z-10 size-[620px] -rotate-[13deg] bg-[url('/assets/logo.png')] bg-contain bg-center bg-no-repeat opacity-[0.032] grayscale max-md:opacity-[0.02]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[7%] right-[5%] -z-10 h-[520px] w-[340px] rotate-[24deg] rounded-[55%_42%_58%_38%] border border-[rgba(83,92,38,.1)] max-sm:hidden"
      />

      <div className="shell relative z-[2] grid grid-cols-[1fr_3fr] gap-12 max-md:grid-cols-1 max-md:gap-5">
        <SectionKicker number={intro.number}>{intro.label}</SectionKicker>
        <Reveal className="max-w-[900px]">
          <h2 className="display-2">
            {intro.titleLead}
            <em className="text-olive not-italic">{intro.titleAccent}</em>
          </h2>
          <p className="mt-6 max-w-[690px] text-[1.1rem] text-stone">
            {intro.body}
          </p>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="absolute -right-[90px] -bottom-[130px] -z-10 size-[480px] rotate-[28deg] text-stone opacity-10 paver-grid [background-size:58px_34px]"
      />
    </section>
  );
}
