import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import DataTable from '@/components/data-table/data-table';
import { columns } from './components/employee-cols';

const EmployeesPage = async () => {
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyLocations = await getAllLocations();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Employees">
      {allCompanyLocations && allCompanyDepartments && allCompanyEmployees && (
        <Card title="Employees" action="setEmployee">
          <DataTable
            title="Employees"
            columns={columns}
            data={allCompanyEmployees}
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
