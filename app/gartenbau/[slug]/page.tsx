import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceAreas } from '@/content/areas';
import { areaLocation, findArea, isInDeliveryArea, otherAreas } from '@/lib/areas';
import { areaPath, faqPageJsonLd, pageMetadata, routes } from '@/lib/seo';
import { AreaLanding } from '../_components/AreaLanding';

type AreaPageProps = {
  readonly params: Promise<{ slug: string }>;
};

/** Nur die Orte aus content/areas.ts – alles andere ist 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const area = findArea((await params).slug);
  if (!area) return {};
  return pageMetadata({ title: area.metaTitle, description: area.metaDescription, path: areaPath(area.slug) });
}

export default async function AreaPage({ params }: AreaPageProps) {
  const area = findArea((await params).slug);
  if (!area) notFound();

  const breadcrumbs = [
    { name: 'Startseite', path: routes.home.path },
    { name: `Gartenbau ${area.city}`, path: areaPath(area.slug) },
  ] as const;

  return (
    <>
      <JsonLd data={faqPageJsonLd(area.faqs)} />
      <SiteHeader />
      <AreaLanding
        area={area}
        breadcrumbs={breadcrumbs}
        location={areaLocation(area.center)}
        deliverable={isInDeliveryArea(area.center)}
        others={otherAreas(area.slug)}
      />
      <SiteFooter />
    </>
  );
}
