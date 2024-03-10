import Alert from '@/components/alert/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { SafeEmployee, SafeSettlement } from '@/types/types';
import { Department } from '@prisma/client';

interface ActivityItemProps {
  items: Location[] | Department[] | SafeEmployee[] | SafeSettlement[];
  variant: 'employee' | 'location' | 'settlement' | 'department';
  isLoading: boolean;
}

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

const employeeAlertInfo = (employee: SafeEmployee): AlertInfo => ({
  title: `${employee.name} ${employee.surname}`,
  description: `Employee doesn't have an assigned ${
    employee.departmentId ? 'location' : 'department'
  }.`,
  shouldDisplay:
    !employee.departmentId || !employee.locationId || employee.settlements.length === 0,
});

const settlementAlertInfo = (settlement: SafeSettlement): AlertInfo => ({
  title: settlement.name,
  description: `Settlement doesn't have an assigned employee.`,
  shouldDisplay: !settlement.employeeId,
});

const locationOrDepartmentAlertInfo = (
  item: Department | Location,
  itemType: 'location' | 'department',
): AlertInfo => ({
  title: item.name,
  description: `${capitalizeFirstLetter(itemType)} doesn't have any employees.`,
  shouldDisplay: !employees?.some((employee) => employee[`${itemType}Id`] === item.id),
});

const ActivitiesItem: React.FC<ActivityItemProps> = ({ items, variant, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="my-5 h-[60px] w-full rounded-lg bg-secondary" />;
  }

  return (
    <>
      {items.map((item, index) => {
        const { title, description, shouldDisplay } = getAlertInfo(item);

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
