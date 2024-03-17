'use client';

import useSettlements from '@/hooks/useSettlements';
import useEmployees from '@/hooks/useEmployees';

import Card from '@/components/card/card';
import DataTable from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './components/settlement-cols';

const SettlementsPage = () => {
  const { settlements, isSettlementsLoading } = useSettlements();
  const { employees, isEmployeesLoading } = useEmployees();

  if (isSettlementsLoading || isEmployeesLoading) {
    return <Skeleton className="mt-10 h-[400px] w-full rounded-lg" />;
  }

  return (
    <>
      {settlements && employees && (
        <Card title="Settlements" action="setSettlement" className="mt-10">
          <DataTable
            title="Settlements"
            columns={columns}
            data={settlements}
            employees={employees}
            settlements={settlements}
          />
        </Card>
      )}
    </>
  );
};

export default SettlementsPage;
