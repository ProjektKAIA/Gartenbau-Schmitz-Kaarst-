import { Eyebrow } from '@/components/ui/SectionLabel';
import { process } from '@/content/home';

export function Process() {
  return (
    <section
      id="ablauf"
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden bg-paper py-[132px] max-md:py-[92px]"
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
        <div className="mb-[70px] grid grid-cols-[1.35fr_0.65fr] items-end gap-[70px] max-md:grid-cols-1 max-md:gap-7">
          <div>
            <Eyebrow>{process.label}</Eyebrow>
            <h2 id="process-title" className="display-2">
              {process.titleFirst}
              <br />
              {process.titleSecond}
            </h2>
          </div>
          <p className="max-w-[460px] text-stone">{process.intro}</p>
        </div>

        <div aria-hidden="true" className="mt-6 h-px bg-line max-md:hidden" />

        <ol className="mt-[-8px] grid list-none grid-cols-4 gap-[34px] p-0 max-md:mt-0 max-md:grid-cols-2 max-md:gap-x-7 max-md:gap-y-[50px] max-sm:grid-cols-1">
          {process.steps.map((step) => (
            <li key={step.number}>
              <span
                aria-hidden="true"
                className="mb-[38px] block size-[15px] rounded-full bg-olive max-md:mb-5"
              />
              <span className="text-[0.76rem] text-olive">{step.number}</span>
              <h3 className="mt-3 mb-[18px] text-[1.55rem] leading-[1.02] font-bold tracking-[-0.035em]">
                {step.title}
              </h3>
              <p className="text-[0.93rem] text-stone">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
