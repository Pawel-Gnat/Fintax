import { redirect } from 'next/navigation';

import getCurrentEmployee from '@/actions/getCurrentEmployee';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

import PasswordForm from './components/password-form';
import ProfileForm from './components/profile-form';

interface EmployeeSettingsPageProps {
  employeeId: string;
}

const EmployeeSettingsPage = async ({
  params,
}: {
  params: EmployeeSettingsPageProps;
}) => {
  const currentEmployee = await getCurrentEmployee(params.employeeId);

  if (!currentEmployee) {
    redirect('/employees');
  }

  return (
    <PageContainer>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentEmployee && (
          <div className="flex flex-col gap-5">
            <Card title="Employee password">
              <PasswordForm data={currentEmployee} />
            </Card>
          </div>
        )}
        {currentEmployee && (
          <Card title="Employee informations">
            <ProfileForm data={currentEmployee} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default EmployeeSettingsPage;
