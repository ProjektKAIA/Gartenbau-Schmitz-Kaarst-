import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageHero } from '@/components/pages/PageHero';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';
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
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(contactCopy.label, routes.contact.path)}
          label={contactCopy.label}
          title={contactCopy.title}
          lead={contactCopy.intro}
        />
        <div className="shell grid grid-cols-[1.4fr_0.6fr] items-start gap-14 pt-14 pb-20 max-md:pt-10 max-lg:grid-cols-[1.3fr_0.7fr] max-lg:gap-10 max-md:grid-cols-1 max-md:pb-14">
          <ContactForm initialTopic={initialTopic} />
          <div className="sticky top-[calc(var(--header-h)+24px)] max-md:static">
            <ContactDetails />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
