import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendMail = vi.fn<(mail: { to: string; subject: string; text: string; replyTo?: string }) => Promise<void>>();
const tryReadMailConfig = vi.fn<() => { MAIL_TO: string } | undefined>();

vi.mock('@/services/mail', () => ({
  tryReadMailConfig: () => tryReadMailConfig(),
  sendMail: (mail: { to: string; subject: string; text: string; replyTo?: string }) => sendMail(mail),
}));

// Der Schalter `ordersOpen` wird je Test gesetzt: Bestellung (true) oder Anfrage (false).
const shop = vi.hoisted(() => ({ ordersOpen: true }));

vi.mock('@/content/shop', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/shop')>();
  return {
    ...actual,
    shopTerms: {
      ...actual.shopTerms,
      get ordersOpen() {
        return shop.ordersOpen;
      },
    },
  };
});

const { POST } = await import('./route');

const customer = {
  name: 'Erika Muster',
  street: 'Gartenweg 1',
  postalCode: '41564',
  city: 'Kaarst',
  phone: '02131 12345',
  email: 'erika@example.de',
  message: '',
  confirmDeliveryArea: true,
  acceptTerms: true,
};

let ipCounter = 0;
const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request('http://localhost/api/shop-order', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${++ipCounter}`, ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );

const valid = { customer, lines: [{ variantId: 'kies-16-32', quantity: 2 }], website: '' };

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue(undefined);
  tryReadMailConfig.mockReset().mockReturnValue({ MAIL_TO: 'info@example.de' });
  shop.ordersOpen = true;
});

describe('POST /api/shop-order', () => {
  it('nimmt im Vorschau-Modus eine unverbindliche Anfrage an – ohne AGB-Anhang und ohne Freitext', async () => {
    shop.ordersOpen = false;
    const response = await post({ ...valid, customer: { ...customer, message: 'Bitte vormittags' } });
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(2);
    const business = sendMail.mock.calls[0]?.[0];
    expect(business).toMatchObject({ to: 'info@example.de', replyTo: 'erika@example.de' });
    expect(business?.subject).toBe('Shop-Anfrage – Erika Muster');
    expect(business?.text).toContain('- 2 m³ Kies, 16–32 mm, lose');
    expect(business?.text).toContain('Bitte vormittags');
    expect(business?.text).not.toContain('0,00');
    const confirmation = sendMail.mock.calls[1]?.[0];
    expect(confirmation?.to).toBe('erika@example.de');
    expect(confirmation?.text).toContain('unverbindlich');
    expect(confirmation?.text).toContain('Preis und möglichem Liefertermin');
    expect(confirmation?.text).not.toContain('ALLGEMEINE GESCHÄFTSBEDINGUNGEN');
    expect(confirmation?.text).not.toContain('Bitte vormittags');
  });

  it('meldet auch im Anfrage-Modus 503, wenn der Mailversand nicht konfiguriert ist', async () => {
    shop.ordersOpen = false;
    tryReadMailConfig.mockReturnValue(undefined);
    expect((await post(valid)).status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('verlangt in beiden Modi die Annahme der AGB und die Bestätigung des Liefergebiets', async () => {
    for (const open of [true, false]) {
      shop.ordersOpen = open;
      expect((await post({ ...valid, customer: { ...customer, acceptTerms: false } })).status).toBe(400);
      const withoutTerms = Object.fromEntries(Object.entries(customer).filter(([key]) => key !== 'acceptTerms'));
      expect((await post({ ...valid, customer: withoutTerms })).status).toBe(400);
      expect((await post({ ...valid, customer: { ...customer, confirmDeliveryArea: false } })).status).toBe(400);
    }
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('schickt Bestellung an den Betrieb und Eingangsbestätigung mit AGB/Widerruf an den Kunden', async () => {
    const response = await post(valid);
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({ to: 'info@example.de', replyTo: 'erika@example.de' });
    expect(sendMail.mock.calls[0]?.[0].subject).toBe('Shop-Bestellung – Erika Muster');
    const confirmation = sendMail.mock.calls[1]?.[0];
    expect(confirmation?.to).toBe('erika@example.de');
    expect(confirmation?.text).toContain('ALLGEMEINE GESCHÄFTSBEDINGUNGEN');
    expect(confirmation?.text).toContain('Muster-Widerrufsformular');
  });

  it('lehnt ungültige Daten, falsches Format und unbekannte Artikel ab', async () => {
    expect((await post({ ...valid, customer: { ...customer, postalCode: '1' } })).status).toBe(400);
    expect((await post('kein json')).status).toBe(400);
    expect((await post(valid, { 'content-type': 'text/plain' })).status).toBe(415);
    expect((await post({ ...valid, lines: [{ variantId: 'gibt-es-nicht', quantity: 1 }] })).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('verwirft Bot-Anfragen (Honeypot) still', async () => {
    const response = await post({ ...valid, website: 'https://spam.example' });
    expect(response.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('meldet 503, wenn der Mailversand nicht konfiguriert ist', async () => {
    tryReadMailConfig.mockReturnValue(undefined);
    expect((await post(valid)).status).toBe(503);
  });

  it('meldet 502, wenn die Mail an den Betrieb scheitert', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP down'));
    expect((await post(valid)).status).toBe(502);
  });

  it('bleibt erfolgreich, wenn nur die Eingangsbestätigung scheitert', async () => {
    sendMail.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('Postfach voll'));
    expect((await post(valid)).status).toBe(200);
  });

  it('lehnt zu große Anfragen schon anhand von Content-Length ab', async () => {
    const response = await post(valid, { 'content-length': '5000000' });
    expect(response.status).toBe(413);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('lehnt doppelte Artikel ab (Umgehung der Höchstmenge)', async () => {
    const lines = [
      { variantId: 'kies-16-32', quantity: 99 },
      { variantId: 'kies-16-32', quantity: 99 },
    ];
    expect((await post({ ...valid, lines })).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('begrenzt Anfragen je IP', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      statuses.push((await post(valid, { 'x-forwarded-for': '192.168.1.1' })).status);
    }
    expect(statuses.slice(0, 5).every((status) => status === 200)).toBe(true);
    expect(statuses[5]).toBe(429);
  });
});
