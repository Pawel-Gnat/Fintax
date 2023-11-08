import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import './globals.css';

const font = Lato({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintax',
  description: 'Manage your employee settlements',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-background ${font.className}`}>{children}</body>
    </html>
  );
}
