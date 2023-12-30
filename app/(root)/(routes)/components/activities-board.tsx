import Alert from '@/components/alert/alert';

import { SafeEmployee, SafeSettlement } from '@/types/types';
import { Department, Location } from '@prisma/client';

interface ActivitiesBoardProps {
  employees: SafeEmployee[];
  settlements: SafeSettlement[];
  locations: Location[];
  departments: Department[];
}

const ActivitiesBoard: React.FC<ActivitiesBoardProps> = ({
  employees,
  settlements,
  departments,
  locations,
}) => {
  const renderEmployeeDepartmentAlert = () => {
    return employees.map((employee, index) => {
      if (!employee.departmentId) {
        return (
          <Alert
            key={`employee-${index}`}
            title={`${employee.name} ${employee.surname}`}
            description={`Employee doesn't have an assigned department.`}
            variant="employee"
          />
        );
      }
    });
  };

  const renderEmployeeLocationAlert = () => {
    return employees.map((employee, index) => {
      if (!employee.locationId) {
        return (
          <Alert
            key={`employee-${index}`}
            title={`${employee.name} ${employee.surname}`}
            description={`Employee doesn't have an assigned location.`}
            variant="employee"
          />
        );
      }
    });
  };

  const renderEmployeeSettlementAlert = () => {
    return employees.map((employee, index) => {
      if (employee.settlements.length === 0) {
        return (
          <Alert
            key={`employee-${index}`}
            title={`${employee.name} ${employee.surname}`}
            description={`Employee doesn't have an assigned settlement.`}
            variant="employee"
          />
        );
      }
    });
  };

  const renderSettlementEmployeeAlert = () => {
    return settlements.map((settlement, index) => {
      if (!settlement.employeeId) {
        return (
          <Alert
            key={`settlement-${index}`}
            title={settlement.name}
            description={`Settlement doesn't have an assigned employee.`}
            variant="settlement"
          />
        );
      }
    });
  };

  const renderLocationAlert = () => {
    return locations.map((location, index) => {
      if (!employees.some((employee) => employee.locationId === location.id)) {
        return (
          <Alert
            key={`location-${index}`}
            title={location.name}
            description={`Location doesn't have any employees.`}
            variant="location"
          />
        );
      }
    });
  };

  const renderDepartmentAlert = () => {
    return departments.map((department, index) => {
      if (!employees.some((employee) => employee.departmentId === department.id)) {
        return (
          <Alert
            key={`department-${index}`}
            title={department.name}
            description={`Department doesn't have any employees.`}
            variant="department"
          />
        );
      }
    });
  };

  const alerts = [
    renderLocationAlert(),
    renderDepartmentAlert(),
    renderEmployeeDepartmentAlert(),
    renderEmployeeLocationAlert(),
    renderEmployeeSettlementAlert(),
    renderSettlementEmployeeAlert(),
  ];

  return (
    <div className="my-4 flex flex-col gap-4">
      {alerts.flat().length > 0 ? (
        alerts.map((alert) => alert)
      ) : (
        <p className="my-5 text-center">
          You don&apos;t have any required activities currently.
        </p>
      )}
    </div>
  );
};

export default ActivitiesBoard;
