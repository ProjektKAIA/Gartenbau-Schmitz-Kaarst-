import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/ui/SkipLink';
import { pageMetadata, routes } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Impressum',
  description: `Impressum von ${site.name} – ${site.legalName}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
  path: routes.imprint.path,
});

export default function ImpressumPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="shell py-14 max-md:py-10">
        <h1 className="display-page mb-12">Impressum</h1>

        <div className="grid max-w-[720px] gap-8 text-stone wrap-anywhere">
          <section>
            <h2 className="mb-2 text-[1.5rem] font-bold text-charcoal">Angaben gemäß § 5 DDG</h2>
            <p>
              {site.owner}
              <br />
              {site.qualification}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[1.5rem] font-bold text-charcoal">Kontakt</h2>
            <p>
              Telefon: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <br />
              E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[1.5rem] font-bold text-charcoal">Umsatzsteuer-Identifikationsnummer</h2>
            <p>Gemäß § 27 a Umsatzsteuergesetz: {site.vatId}</p>
          </section>

          <section>
            <h2 className="mb-2 text-[1.5rem] font-bold text-charcoal">Berufshaftpflicht</h2>
            <p>
              Zürich Beteiligungs-Aktiengesellschaft (Deutschland)
              <br />
              Platz der Einheit 2
              <br />
              60327 Frankfurt am Main
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[1.5rem] font-bold text-charcoal">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <p>
            <Link href="/" className="border-b border-current text-charcoal">
              Zurück zur Startseite
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
