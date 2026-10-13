import { beforeEach, describe, expect, it, vi } from 'vitest';

type Mail = { to: string; subject: string; text: string; replyTo?: string };
const sendMail = vi.fn<(mail: Mail) => Promise<void>>();
const tryReadMailConfig = vi.fn<() => { MAIL_TO: string } | undefined>();

vi.mock('@/services/mail', () => ({
  tryReadMailConfig: () => tryReadMailConfig(),
  sendMail: (mail: Mail) => sendMail(mail),
}));

const { POST } = await import('./route');

let ip = 0;
const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/withdrawal', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.1.0.${++ip}` },
      body: JSON.stringify(body),
    }),
  );

const valid = {
  withdrawal: { name: 'Erika Muster', contract: 'Bestellung vom 01.10.2026', email: 'erika@example.de' },
  website: '',
};

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue(undefined);
  tryReadMailConfig.mockReset().mockReturnValue({ MAIL_TO: 'info@example.de' });
});

describe('POST /api/withdrawal', () => {
  it('schickt Erklärung an den Betrieb und Eingangsbestätigung mit Zeitstempel an den Kunden', async () => {
    expect((await post(valid)).status).toBe(200);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({ to: 'info@example.de', replyTo: 'erika@example.de' });
    const confirmation = sendMail.mock.calls[1]?.[0];
    expect(confirmation?.to).toBe('erika@example.de');
    expect(confirmation?.text).toMatch(/Eingegangen am: \d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2} Uhr/);
  });

  it('lehnt unvollständige Erklärungen ab und verwirft Bots still', async () => {
    expect((await post({ ...valid, withdrawal: { ...valid.withdrawal, contract: '' } })).status).toBe(400);
    expect((await post({ ...valid, website: 'spam' })).status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('nennt den E-Mail-Weg, wenn der Versand nicht möglich ist', async () => {
    tryReadMailConfig.mockReturnValue(undefined);
    const response = await post(valid);
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ error: expect.stringContaining('per E-Mail') });
  });
});
