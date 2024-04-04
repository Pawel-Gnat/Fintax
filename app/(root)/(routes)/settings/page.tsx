'use client';

import useCompany from '@/hooks/useCompany';
import useUser from '@/hooks/useUser';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import { Skeleton } from '@/components/ui/skeleton';

import CompanyForm from './components/company-form';
import PasswordForm from './components/password-form';
import ProfileForm from './components/profile-form';

const SettingsPage = () => {
  const { company, isCompanyLoading } = useCompany();
  const { user, isUserLoading } = useUser();

  return (
    <PageContainer>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {isUserLoading && isCompanyLoading && (
          <div className="flex flex-col gap-5">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        )}

        {isUserLoading && <Skeleton className="h-[700px] w-full rounded-lg" />}

        {company && user && (
          <div className="flex flex-col gap-5">
            <Card title="Company informations">
              <CompanyForm data={company} />
            </Card>

            <Card title="User password">
              <PasswordForm data={user} />
            </Card>
          </div>
        )}
        {user && (
          <Card title="Profile informations">
            <ProfileForm data={user} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
