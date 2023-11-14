import PageContainer from '@/components/page-container/page-container';
import ManageCard from './components/manage-card';
import getCurrentCompany from '@/actions/getCurrentCompany';

const ManagePage = async () => {
  const currentCompanyData = await getCurrentCompany();

  return (
    <PageContainer heading="Manage">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentCompanyData && (
          <>
            <ManageCard
              title="Locations"
              data={currentCompanyData.locations}
              apiRoute="locations"
            />
            <ManageCard
              title="Departments"
              data={currentCompanyData.departments}
              apiRoute="departments"
            />
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default ManagePage;
