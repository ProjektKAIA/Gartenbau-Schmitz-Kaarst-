import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Impressum | ${site.name}`,
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <>
      <main id="main" className="shell py-[120px] max-md:py-20">
        <h1 className="display-2 mb-12">Impressum</h1>

        <div className="grid max-w-[720px] gap-8 text-muted">
          <section>
            <h2 className="mb-2 font-serif text-[1.5rem] text-ink">Angaben gemäß § 5 TMG</h2>
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
            <h2 className="mb-2 font-serif text-[1.5rem] text-ink">Kontakt</h2>
            <p>
              Telefon: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <br />
              E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[1.5rem] text-ink">Umsatzsteuer-Identifikationsnummer</h2>
            <p>Gemäß § 27 a Umsatzsteuergesetz: {site.vatId}</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[1.5rem] text-ink">Berufshaftpflicht</h2>
            <p>
              Zürich Beteiligungs-Aktiengesellschaft (Deutschland)
              <br />
              Platz der Einheit 2
              <br />
              60327 Frankfurt am Main
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[1.5rem] text-ink">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <p>
            <Link href="/" className="border-b border-current text-ink">
              Zurück zur Startseite
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
