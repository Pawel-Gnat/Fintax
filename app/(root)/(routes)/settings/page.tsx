import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentUser from '@/actions/getCurrentUser';
import Card from '@/components/card/card';

import PageContainer from '@/components/page-container/page-container';
import CompanyForm from './components/company-form';
import PasswordForm from './components/password-form';
import ProfileForm from './components/profile-form';

const SettingsPage = async () => {
  const currentCompany = await getCurrentCompany();
  const currentUser = await getCurrentUser();

  return (
    <PageContainer heading="Settings">
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentCompany && currentUser && (
          <div className="flex flex-col gap-5">
            <Card title="Company informations">
              <CompanyForm data={currentCompany} />
            </Card>

            <Card title="User password">
              <PasswordForm data={currentUser} />
            </Card>
          </div>
        )}
        {currentUser && (
          <Card title="Profile informations">
            <ProfileForm data={currentUser} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
