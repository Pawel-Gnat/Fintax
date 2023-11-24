import getAllEmployees from '@/actions/getAllEmployees';
import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentUser from '@/actions/getCurrentUser';

import PageContainer from '@/components/page-container/page-container';
import SettingsCard from '@/components/settings-card/settings-card';

const SettingsPage = async () => {
  const currentCompany = await getCurrentCompany();
  const currentUser = await getCurrentUser();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Settings">
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentCompany && currentUser && (
          <div className="flex flex-col gap-5">
            <SettingsCard
              title="Company informations"
              data={currentCompany}
              databaseName="company"
            />
            <SettingsCard
              title="User password"
              data={currentUser}
              databaseName="user"
              password
            />
          </div>
        )}
        {currentUser && (
          <SettingsCard
            title="Profile informations"
            data={currentUser}
            databaseName="user"
          />
        )}
      </div>
      {allCompanyEmployees && (
        <SettingsCard
          title="Employee settings"
          data={allCompanyEmployees}
          databaseName="employees"
          password
        />
      )}
    </PageContainer>
  );
};

export default SettingsPage;
