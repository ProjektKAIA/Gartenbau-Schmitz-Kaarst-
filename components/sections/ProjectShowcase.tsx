import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { project } from '@/content/home';

export function ProjectShowcase() {
  return (
    <section
      id="projekte"
      aria-labelledby="project-title"
      className="relative min-h-[820px] overflow-hidden bg-pine max-sm:min-h-[700px]"
    >
      <div
        role="img"
        aria-label={project.imageAlt}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,52,45,.76),rgba(23,52,45,.08)),url('/assets/hero.webp')] bg-cover bg-center bg-no-repeat"
      />
      <Reveal className="absolute top-1/2 left-[max(28px,calc((100vw-1280px)/2))] z-[2] w-[min(580px,calc(100%-56px))] -translate-y-1/2 text-white max-sm:left-[17px] max-sm:w-[calc(100%-34px)]">
        <SectionLabel tone="light">{project.label}</SectionLabel>
        <h2 id="project-title" className="display-2 mb-7">
          {project.titleFirst}
          <br />
          {project.titleSecond}
        </h2>
        <p className="max-w-[510px] text-white/72">{project.body}</p>
        <ButtonLink href="#kontakt" variant="light" className="mt-9">
          {project.cta}
        </ButtonLink>
      </Reveal>
      <p className="absolute right-6 bottom-5 z-[2] text-[0.72rem] text-white/60">
        {project.draftNote}
      </p>
    </section>
  );
}
