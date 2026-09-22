import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { CareerContact } from '@/components/sections/CareerContact';
import { Company } from '@/components/sections/Company';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Services } from '@/components/sections/Services';
import { Specials } from '@/components/sections/Specials';
import { Statement } from '@/components/sections/Statement';
import { TrustBar } from '@/components/sections/TrustBar';

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-[-100px] left-3 z-[100] bg-white px-3.5 py-2.5 focus:top-3"
      >
        Zum Inhalt
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustBar />
        <Statement />
        <Services />
        <ProjectShowcase />
        <Process />
        <Company />
        <Specials />
        <CareerContact />
      </main>
      <SiteFooter />
    </>
  );
}
