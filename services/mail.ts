import nodemailer, { type Transporter } from 'nodemailer';
import { z } from 'zod';

/**
 * Mailversand über SMTP (Nodemailer). Zugangsdaten nur aus Umgebungsvariablen –
 * lokal `.env.local`, auf Vercel im Projekt-Dashboard. Nie committen.
 */
const mailEnvSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  /** `true` für implizites TLS (Port 465), sonst STARTTLS. */
  SMTP_SECURE: z.enum(['true', 'false']).transform((value) => value === 'true'),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  /** Absender, z. B. `Gartenbau Kaarst <shop@gartenbau-kaarst.de>`. */
  MAIL_FROM: z.string().min(3),
  /** Empfänger der Shop-Anfragen im Betrieb. */
  MAIL_TO: z.email(),
});

export type MailConfig = z.infer<typeof mailEnvSchema>;

export class MailNotConfiguredError extends Error {
  override name = 'MailNotConfiguredError';
}

export const readMailConfig = (env: Readonly<Record<string, string | undefined>> = process.env): MailConfig => {
  const parsed = mailEnvSchema.safeParse(env);
  if (!parsed.success) {
    // Nur die Namen fehlender Variablen nennen – nie Werte loggen.
    const missing = parsed.error.issues.map((issue) => String(issue.path[0])).join(', ');
    throw new MailNotConfiguredError(`Mailversand nicht konfiguriert: ${missing}`);
  }
  return parsed.data;
};

/** Wie `readMailConfig`, aber liefert `undefined` statt zu werfen, wenn Variablen fehlen (und loggt deren Namen). */
export const tryReadMailConfig = (): MailConfig | undefined => {
  try {
    return readMailConfig();
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      console.error(error.message);
      return undefined;
    }
    throw error;
  }
};

let transporter: Transporter | undefined;

const getTransporter = (config: MailConfig): Transporter => {
  transporter ??= nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    // Ohne implizites TLS muss STARTTLS klappen – kein Klartext-Fallback.
    requireTLS: !config.SMTP_SECURE,
    auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
  });
  return transporter;
};

export type OutgoingMail = {
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly replyTo?: string;
};

export const sendMail = async (mail: OutgoingMail, config: MailConfig = readMailConfig()): Promise<void> => {
  await getTransporter(config).sendMail({
    from: config.MAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
  });
};
