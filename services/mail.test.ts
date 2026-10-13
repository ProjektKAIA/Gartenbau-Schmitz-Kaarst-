import { describe, expect, it } from 'vitest';
import { MailNotConfiguredError, readMailConfig } from './mail';

const env = {
  SMTP_HOST: 'smtp.example.de',
  SMTP_PORT: '465',
  SMTP_SECURE: 'true',
  SMTP_USER: 'shop@example.de',
  SMTP_PASS: 'geheim-123',
  MAIL_FROM: 'Gartenbau Kaarst <shop@example.de>',
  MAIL_TO: 'info@example.de',
};

describe('readMailConfig', () => {
  it('liest und typisiert die Umgebungsvariablen', () => {
    expect(readMailConfig(env)).toMatchObject({ SMTP_PORT: 465, SMTP_SECURE: true });
  });

  it('nennt fehlende Variablen, ohne Werte preiszugeben', () => {
    const read = () => readMailConfig({ ...env, SMTP_HOST: '', SMTP_PASS: undefined });
    expect(read).toThrow(MailNotConfiguredError);
    expect(read).toThrow(/SMTP_HOST, SMTP_PASS/);
    expect(read).not.toThrow(/geheim-123/);
  });
});
