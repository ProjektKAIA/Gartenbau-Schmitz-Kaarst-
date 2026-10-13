import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { defaultShareImage, geoMeta, homeDescription, homeTitle, titleTemplate } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

/** Website-weite Standards; Seiten überschreiben Titel, Beschreibung und Canonical per pageMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: titleTemplate },
  description: homeDescription,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.legalName,
  icons: { icon: '/assets/favicon.svg', apple: '/assets/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: site.name,
    title: homeTitle,
    description: homeDescription,
    images: [defaultShareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: [defaultShareImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Kein automatisches Verlinken von Ziffernfolgen (USt-ID, PLZ, Daten) auf iOS –
  // die echte Telefonnummer ist überall ausdrücklich als tel:-Link gesetzt.
  formatDetection: { telephone: false, email: false, address: false },
  other: geoMeta(),
};

export const viewport: Viewport = {
  themeColor: '#535c26',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        {/* Ohne JavaScript läuft der Einblend-Effekt nie – der Inhalt muss trotzdem sichtbar sein. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-paper font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
