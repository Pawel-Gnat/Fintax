'use client';

import { LuGlobe2, LuLandmark, LuMapPin, LuUsers2 } from 'react-icons/lu';

import useLocations from '@/hooks/useLocations';
import useClients from '@/hooks/useClients';
import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { Skeleton } from '@/components/ui/skeleton';
import Alert from '@/components/alert/alert';
import Card from '@/components/card/card';

import { Department, Location } from '@prisma/client';
import { SafeClient, SafeEmployee } from '@/types/types';

interface AlertInfo {
  title: string;
  description: string;
  icon: JSX.Element;
  shouldDisplay: boolean;
}

interface AlertData {
  items: Location[] | Department[] | SafeClient[] | SafeEmployee[];
  isLoading: boolean;
  variant: 'employee' | 'location' | 'client' | 'department';
}

const Alerts = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { clients, isClientsLoading } = useClients();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  const alertsData: AlertData[] = [
    {
      items: locations ?? [],
      isLoading: isLocationsLoading,
      variant: 'location',
    },
    {
      items: clients ?? [],
      isLoading: isClientsLoading,
      variant: 'client',
    },
    {
      items: departments ?? [],
      isLoading: isDepartmentsLoading,
      variant: 'department',
    },
    {
      items: employees ?? [],
      isLoading: isEmployeesLoading,
      variant: 'employee',
    },
  ];

  const isLoading = alertsData.some((alert) => alert.isLoading);

  const getAlertInfo = (
    item: Location | Department | SafeClient | SafeEmployee,
    variant: 'employee' | 'location' | 'client' | 'department',
  ): AlertInfo => {
    let alertInfo = {
      title: '',
      description: '',
      icon: <></>,
      shouldDisplay: false,
    };

    switch (variant) {
      case 'employee':
        const employee = item as SafeEmployee;
        alertInfo = {
          title: `${employee.name} ${employee.surname}`,
          description: `Employee doesn't have an assigned ${
            employee.departmentId ? 'location' : 'department'
          }.`,
          icon: <LuUsers2 className="h-4 w-4" />,
          shouldDisplay:
            !employee.departmentId ||
            !employee.locationId ||
            employee.clients.length === 0,
        };
        break;

      case 'client':
        const client = item as SafeClient;
        alertInfo = {
          title: client.name,
          description: `Client doesn't have an assigned employee.`,
          icon: <LuGlobe2 className="h-4 w-4" />,
          shouldDisplay: !client.employeeId,
        };
        break;

      case 'location':
      case 'department':
        const itemType = variant;
        alertInfo = {
          title: item.name,
          description: `${capitalizeFirstLetter(itemType)} doesn't have any employees.`,
          icon:
            variant === 'location' ? (
              <LuMapPin className="h-4 w-4" />
            ) : (
              <LuLandmark className="h-4 w-4" />
            ),
          shouldDisplay: !employees?.some(
            (employee) => employee[`${itemType}Id`] === item.id,
          ),
        };
        break;
    }
    return alertInfo;
  };

  const renderAlerts = (alerts: AlertData[]) => {
    return alerts.flatMap((alert) => {
      if (!Array.isArray(alert.items)) {
        return null;
      }

      return alert.items.map((item, index) => {
        const { title, description, icon, shouldDisplay } = getAlertInfo(
          item,
          alert.variant,
        );

        return shouldDisplay ? (
          <Alert
            key={`${alert.variant}-${index}`}
            icon={icon}
            title={title}
            description={description}
          />
        ) : null;
      });
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[400px] w-full rounded-lg" />
      ) : (
        <Card title="Alerts" className="my-10">
          <div className="flex flex-col gap-4">{renderAlerts(alertsData)}</div>
        </Card>
      )}
    </>
  );
};

export default Alerts;
