import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import PageContainer from '@/components/page-container/page-container';

import { CompanyCard } from './components/company-card';
import { PasswordCard } from './components/password-card';
import { ProfileCard } from './components/profile-card';

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <PageContainer>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <CompanyCard />
          <PasswordCard user={user} />
        </div>

        <ProfileCard user={user} />
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
