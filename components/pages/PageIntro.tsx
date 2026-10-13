import Image from 'next/image';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

type PageIntroProps = {
  readonly label: string;
  readonly title: ReactNode;
  readonly intro: string;
  readonly image?: { readonly src: string; readonly alt: string; readonly contain?: boolean };
  /** Zusatz unter dem Text, z. B. Sprungmarken. */
  readonly children?: ReactNode;
};

/**
 * Kompakter Seitenkopf der Unterseiten – bewusst keine bildschirmfüllende Hero-Fläche,
 * damit der Inhalt sofort sichtbar ist.
 */
export function PageIntro({ label, title, intro, image, children }: PageIntroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-paper pt-12 pb-12 max-md:pt-10 max-md:pb-10">
      <div
        className={cn(
          'shell grid items-center gap-14',
          image ? 'grid-cols-[1.25fr_0.75fr] max-lg:grid-cols-[1.4fr_0.6fr] max-md:grid-cols-1 max-md:gap-8' : '',
        )}
      >
        <div>
          <Eyebrow>{label}</Eyebrow>
          <h1 id="page-title" className="display-page max-w-[860px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[640px] text-[1.05rem] text-stone">{intro}</p>
          {children}
        </div>
        {image ? (
          <div
            className={cn(
              'relative aspect-[16/10] overflow-hidden max-md:aspect-[16/9] max-md:max-h-[240px]',
              image.contain ? 'bg-mist' : 'bg-sand',
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 38vw"
              className={image.contain ? 'object-contain p-[12%]' : 'object-cover'}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
