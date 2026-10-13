import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { widerruf } from '@/content/legal/widerruf';
import { routes } from '@/lib/seo';

export const metadata = legalMetadata(widerruf, routes.withdrawal.path);

export default function WiderrufPage() {
  return <LegalPage document={widerruf} />;
}
