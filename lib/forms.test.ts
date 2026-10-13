import { describe, expect, it } from 'vitest';
import { fieldErrorsFrom, readApiError } from './forms';

describe('fieldErrorsFrom', () => {
  it('nimmt die erste Meldung je Feld', () => {
    expect(
      fieldErrorsFrom([
        { path: ['name'], message: 'A' },
        { path: ['name'], message: 'B' },
        { path: [], message: 'C' },
      ]),
    ).toEqual({ name: 'A', form: 'C' });
  });
});

describe('readApiError', () => {
  it('liest die Fehlermeldung oder fällt auf den Standardtext zurück', async () => {
    expect(await readApiError(Response.json({ ok: false, error: 'Kaputt' }), 'X')).toBe('Kaputt');
    expect(await readApiError(new Response('<html>'), 'X')).toBe('X');
    expect(await readApiError(Response.json({ error: 42 }), 'X')).toBe('X');
  });
});
