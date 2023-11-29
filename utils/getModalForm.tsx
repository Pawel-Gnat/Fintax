import EmployeeForm from '@/app/(root)/(routes)/employees/components/employee-form';
import LocationForm from '@/app/(root)/(routes)/manage/components/location-form';
import DepartmentForm from '@/app/(root)/(routes)/manage/components/department-form';
import SettlementForm from '@/app/(root)/(routes)/settlements/components/settlement-form';
import AssignEmployeeForm from '@/app/(root)/(routes)/employees/components/assign-employee-form';
import EditEmployeeForm from '@/app/(root)/(routes)/employees/components/edit-employee-form';
import PasswordEmployeeForm from '@/app/(root)/(routes)/employees/components/password-employee-form';

const getModalForm = (action: string) => {
  if (action === 'setLocation') {
    return <LocationForm />;
  }

  if (action === 'setDepartment') {
    return <DepartmentForm />;
  }

  if (action === 'setEmployee') {
    return <EmployeeForm />;
  }

  if (action === 'assignEmployee') {
    return <AssignEmployeeForm />;
  }

  if (action === 'editEmployee') {
    return <EditEmployeeForm />;
  }

  if (action === 'changeEmployeePassword') {
    return <PasswordEmployeeForm />;
  }

  if (action === 'setSettlement') {
    return <SettlementForm />;
  }
};

export default getModalForm;
