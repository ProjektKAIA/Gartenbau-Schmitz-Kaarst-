import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: `${site.name} | ${site.owner}`,
  description: site.description,
  icons: { icon: '/assets/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#17342d',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
