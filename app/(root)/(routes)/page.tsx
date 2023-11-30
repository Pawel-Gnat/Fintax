import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';
import getAllSettlements from '@/actions/getAllSettlements';
import getCurrentCompany from '@/actions/getCurrentCompany';
import Card from '@/components/card/card';

import PageContainer from '@/components/page-container/page-container';

const Home = async () => {
  const currentCompany = await getCurrentCompany();
  const allCompanyLocations = await getAllLocations();
  const allCompanySettlements = await getAllSettlements();
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyEmployees = await getAllEmployees();

  if (!currentCompany) return null;

  return (
    <PageContainer heading={currentCompany.name}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card title="Locations">
          <p>
            {allCompanyLocations?.length === 0
              ? 'Please add new locations.'
              : `You currently have ${allCompanyLocations?.length} locations.`}
          </p>
        </Card>
        <Card title="Departments">
          <p>
            {allCompanyDepartments?.length === 0
              ? 'Please add new departments.'
              : `You currently have ${allCompanyDepartments?.length} departments.`}
          </p>
        </Card>
        <Card title="Employees">
          <p>
            {allCompanyEmployees?.length === 0
              ? 'Please add new employees.'
              : `You currently have ${allCompanyEmployees?.length} employees.`}
          </p>
        </Card>
        <Card title="Settlements">
          <p>
            {allCompanySettlements?.length === 0
              ? 'Please add new settlements.'
              : `You currently have ${allCompanySettlements?.length} settlements.`}
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Home;
