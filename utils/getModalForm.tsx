import EmployeeForm from '@/app/(root)/(routes)/employees/components/employee-form';
import LocationForm from '@/app/(root)/(routes)/manage/components/location-form';
import DepartmentForm from '@/app/(root)/(routes)/manage/components/department-form';
import SettlementForm from '@/app/(root)/(routes)/settlements/components/settlement-form';

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

  if (databaseName === 'settlements') {
    return <SettlementForm />;
  }
};

export default getModalForm;
