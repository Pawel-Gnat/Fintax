import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentUser from '@/actions/getCurrentUser';

import PageContainer from '@/components/page-container/page-container';
import SettingsCard from '@/components/settings-card/settings-card';

const SettingsPage = async () => {
  const currentCompany = await getCurrentCompany();
  const currentUser = await getCurrentUser();

  return (
    <PageContainer heading="Settings">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentCompany && (
          <SettingsCard
            title="Company informations"
            data={currentCompany}
            databaseName="company"
          />
        )}
        {currentUser && (
          <SettingsCard
            title="Profile informations"
            data={currentUser}
            databaseName="user"
          />
        )}
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
