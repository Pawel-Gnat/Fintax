'use client';

import { LuUsers2, LuLandmark, LuMapPin, LuGlobe2 } from 'react-icons/lu';

import useLocations from '@/hooks/useLocations';
import useSettlements from '@/hooks/useSettlements';
import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';
import useCompany from '@/hooks/useCompany';

import ContentWrapper from '@/components/content-wrapper/content-wrapper';
import StatisticCard from './statistic-card';

const Statistics = () => {
  const { company } = useCompany();
  const { locations, isLocationsLoading } = useLocations();
  const { settlements, isSettlementsLoading } = useSettlements();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <ContentWrapper>
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl font-bold">{company?.name}</h1>
        <p className="text-xl">General statistics</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-10">
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
          title="Settlements"
          number={settlements?.length}
          icon={LuMapPin}
          loading={isSettlementsLoading}
        />
      </div>
    </ContentWrapper>
  );
};

export default Statistics;
