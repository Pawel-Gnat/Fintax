import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';
import Navbar from '@/components/navbar/navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <>
      <header className="bg-primary">
        <Navbar />
      </header>
      <main className="container text-primary">{children}</main>
    </>
  );
}
