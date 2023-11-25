import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import Table from '@/components/table/table';
import EmployeeRows from './components/employee-rows';

const EmployeesPage = async () => {
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyLocations = await getAllLocations();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Employees">
      {allCompanyLocations && allCompanyDepartments && allCompanyEmployees && (
        <Card title="Employees" databaseName="employees">
          <Table
            title="Employees"
            data={allCompanyEmployees}
            headers={['Employee', 'Department', 'Location', 'Managed companies']}
            rows={
              <EmployeeRows
                data={allCompanyEmployees}
                databaseName="employees"
                title="Employees"
              />
            }
            employees={allCompanyEmployees}
            locations={allCompanyLocations}
            departments={allCompanyDepartments}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
