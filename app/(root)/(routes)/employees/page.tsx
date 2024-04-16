import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import { EmployeeTable } from './components/employee-table';

const EmployeesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return <EmployeeTable user={user} />;
};

export default EmployeesPage;
