import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Datenschutz | ${site.name}`,
  robots: { index: false },
};

/**
 * Platzhalter mit Absicht: Die Datenschutzerklärung der Altseite nennt Webflow als
 * Auftragsverarbeiter. Diese Seite läuft auf Vercel – der Text muss deshalb neu
 * erstellt und nicht übernommen werden. Bis dahin bleibt die Seite unveröffentlicht
 * (noindex) und benennt den offenen Punkt.
 */
export default function DatenschutzPage() {
  return (
    <>
      <main id="main" className="shell py-[120px] max-md:py-20">
        <h1 className="display-2 mb-12">Datenschutz</h1>
        <div className="grid max-w-[720px] gap-6 text-muted">
          <p className="border-l-4 border-bronze pl-5 text-ink">
            Diese Seite ist noch nicht befüllt. Die Datenschutzerklärung der bisherigen Website
            kann nicht unverändert übernommen werden: Sie beschreibt das Hosting bei Webflow,
            während diese Seite bei Vercel liegt.
          </p>
          <p>
            Vor dem Livegang müssen mindestens Hosting, Server-Logfiles, Kontaktaufnahme per
            E-Mail und Telefon sowie die eingebundenen Drittdienste neu beschrieben werden.
          </p>
          <p>
            Verantwortlich im Sinne der DSGVO ist {site.owner}, {site.address.street},{' '}
            {site.address.postalCode} {site.address.city}, erreichbar unter{' '}
            <a href={`mailto:${site.contact.email}`} className="text-ink underline">
              {site.contact.email}
            </a>
            .
          </p>
          <p>
            <a href="/" className="border-b border-current text-ink">
              Zurück zur Startseite
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
