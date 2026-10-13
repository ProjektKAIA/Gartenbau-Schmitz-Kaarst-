import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { datenschutz } from '@/content/legal/datenschutz';
import { routes } from '@/lib/seo';

export const metadata = legalMetadata(datenschutz, routes.privacy.path);

export default function DatenschutzPage() {
  return <LegalPage document={datenschutz} />;
}
