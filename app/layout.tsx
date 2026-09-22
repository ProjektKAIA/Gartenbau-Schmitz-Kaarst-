import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: `${site.name} | ${site.owner}`,
  description: site.description,
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: `${site.name} | ${site.owner}`,
    description: site.description,
    locale: 'de_DE',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#535c26',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-paper font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
