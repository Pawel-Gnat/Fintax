'use client';

import { LuUsers2, LuLandmark, LuMapPin, LuGlobe2 } from 'react-icons/lu';

import useLocations from '@/hooks/useLocations';
import useClients from '@/hooks/useClients';
import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';

import StatisticCard from './statistic-card';

const Statistics = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { clients, isClientsLoading } = useClients();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fill,240px)] gap-4">
      <StatisticCard
        title="Locations"
        number={locations?.length}
        icon={LuGlobe2}
        loading={isLocationsLoading}
      />
      <StatisticCard
        title="Departments"
        number={departments?.length}
        icon={LuLandmark}
        loading={isDepartmentsLoading}
      />
      <StatisticCard
        title="Employees"
        number={employees?.length}
        icon={LuUsers2}
        loading={isEmployeesLoading}
      />
      <StatisticCard
        title="Clients"
        number={clients?.length}
        icon={LuMapPin}
        loading={isClientsLoading}
      />
    </div>
  );
};

export default Statistics;
