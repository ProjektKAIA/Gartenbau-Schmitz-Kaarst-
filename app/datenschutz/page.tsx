import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { datenschutz } from '@/content/legal/datenschutz';

export const metadata = legalMetadata(datenschutz);

export default function DatenschutzPage() {
  return <LegalPage document={datenschutz} />;
}
