import { serializeJsonLd, type JsonLdObject } from '@/lib/seo';

/**
 * Strukturierte Daten als <script type="application/ld+json">.
 * dangerouslySetInnerHTML ist hier unbedenklich: Inhalt stammt aus eigenen Daten und
 * wird von serializeJsonLd so escaped, dass er das Script-Tag nicht verlassen kann.
 */
export function JsonLd({ data }: { readonly data: JsonLdObject }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
