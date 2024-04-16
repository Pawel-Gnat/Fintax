'use client';

import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';
import useLocations from '@/hooks/useLocations';

import DataTable from '@/components/data-table/data-table';
import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './employee-cols';

import { User } from '@prisma/client';

interface EmployeeTableProps {
  user: User;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ user }) => {
  const { locations, isLocationsLoading } = useLocations();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();
  const cardAction = user.role === 'admin' ? 'setEmployee' : undefined;

  if (isLocationsLoading || isDepartmentsLoading || isEmployeesLoading) {
    return <Skeleton className="mt-10 h-[400px] w-full rounded-lg" />;
  }

  return (
    <>
      {locations && departments && employees && (
        <Card title="Employees" action={cardAction} className="mt-10">
          <DataTable
            title="Employees"
            columns={columns}
            data={employees}
            employees={employees}
            locations={locations}
            departments={departments}
            user={user}
          />
        </Card>
      )}
    </>
  );
};
