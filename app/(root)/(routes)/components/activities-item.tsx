import Alert from '@/components/alert/alert';
import { Skeleton } from '@/components/ui/skeleton';
import useEmployees from '@/hooks/useEmployees';
import { SafeEmployee, SafeSettlement } from '@/types/types';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { Department } from '@prisma/client';

interface ActivityItemProps {
  items: Location[] | Department[] | SafeSettlement[];
  variant: 'location' | 'settlement' | 'department';
  isLoading: boolean;
}

interface AlertInfo {
  title: string;
  description: string;
  shouldDisplay: boolean;
}

// const renderAlerts = (
//   items: Location[] | Department[] | SafeEmployee[] | SafeSettlement[],
//   variant: 'employee' | 'location' | 'settlement' | 'department',
//   getAlertInfo: (
//     item: SafeEmployee | SafeSettlement | Department | Location,
//   ) => AlertInfo,
// ) => {
//   return items.map((item, index) => {
//     const { title, description, shouldDisplay } = getAlertInfo(item);
//     return (
//       shouldDisplay && (
//         <Alert
//           key={`${variant}-${index}`}
//           title={title}
//           description={description}
//           variant={variant}
//         />
//       )
//     );
//   });
// };

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
//   shouldDisplay: !employees?.some((employee) => employee[`${itemType}Id`] === item.id),
// });

const getAlertInfo = (item, variant, employees) => {
  if (variant === 'employee') {
    return {
      title: `${item.name} ${item.surname}`,
      description: `Employee doesn't have an assigned ${
        item.departmentId ? 'location' : 'department'
      }.`,
      shouldDisplay:
        !item.departmentId || !item.locationId || item.settlements.length === 0,
    };
  }

  if (variant === 'settlement') {
    return {
      title: item.name,
      description: `Settlement doesn't have an assigned employee.`,
      shouldDisplay: !item.employeeId,
    };
  }

  if (variant === 'location' || variant === 'department') {
    return {
      title: item.name,
      description: `${capitalizeFirstLetter(variant)} doesn't have any employees.`,
      shouldDisplay: !employees?.some((employee) => employee[`${variant}Id`] === item.id),
    };
  }
};

const ActivitiesItem: React.FC<ActivityItemProps> = ({ items, variant, isLoading }) => {
  const { employees, isEmployeesLoading } = useEmployees();

  if (isLoading) {
    return <Skeleton className="h-[75px] w-full rounded-lg bg-card" />;
  }

  return (
    <>
      {items.length > 0 &&
        items.map((item, index) => {
          const { title, description, shouldDisplay } = getAlertInfo(
            item,
            variant,
            employees,
          );

          return shouldDisplay ? (
            <Alert
              key={`${variant}-${index}`}
              title={title}
              description={description}
              variant={variant}
            />
          ) : null;
        })}
    </>
  );
};

export default ActivitiesItem;
