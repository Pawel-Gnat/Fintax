'use client';

import useLocations from '@/hooks/useLocations';
import useSettlements from '@/hooks/useSettlements';
import useEmployees from '@/hooks/useEmployees';

import { Skeleton } from '@/components/ui/skeleton';
import NoticeContainer from './notice-container';
import BarChart from './bar-chart';
import PieChart from './pie-chart';

const Charts = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { settlements, isSettlementsLoading } = useSettlements();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <>
      {isLocationsLoading || isSettlementsLoading || isEmployeesLoading ? (
        <Skeleton className="my-10 h-[400px] w-full rounded-lg bg-secondary" />
      ) : (
        <NoticeContainer title="Charts" className="my-10">
          <div className="hidden md:block">
            <PieChart locations={locations ?? []} employees={employees ?? []} />
            <BarChart employees={employees ?? []} settlements={settlements ?? []} />
          </div>
          <p className="my-5 block text-center md:hidden">
            The charts are not available for the current screen width.
          </p>
        </NoticeContainer>
      )}
    </>
  );
};

export default Charts;
