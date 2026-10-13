import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { About } from '@/components/sections/About';
import { Career } from '@/components/sections/Career';
import { Contact } from '@/components/sections/Contact';
import { Extras } from '@/components/sections/Extras';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Process } from '@/components/sections/Process';
import { ProjectStage } from '@/components/sections/ProjectStage';
import { Services } from '@/components/sections/Services';
import { SkipLink } from '@/components/ui/SkipLink';

export default function Page() {
  return (
    <>
      <SkipLink />
      <SiteHeader overlay />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <ProjectStage />
        <Extras />
        <Process />
        <About />
        <Career />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
