'use client';

import useLocations from '@/hooks/useLocations';
import useSettlements from '@/hooks/useSettlements';
import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import Alert from '@/components/alert/alert';
import { Skeleton } from '@/components/ui/skeleton';
import NoticeContainer from './notice-container';

import { Department, Location } from '@prisma/client';
import { SafeEmployee, SafeSettlement } from '@/types/types';
import ActivitiesItem from './activities-item';

const Activities = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { settlements, isSettlementsLoading } = useSettlements();
  const { departments, isDepartmentsLoading } = useDepartments();

  const alertsData = [
    {
      items: locations,
      isLoading: isLocationsLoading,
      variant: 'location',
    },
    {
      items: settlements,
      isLoading: isSettlementsLoading,
      variant: 'settlement',
    },
    {
      items: departments,
      isLoading: isDepartmentsLoading,
      variant: 'department',
    },
  ];

  return (
    <NoticeContainer title="Required activities" className="my-10">
      <div className="mt-4 flex flex-col gap-4">
        {/* {alerts.flat().length > 0 ? (
          alerts.map((alert) => alert)
        ) : (
          <p className="my-5 text-center">
            You don&apos;t have any required activities currently.
          </p>
        )} */}

        {alertsData.map((data, index) => (
          <ActivitiesItem
            key={index}
            items={data.items || []}
            isLoading={data.isLoading}
            variant={data.variant}
          />
        ))}
      </div>
    </NoticeContainer>
  );
};

export default Activities;
