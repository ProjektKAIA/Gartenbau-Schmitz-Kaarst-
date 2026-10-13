import type { LegalBlock, LegalDocument } from '@/content/legal/types';

const blockToText = (block: LegalBlock): string | null => {
  switch (block.type) {
    case 'p':
      return block.text;
    case 'list':
      return block.items.map((item) => `- ${item}`).join('\n');
    case 'todo':
      // Offene Punkte gehören auf die Website-Vorschau, nicht in Kunden-Mails.
      return null;
    default: {
      const unreachable: never = block;
      return unreachable;
    }
  }
};

/** Rechtstext als reiner Text – für die Bestellbestätigung (dauerhafter Datenträger). */
export const legalDocumentToText = (document: LegalDocument): string =>
  [
    document.title.toUpperCase(),
    `Stand: ${document.updated}`,
    ...(document.intro ? ['', document.intro] : []),
    ...document.sections.flatMap((section) => [
      '',
      section.heading,
      ...section.blocks.flatMap((block) => {
        const text = blockToText(block);
        return text === null ? [] : [text];
      }),
    ]),
  ].join('\n');
