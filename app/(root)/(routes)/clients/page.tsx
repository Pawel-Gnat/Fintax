import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import { ClientsTable } from './components/clients-table';

const ClientsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return <ClientsTable user={user} />;
};

export default ClientsPage;
