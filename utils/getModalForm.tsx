import EmployeeForm from '@/app/(root)/(routes)/employees/components/employee-form';
import LocationForm from '@/app/(root)/(routes)/manage/components/location-form';
import DepartmentForm from '@/app/(root)/(routes)/manage/components/department-form';
import ClientForm from '@/app/(root)/(routes)/clients/components/client-form';
import AssignEmployeeForm from '@/app/(root)/(routes)/employees/components/assign-employee-form';

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

  if (action === 'setClient') {
    return <ClientForm />;
  }
};

export default getModalForm;
