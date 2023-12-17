import getAllLocations from '@/actions/getAllLocations';
import getAllDepartments from '@/actions/getAllDepartments';

import PageContainer from '@/components/page-container/page-container';
import Card from '@/components/card/card';
import Table from '@/components/table/table';
import ContentWrapper from '@/components/content-wrapper/content-wrapper';
import LocationRows from './components/location-rows';
import DepartmentRows from './components/department-rows';

const ManagePage = async () => {
  const allCompanyLocations = await getAllLocations();
  const allCompanyDepartments = await getAllDepartments();

  return (
    <PageContainer>
      <ContentWrapper>
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          {allCompanyLocations && (
            <Card title="Locations" action="setLocation">
              <Table
                title="Locations"
                data={allCompanyLocations}
                headers={['Location']}
                rows={<LocationRows data={allCompanyLocations} />}
              />
            </Card>
          )}
          {allCompanyDepartments && (
            <Card title="Departments" action="setDepartment">
              <Table
                title="Departments"
                data={allCompanyDepartments}
                headers={['Department']}
                rows={<DepartmentRows data={allCompanyDepartments} />}
              />
            </Card>
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ManagePage;
