import { describe, expect, it } from 'vitest';
import { agb } from '@/content/legal/agb';
import { widerruf } from '@/content/legal/widerruf';
import { legalDocumentToText } from './to-text';

describe('legalDocumentToText', () => {
  it('rendert Überschriften, Absätze und Listen und lässt offene Punkte weg', () => {
    const text = legalDocumentToText({
      title: 'Test',
      updated: 'Oktober 2026',
      sections: [
        {
          heading: '1. Abschnitt',
          blocks: [
            { type: 'p', text: 'Absatz' },
            { type: 'list', items: ['eins', 'zwei'] },
            { type: 'todo', text: 'INTERN' },
          ],
        },
      ],
    });
    expect(text).toBe('TEST\nStand: Oktober 2026\n\n1. Abschnitt\nAbsatz\n- eins\n- zwei');
  });

  it('enthält das Muster-Widerrufsformular und keine internen Todos', () => {
    expect(legalDocumentToText(widerruf)).toContain('Muster-Widerrufsformular');
    expect(legalDocumentToText(agb)).not.toContain('Offen:');
  });
});
