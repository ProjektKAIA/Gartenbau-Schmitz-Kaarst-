import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { agb } from '@/content/legal/agb';
import { routes } from '@/lib/seo';

export const metadata = legalMetadata(agb, routes.terms.path);

export default function AgbPage() {
  return <LegalPage document={agb} />;
}
