'use client';

import { LuGlobe2, LuLandmark, LuMapPin, LuUsers2 } from 'react-icons/lu';

import useLocations from '@/hooks/useLocations';
import useSettlements from '@/hooks/useSettlements';
import useDepartments from '@/hooks/useDepartments';
import useEmployees from '@/hooks/useEmployees';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { Skeleton } from '@/components/ui/skeleton';
import Alert from '@/components/alert/alert';
import NoticeContainer from './notice-container';

import { Department, Location } from '@prisma/client';
import { SafeEmployee, SafeSettlement } from '@/types/types';

interface AlertInfo {
  title: string;
  description: string;
  icon: JSX.Element;
  shouldDisplay: boolean;
}

interface AlertData {
  items: Location[] | Department[] | SafeSettlement[] | SafeEmployee[];
  isLoading: boolean;
  variant: 'employee' | 'location' | 'settlement' | 'department';
}

const Alerts = () => {
  const { locations, isLocationsLoading } = useLocations();
  const { settlements, isSettlementsLoading } = useSettlements();
  const { departments, isDepartmentsLoading } = useDepartments();
  const { employees, isEmployeesLoading } = useEmployees();

  const alertsData: AlertData[] = [
    {
      items: locations ?? [],
      isLoading: isLocationsLoading,
      variant: 'location',
    },
    {
      items: settlements ?? [],
      isLoading: isSettlementsLoading,
      variant: 'settlement',
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
    item: Location | Department | SafeSettlement | SafeEmployee,
    variant: 'employee' | 'location' | 'settlement' | 'department',
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
            employee.settlements.length === 0,
        };
        break;

      case 'settlement':
        const settlement = item as SafeSettlement;
        alertInfo = {
          title: settlement.name,
          description: `Settlement doesn't have an assigned employee.`,
          icon: <LuGlobe2 className="h-4 w-4" />,
          shouldDisplay: !settlement.employeeId,
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
    return alerts.flatMap((alert, index) => {
      if (alert.isLoading) {
        return <Skeleton key={index} className="h-[75px] w-full rounded-lg bg-card" />;
      }

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

  // const renderAlerts = (alerts: AlertData[]) => {
  //   const renderedAlerts = alerts.flatMap((alert) => {
  //     if (alert.isLoading) {
  //       return null;
  //     }

  //     if (!Array.isArray(alert.items)) {
  //       return null;
  //     }

  //     return alert.items.map((item, index) => {
  //       const { title, description, icon, shouldDisplay } = getAlertInfo(
  //         item,
  //         alert.variant,
  //       );
  //       return shouldDisplay ? (
  //         <Alert
  //           key={`${alert.variant}-${index}`}
  //           icon={icon}
  //           title={title}
  //           description={description}
  //         />
  //       ) : null;
  //     });
  //   });

  //   if (!isLoading && renderedAlerts.length === 0) {
  //     return <p className="my-5 text-center">There are no alerts. Everything is fine.</p>;
  //   }

  //   return renderedAlerts;
  // };

  return (
    <NoticeContainer title="Alerts" className="my-10">
      <div className="mt-4 flex flex-col gap-4">
        {/* {alerts.flat().length > 0 ? (
          alerts.map((alert) => alert)
        ) : (
          <p className="my-5 text-center">
            There are no alerts. Everything is fine.
          </p>
        )} */}

        {renderAlerts(alertsData)}

        {/* {isLoading ? (
          <Skeleton className="h-[75px] w-full rounded-lg bg-card" />
        ) : (
          renderAlerts(alertsData)
        )} */}
      </div>
    </NoticeContainer>
  );
};

export default Alerts;
