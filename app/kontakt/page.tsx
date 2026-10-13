import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageIntro } from '@/components/pages/PageIntro';
import { pageMetadata, routes } from '@/lib/seo';
import { SkipLink } from '@/components/ui/SkipLink';
import { contactCopy } from '@/content/contact';
import { TOPIC_QUERY_PARAM, topicFromQuery } from '@/lib/contact';

export const metadata = pageMetadata({
  title: 'Kontakt – Anfrage für Garten- und Landschaftsbau in Kaarst',
  description:
    'Kontakt zu Gartenbau Kaarst: Anfrage für Gartengestaltung, Pflaster, Gartenpflege, Winterdienst und mehr in Kaarst, Neuss und Umgebung – per Formular, Telefon oder E-Mail.',
  path: routes.contact.path,
});

type KontaktPageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function KontaktPage({ searchParams }: KontaktPageProps) {
  // Vorbelegung über `?anliegen=…` – unbekannte Werte werden ignoriert.
  const initialTopic = topicFromQuery((await searchParams)[TOPIC_QUERY_PARAM]);

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <PageIntro label={contactCopy.label} title={contactCopy.title} intro={contactCopy.intro} />
        <div className="shell grid grid-cols-[1.4fr_0.6fr] items-start gap-14 pb-[96px] max-lg:grid-cols-[1.3fr_0.7fr] max-lg:gap-10 max-md:grid-cols-1 max-md:pb-16">
          <ContactForm initialTopic={initialTopic} />
          <div className="sticky top-6 max-md:static">
            <ContactDetails />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
