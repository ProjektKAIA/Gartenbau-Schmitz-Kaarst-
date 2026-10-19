import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { process } from '@/content/home';
import { ProcessSteps } from './ProcessSteps';
import { routes } from '@/lib/seo';

export function Process() {
  return (
    <section
      id="ablauf"
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden bg-paper section-pad"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-[130px] -z-10 h-[480px] w-[520px] rotate-[19deg] text-stone opacity-[0.065] paver-grid [background-size:66px_38px] [mask-image:radial-gradient(circle_at_50%_50%,#000_15%,transparent_72%)] max-md:opacity-[0.045]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-310px] left-[10%] -z-10 h-[500px] w-[80%] rotate-[4deg] rounded-[50%] border border-[rgba(83,92,38,.075)] max-sm:hidden"
      />

      <div className="shell relative z-[2]">
        <div className="mb-12 grid grid-cols-[1.35fr_0.65fr] items-end gap-12 max-md:grid-cols-1 max-md:gap-7">
          <div>
            <Eyebrow>{process.label}</Eyebrow>
            <h2 id="process-title" className="display-2">
              {process.titleFirst}
              <br />
              {process.titleSecond}
            </h2>
          </div>
          <div className="max-w-[460px]">
            <p className="text-stone">{process.intro}</p>
            <TextLink href={routes.process.path} className="mt-6">
              {process.moreLink}
            </TextLink>
          </div>
        </div>

        <ProcessSteps />
      </div>
    </section>
  );
}
