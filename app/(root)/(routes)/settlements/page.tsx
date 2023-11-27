import getAllEmployees from '@/actions/getAllEmployees';
import getAllSettlements from '@/actions/getAllSettlements';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import Table from '@/components/table/table';
import SettlementRows from './components/settlement-rows';

const SettlementsPage = async () => {
  const allCompanySettlements = await getAllSettlements();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Settlements">
      {allCompanySettlements && allCompanyEmployees && (
        <Card title="Settlements" action="setSettlement">
          <Table
            title="Settlements"
            data={allCompanySettlements}
            headers={['Settlement', 'Location', 'Employee']}
            rows={<SettlementRows data={allCompanySettlements} title="Settlements" />}
            employees={allCompanyEmployees}
            settlements={allCompanySettlements}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default SettlementsPage;
