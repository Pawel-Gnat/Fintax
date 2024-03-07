import { redirect } from 'next/navigation';

import { ModalSheetProvider } from '@/context/modal-sheet-context';
import { AlertDialogProvider } from '@/context/alert-dialog-context';

import getCurrentUser from '@/actions/getCurrentUser';

import Navbar from '@/components/navbar/navbar';
import ModalSheet from '@/components/modal-sheet/modal-sheet';
import AlertDialog from '@/components/alert-dialog/alert-dialog';
import QueryProvider from '@/context/query-context';

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
    <QueryProvider>
      <AlertDialogProvider>
        <ModalSheetProvider>
          <header>
            <Navbar user={user} />
          </header>
          <main className="container text-primary">
            {children}
            <ModalSheet />
            <AlertDialog />
          </main>
        </ModalSheetProvider>
      </AlertDialogProvider>
    </QueryProvider>
  );
}
