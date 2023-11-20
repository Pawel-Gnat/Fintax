import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

const EmployeesPage = async () => {
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyLocations = await getAllLocations();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Employees">
      {allCompanyLocations && allCompanyDepartments && allCompanyEmployees && (
        <Card
          title="Employees"
          databaseName="employees"
          data={allCompanyEmployees}
          departments={allCompanyDepartments}
          locations={allCompanyLocations}
        />
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
