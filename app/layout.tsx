import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';

const font = Lato({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintax',
  description: 'Manage your employee settlements',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-background ${font.className}`}>
        <header className="bg-primary">
          <Navbar />
        </header>
        <main className="container text-primary">{children}</main>
      </body>
    </html>
  );
}
