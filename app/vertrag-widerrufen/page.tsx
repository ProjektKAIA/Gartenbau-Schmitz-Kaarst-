import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/ui/SkipLink';
import { WithdrawalForm } from '@/components/withdrawal/WithdrawalForm';
import { withdrawalCopy } from '@/content/withdrawal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `${withdrawalCopy.title} | ${site.name}`,
  robots: { index: false },
};

export default function WithdrawalPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="shell py-[100px] max-md:py-16">
        <h1 className="display-2 mb-6">{withdrawalCopy.title}</h1>
        <div className="grid max-w-[680px] gap-8 text-stone">
          <p className="text-[1.05rem]">{withdrawalCopy.intro}</p>
          <WithdrawalForm />
          <p className="text-[0.85rem]">
            Alle Einzelheiten zu Ihrem Widerrufsrecht finden Sie in der{' '}
            <Link href="/widerruf" className="underline">
              Widerrufsbelehrung
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
