'use client';

import useEmployees from '@/hooks/useEmployees';
import useLocations from '@/hooks/useLocations';
import useDepartments from '@/hooks/useDepartments';

import Card from '@/components/card/card';
import DataTable from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './components/employee-cols';

const EmployeesPage = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  if (isLocationsLoading || isDepartmentsLoading || isEmployeesLoading) {
    return <Skeleton className="mt-10 h-[400px] w-full rounded-lg" />;
  }

  return (
    <>
      {locations && departments && employees && (
        <Card title="Employees" action="setEmployee" className="mt-10">
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
    </>
  );
};

export default EmployeesPage;
