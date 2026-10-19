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
    new Request('http://localhost/api/application', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.3.0.${++ip}`, ...headers },
      body: JSON.stringify(body),
    }),
  );

const valid = {
  application: {
    name: 'Max Muster',
    email: 'max@example.de',
    phone: '0177 1234567',
    city: 'Neuss',
    workload: 'teilzeit',
    galabauTraining: 'ja',
    otherTraining: '',
    experience: 'ueber-5',
    license: 'b',
    availableFrom: '01.03.2027',
    message: '',
  },
  website: '',
};

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue(undefined);
  tryReadMailConfig.mockReset().mockReturnValue({ MAIL_TO: 'info@example.de' });
});

describe('POST /api/application', () => {
  it('schickt genau eine Mail an den Betrieb mit Reply-To Bewerber/in – keine Bestätigung', async () => {
    expect((await post(valid)).status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({
      to: 'info@example.de',
      replyTo: 'max@example.de',
      subject: 'Bewerbung: Landschaftsgärtner/in (m/w/d) – Max Muster',
    });
  });

  it('lehnt ungültige oder falsch geformte Bewerbungen mit 400 ab und verwirft Bots still', async () => {
    expect((await post({ ...valid, application: { ...valid.application, workload: 'minijob' } })).status).toBe(400);
    expect((await post({ ...valid, extra: 1 })).status).toBe(400);
    for (const body of [{}, { application: null, website: '' }, [], null]) {
      expect((await post(body)).status).toBe(400);
    }
    expect((await post({ ...valid, website: 'spam' })).status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('nennt Telefon und E-Mail, wenn der Versand nicht konfiguriert ist', async () => {
    tryReadMailConfig.mockReturnValue(undefined);
    const response = await post(valid);
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false, error: expect.stringContaining('ruf uns an') });
  });

  it('meldet 502, wenn der Mailserver ablehnt', async () => {
    sendMail.mockRejectedValue(new Error('SMTP down'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect((await post(valid)).status).toBe(502);
  });
});
