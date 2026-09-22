import type { Metadata } from 'next';
import Link from 'next/link';
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
        <div className="grid max-w-[720px] gap-6 text-stone">
          <p className="border-l-4 border-olive pl-5 text-charcoal">
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
            <a href={`mailto:${site.contact.email}`} className="text-charcoal underline">
              {site.contact.email}
            </a>
            .
          </p>
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
