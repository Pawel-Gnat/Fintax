import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import PageContainer from '@/components/page-container/page-container';

import { PasswordCard } from './components/password-card';
import { ProfileCard } from './components/profile-card';

interface EmployeeSettingsPageProps {
  employeeId: string;
}

const EmployeeSettingsPage = async ({
  params,
}: {
  params: EmployeeSettingsPageProps;
}) => {
  const user = await getCurrentUser();

  if (user && user.role !== 'admin') {
    redirect('/auth');
  }

  return (
    <PageContainer>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PasswordCard id={params.employeeId} />
        <ProfileCard id={params.employeeId} />
      </div>
    </PageContainer>
  );
};

export default EmployeeSettingsPage;
