'use client';

import useEmployees from '@/hooks/useEmployees';
import useSettlements from '@/hooks/useSettlements';

import { Skeleton } from '@/components/ui/skeleton';
import Card from '@/components/card/card';

import BarChart from './bar-chart';

const Workload = () => {
  const { settlements, isSettlementsLoading } = useSettlements();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <>
      {isSettlementsLoading || isEmployeesLoading ? (
        <Skeleton className="h-[400px] w-full rounded-lg" />
      ) : (
        <Card title="Workload" className="xl:w-3/4">
          <div className="hidden md:block">
            <BarChart employees={employees ?? []} settlements={settlements ?? []} />
          </div>
          <p className="my-5 block text-center md:hidden">
            The chart is not available for the current screen width.
          </p>
        </Card>
      )}
    </>
  );
};

export default Workload;
