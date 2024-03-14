'use client';

import useLocations from '@/hooks/useLocations';
import useDepartments from '@/hooks/useDepartments';

import PageContainer from '@/components/page-container/page-container';
import Card from '@/components/card/card';
import Table from '@/components/table/table';
import ContentWrapper from '@/components/content-wrapper/content-wrapper';
import LocationRows from './components/location-rows';
import DepartmentRows from './components/department-rows';

const ManagePage = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { departments, isDepartmentsLoading } = useDepartments();

  return (
    <PageContainer>
      <ContentWrapper>
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          {locations && locations.length > 0 && (
            <Card title="Locations" action="setLocation">
              <Table
                title="Locations"
                data={locations}
                headers={['Location']}
                rows={<LocationRows data={locations} />}
              />
            </Card>
          )}

          {departments && departments.length > 0 && (
            <Card title="Departments" action="setDepartment">
              <Table
                title="Departments"
                data={departments}
                headers={['Department']}
                rows={<DepartmentRows data={departments} />}
              />
            </Card>
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ManagePage;
