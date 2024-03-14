'use client';

import { useRouter } from 'next/navigation';

import useEmployee from '@/hooks/useEmployee';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import PasswordForm from './components/password-form';
import ProfileForm from './components/profile-form';

interface EmployeeSettingsPageProps {
  employeeId: string;
}

const EmployeeSettingsPage = ({ params }: { params: EmployeeSettingsPageProps }) => {
  const { employee, isEmployeeLoading } = useEmployee(params.employeeId);
  const router = useRouter();

  if (!isEmployeeLoading && !employee) {
    router.push('/employees');
  }

  return (
    <PageContainer>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {employee && (
          <div className="flex flex-col gap-5">
            <Card title="Employee password">
              <PasswordForm data={employee} />
            </Card>
          </div>
        )}
        {employee && (
          <Card title="Employee informations">
            <ProfileForm data={employee} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default EmployeeSettingsPage;
