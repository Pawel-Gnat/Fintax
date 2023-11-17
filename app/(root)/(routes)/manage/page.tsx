import PageContainer from '@/components/page-container/page-container';
import ManageCard from './components/manage-card';
import getAllLocations from '@/actions/getAllLocations';
import getAllDepartments from '@/actions/getAllDepartments';

const ManagePage = async () => {
  const allCompanyLocations = await getAllLocations();
  const allCompanyDepartments = await getAllDepartments();

  return (
    <PageContainer heading="Manage">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {allCompanyLocations && (
          <ManageCard
            title="Locations"
            data={allCompanyLocations}
            databaseName="locations"
          />
        )}
        {allCompanyDepartments && (
          <ManageCard
            title="Departments"
            data={allCompanyDepartments}
            databaseName="departments"
          />
        )}
      </div>
    </PageContainer>
  );
};

export default ManagePage;
