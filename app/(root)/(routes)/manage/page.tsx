import getAllLocations from '@/actions/getAllLocations';
import getAllDepartments from '@/actions/getAllDepartments';

import PageContainer from '@/components/page-container/page-container';
import Card from '@/components/card/card';
import Table from '@/components/table/table';
import LocationRows from './components/location-rows';
import DepartmentRows from './components/department-rows';

const ManagePage = async () => {
  const allCompanyLocations = await getAllLocations();
  const allCompanyDepartments = await getAllDepartments();

  return (
    <PageContainer heading="Manage">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {allCompanyLocations && (
          <Card title="Locations" databaseName="locations">
            <Table
              title="Locations"
              data={allCompanyLocations}
              headers={['Location']}
              rows={
                <LocationRows
                  data={allCompanyLocations}
                  databaseName="locations"
                  title="Locations"
                />
              }
            />
          </Card>
        )}
        {allCompanyDepartments && (
          <Card title="Departments" databaseName="departments">
            <Table
              title="Departments"
              data={allCompanyDepartments}
              headers={['Department']}
              rows={
                <DepartmentRows
                  data={allCompanyDepartments}
                  databaseName="departments"
                  title="Departments"
                />
              }
            />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default ManagePage;
