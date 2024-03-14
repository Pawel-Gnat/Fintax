'use client';

import useEmployees from '@/hooks/useEmployees';
import useLocations from '@/hooks/useLocations';
import useDepartments from '@/hooks/useDepartments';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import DataTable from '@/components/data-table/data-table';
import { columns } from './components/employee-cols';

const EmployeesPage = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <PageContainer>
      {locations && departments && employees && (
        <Card title="Employees" action="setEmployee">
          <DataTable
            title="Employees"
            columns={columns}
            data={employees}
            employees={employees}
            locations={locations}
            departments={departments}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
