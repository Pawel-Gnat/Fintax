'use client';

import useDepartments from '@/hooks/useDepartments';

import Card from '@/components/card/card';
import Table from '@/components/table/table';
import { Skeleton } from '@/components/ui/skeleton';

import DepartmentRows from './department-rows';

import { User } from '@prisma/client';

interface DepartmentsProps {
  user: User;
}

const Departments: React.FC<DepartmentsProps> = ({ user }) => {
  const { departments, isDepartmentsLoading } = useDepartments();
  const cardAction = user.role === 'admin' ? 'setDepartment' : undefined;

  if (isDepartmentsLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {departments && (
        <Card title="Departments" action={cardAction} className="w-full">
          <Table
            title="Departments"
            data={departments}
            headers={['Department']}
            rows={<DepartmentRows data={departments} user={user} />}
          />
        </Card>
      )}
    </>
  );
};

export default Departments;
