import { redirect } from 'next/navigation';

import { ModalSheetProvider } from '@/context/modal-sheet-context';

import getCurrentUser from '@/actions/getCurrentUser';

import Navbar from '@/components/navbar/navbar';
import ModalSheet from '@/components/modal-sheet/modal-sheet';

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
    <ModalSheetProvider>
      <header className="bg-primary">
        <Navbar user={user} />
      </header>
      <main className="container text-primary">
        {children}
        <ModalSheet />
      </main>
    </ModalSheetProvider>
  );
}
