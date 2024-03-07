'use client';

import { useQuery } from '@tanstack/react-query';

import getAllLocations from '@/actions/getAllLocations';
import getAllSettlements from '@/actions/getAllSettlements';
import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import Alert from '@/components/alert/alert';

import { SafeEmployee, SafeSettlement } from '@/types/types';
import { Department, Location } from '@prisma/client';

interface AlertInfo {
  title: string;
  description: string;
  shouldDisplay: boolean;
}

const renderAlerts = (
  items: Location[] | Department[] | SafeEmployee[] | SafeSettlement[],
  variant: 'employee' | 'location' | 'settlement' | 'department',
  getAlertInfo: (
    item: SafeEmployee | SafeSettlement | Department | Location,
  ) => AlertInfo,
) => {
  return items.map((item, index) => {
    const { title, description, shouldDisplay } = getAlertInfo(item);
    return (
      shouldDisplay && (
        <Alert
          key={`${variant}-${index}`}
          title={title}
          description={description}
          variant={variant}
        />
      )
    );
  });
};

const ActivitiesBoard = () => {
  const {
    data: locations,
    isLoading: isLocationsLoading,
    error: locationsError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });
  // const {
  //   data: settlements,
  //   isLoading: isSettlementsLoading,
  //   error: settlementsError,
  // } = useQuery({
  //   queryKey: ['settlements'],
  //   queryFn: getAllSettlements,
  // });
  // const {
  //   data: departments,
  //   isLoading: isDepartmentsLoading,
  //   error: departmentsError,
  // } = useQuery({
  //   queryKey: ['departments'],
  //   queryFn: getAllDepartments,
  // });
  // const {
  //   data: employees,
  //   isLoading: isEmployeesLoading,
  //   error: employeesError,
  // } = useQuery({
  //   queryKey: ['employees'],
  //   queryFn: getAllEmployees,
  // });

  // const employeeAlertInfo = (employee: SafeEmployee): AlertInfo => ({
  //   title: `${employee.name} ${employee.surname}`,
  //   description: `Employee doesn't have an assigned ${
  //     employee.departmentId ? 'location' : 'department'
  //   }.`,
  //   shouldDisplay:
  //     !employee.departmentId || !employee.locationId || employee.settlements.length === 0,
  // });

  // const settlementAlertInfo = (settlement: SafeSettlement): AlertInfo => ({
  //   title: settlement.name,
  //   description: `Settlement doesn't have an assigned employee.`,
  //   shouldDisplay: !settlement.employeeId,
  // });

  // const locationOrDepartmentAlertInfo = (
  //   item: Department | Location,
  //   itemType: 'location' | 'department',
  // ): AlertInfo => ({
  //   title: item.name,
  //   description: `${capitalizeFirstLetter(itemType)} doesn't have any employees.`,
  //   shouldDisplay: !employees!.some((employee) => employee[`${itemType}Id`] === item.id),
  // });

  // const alerts = [
  //   ...renderAlerts(locations!, 'location', (item) =>
  //     locationOrDepartmentAlertInfo(item, 'location'),
  //   ),
  //   ...renderAlerts(departments!, 'department', (item) =>
  //     locationOrDepartmentAlertInfo(item, 'department'),
  //   ),
  //   ...renderAlerts(employees!, 'employee', (item) =>
  //     employeeAlertInfo(item as SafeEmployee),
  //   ),
  //   ...renderAlerts(settlements!, 'settlement', (item) =>
  //     settlementAlertInfo(item as SafeSettlement),
  //   ),
  // ];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* {alerts.flat().length > 0 ? (
        alerts.map((alert) => alert)
      ) : ( */}
      <p className="my-5 text-center">
        You don&apos;t have any required activities currently.
      </p>
      {/* )} */}
    </div>
  );
};

export default ActivitiesBoard;
