import { Eyebrow } from '@/components/ui/SectionLabel';
import { project } from '@/content/home';

export function ProjectStage() {
  return (
    <section
      id="projekte"
      aria-labelledby="project-title"
      className="relative isolate overflow-hidden bg-paper pt-[160px] pb-[132px] max-md:py-[92px] max-sm:pt-[100px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-5 -left-20 -z-10 size-[410px] rotate-[11deg] bg-[url('/assets/logo.png')] bg-contain bg-center bg-no-repeat opacity-[0.025] grayscale max-md:opacity-[0.02]"
      />

      <div className="shell relative z-[2]">
        <div className="relative min-h-[660px] overflow-hidden shadow-frame max-md:min-h-[560px] max-sm:min-h-[620px]">
          <div
            role="img"
            aria-label={project.imageAlt}
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,12,.65),rgba(20,24,12,.05)_66%),url('/assets/hero.webp')] bg-cover bg-center bg-no-repeat"
          />
          <div
            aria-hidden="true"
            className="absolute top-[-34%] right-[-6%] z-[2] h-[130%] w-[45%] -rotate-[17deg] rounded-[50%] border-2 border-white/52"
          />
          <div className="absolute bottom-0 left-0 z-[2] w-[min(480px,90%)] bg-olive p-[42px] text-white max-sm:p-7">
            <Eyebrow tone="light" className="mb-0 text-[0.74rem] tracking-[0.16em]">
              {project.label}
            </Eyebrow>
            <strong
              id="project-title"
              className="my-4 mb-7 block text-[clamp(2rem,3vw,3.2rem)] leading-[1.04] font-bold"
            >
              {project.titleFirst}
              <br />
              {project.titleSecond}
            </strong>
            <a href="#kontakt" className="border-b border-white/60 pb-1 text-[0.9rem]">
              {project.cta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <p className="mt-3.5 text-[0.78rem] text-[#8a8984]">{project.draftNote}</p>
      </div>
    </section>
  );
}
