'use client';

import useLocations from '@/hooks/useLocations';
import useEmployees from '@/hooks/useEmployees';

import { Skeleton } from '@/components/ui/skeleton';
import Card from '@/components/card/card';

import PieChart from './pie-chart';

const EmployeeDistribution = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <>
      {isLocationsLoading || isEmployeesLoading ? (
        <Skeleton className="h-[400px] w-full rounded-lg" />
      ) : (
        <Card title="Employee distribution" className="h-full 2xl:w-1/4">
          <div className="hidden md:block">
            <PieChart locations={locations ?? []} employees={employees ?? []} />
          </div>
          <p className="my-5 block text-center md:hidden">
            The chart is not available for the current screen width.
          </p>
        </Card>
      )}
    </>
  );
};

export default EmployeeDistribution;
