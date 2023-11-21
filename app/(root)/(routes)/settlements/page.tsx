import getAllEmployees from '@/actions/getAllEmployees';
import getAllSettlements from '@/actions/getAllSettlements';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

const SettlementsPage = async () => {
  const allCompanySettlements = await getAllSettlements();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Settlements">
      {allCompanySettlements && allCompanyEmployees && (
        <Card
          title="Settlements"
          data={allCompanySettlements}
          employees={allCompanyEmployees}
          databaseName="settlements"
        />
      )}
    </PageContainer>
  );
};

export default SettlementsPage;
