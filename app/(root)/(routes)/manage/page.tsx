import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import Locations from './components/locations';
import Departments from './components/departments';

const ManagePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
      <Locations user={user} />
      <Departments user={user} />
    </div>
  );
};

export default ManagePage;
