import type { Metadata } from 'next';
import { Noto_Sans_Georgian } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const font = Noto_Sans_Georgian({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintax',
  description: 'Manage your employee settlements',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-row ${font.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
