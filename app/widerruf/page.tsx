import { LegalPage, legalMetadata } from '@/components/legal/LegalPage';
import { widerruf } from '@/content/legal/widerruf';

export const metadata = legalMetadata(widerruf);

export default function WiderrufPage() {
  return <LegalPage document={widerruf} />;
}
