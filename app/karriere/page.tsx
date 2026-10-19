import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageIntro } from '@/components/pages/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { SkipLink } from '@/components/ui/SkipLink';
import { applyBand, careerApplyHref, karrierePage, openings, workPoints } from '@/content/karriere';
import { contactHref } from '@/lib/contact';
import { pageMetadata, routes } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Karriere – Jobs & Ausbildung im Garten- und Landschaftsbau in Kaarst',
  description: `Landschaftsgärtner/in oder Ausbildung im GaLaBau gesucht? Gartenbau Kaarst ist Ausbildungsbetrieb seit ${site.trainingCompanySince} – jetzt einfach bewerben.`,
  path: routes.career.path,
});

export default function KarrierePage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <PageIntro
          label={karrierePage.label}
          title={karrierePage.title}
          intro={karrierePage.intro}
          image={{ src: '/assets/hero.webp', alt: karrierePage.imageAlt }}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={careerApplyHref} variant="dark">
              {applyBand.mailCta}
            </ButtonLink>
          </div>
        </PageIntro>

        <section aria-labelledby="openings-title" className="bg-mist py-[96px] max-md:py-16">
          <div className="shell">
            <Eyebrow>{openings.label}</Eyebrow>
            <h2 id="openings-title" className="display-2 max-w-[760px]">
              {openings.title}
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
              {openings.items.map((item) => (
                <article key={item.title} className="border border-line bg-white p-8 max-sm:p-6">
                  <h3 className="text-[1.4rem] leading-tight font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-4 text-stone">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="work-title" className="bg-paper py-[96px] max-md:py-16">
          <div className="shell">
            <Eyebrow>{workPoints.label}</Eyebrow>
            <h2 id="work-title" className="display-2 max-w-[760px]">
              {workPoints.title}
            </h2>
            <ul className="mt-12 grid list-none grid-cols-3 gap-[34px] p-0 max-md:grid-cols-1">
              {workPoints.items.map((item) => (
                <li key={item.title} className="border-t border-line pt-6">
                  <h3 className="text-[1.25rem] font-bold">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-stone">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="apply-title" className="bg-olive py-20 text-white max-md:py-16">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <Eyebrow tone="light">{applyBand.label}</Eyebrow>
              <h2 id="apply-title" className="max-w-[720px] text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                {applyBand.title}
              </h2>
              <p className="mt-4 max-w-[560px] text-white/75">{applyBand.body}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={careerApplyHref} variant="light">
                {applyBand.mailCta}
              </ButtonLink>
              <ButtonLink href={contactHref('karriere')} variant="dark">
                {applyBand.formCta}
              </ButtonLink>
              <ButtonLink href={site.contact.phoneHref} variant="dark">
                {site.contact.phone}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
