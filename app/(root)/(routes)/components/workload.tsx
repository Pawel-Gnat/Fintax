'use client';

import useEmployees from '@/hooks/useEmployees';
import useClients from '@/hooks/useClients';

import { Skeleton } from '@/components/ui/skeleton';
import Card from '@/components/card/card';

import BarChart from './bar-chart';

const Workload = () => {
  const { clients, isClientsLoading } = useClients();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <>
      {isClientsLoading || isEmployeesLoading ? (
        <Skeleton className="h-[400px] w-full rounded-lg" />
      ) : (
        <Card title="Workload" className="2xl:w-3/4">
          <div className="hidden md:block">
            <BarChart employees={employees ?? []} clients={clients ?? []} />
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
