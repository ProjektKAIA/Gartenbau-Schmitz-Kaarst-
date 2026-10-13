import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { agb } from '@/content/legal/agb';

export const metadata = legalMetadata(agb);

export default function AgbPage() {
  return <LegalPage document={agb} />;
}
