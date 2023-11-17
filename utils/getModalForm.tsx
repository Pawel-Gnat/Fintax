import EmployeeForm from '@/app/(root)/(routes)/employees/components/employee-form';
import LocationForm from '@/app/(root)/(routes)/manage/components/location-form';
import DepartmentForm from '@/app/(root)/(routes)/manage/components/department-form';

const getModalForm = (databaseName: string) => {
  if (databaseName === 'locations') {
    return <LocationForm />;
  }

  if (databaseName === 'departments') {
    return <DepartmentForm />;
  }

  if (databaseName === 'employees') {
    return <EmployeeForm />;
  }
};

export default getModalForm;
