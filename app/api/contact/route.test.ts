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
const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.2.0.${++ip}`, ...headers },
      body: JSON.stringify(body),
    }),
  );

const valid = {
  contact: {
    name: 'Erika Muster',
    email: 'erika@example.de',
    phone: '',
    replyVia: 'email',
    topic: 'pflege',
    street: '',
    postalCode: '',
    city: '',
    timeframe: '',
    message: 'Bitte um ein Angebot für die Heckenpflege.',
  },
  website: '',
};

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue(undefined);
  tryReadMailConfig.mockReset().mockReturnValue({ MAIL_TO: 'info@example.de' });
});

describe('POST /api/contact', () => {
  it('schickt genau eine Mail an den Betrieb mit Reply-To Kunde – keine Kundenbestätigung', async () => {
    expect((await post(valid)).status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({
      to: 'info@example.de',
      replyTo: 'erika@example.de',
      subject: 'Kontaktanfrage: Gartenpflege – Erika Muster',
    });
  });

  it('lehnt ungültige Anfragen ab und verwirft Bots still', async () => {
    expect((await post({ ...valid, contact: { ...valid.contact, message: 'kurz' } })).status).toBe(400);
    expect((await post({ ...valid, extra: 1 })).status).toBe(400);
    expect((await post({ ...valid, website: 'spam' })).status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('lehnt fehlende oder falsch geformte Kontaktdaten mit 400 ab statt abzustürzen', async () => {
    for (const body of [{}, { contact: null, website: '' }, { contact: 'x', website: '' }, [], null]) {
      expect((await post(body)).status).toBe(400);
    }
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('verlangt JSON', async () => {
    expect((await post(valid, { 'content-type': 'text/plain' })).status).toBe(415);
  });

  it('nennt Telefon und E-Mail, wenn der Versand nicht konfiguriert ist', async () => {
    tryReadMailConfig.mockReturnValue(undefined);
    const response = await post(valid);
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false, error: expect.stringContaining('rufen Sie uns an') });
  });

  it('meldet 502, wenn der Mailserver ablehnt', async () => {
    sendMail.mockRejectedValue(new Error('SMTP down'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect((await post(valid)).status).toBe(502);
  });

  it('begrenzt Anfragen je IP', async () => {
    const headers = { 'x-forwarded-for': '10.9.9.9' };
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(valid, headers)).status);
    expect(statuses.at(-1)).toBe(429);
  });
});
