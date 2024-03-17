'use client';

import useDepartments from '@/hooks/useDepartments';

import Card from '@/components/card/card';
import Table from '@/components/table/table';
import { Skeleton } from '@/components/ui/skeleton';

import DepartmentRows from './department-rows';

const Departments = () => {
  const { departments, isDepartmentsLoading } = useDepartments();

  if (isDepartmentsLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {departments && departments.length > 0 && (
        <Card title="Departments" action="setDepartment" className="w-full">
          <Table
            title="Departments"
            data={departments}
            headers={['Department']}
            rows={<DepartmentRows data={departments} />}
          />
        </Card>
      )}
    </>
  );
};

export default Departments;
