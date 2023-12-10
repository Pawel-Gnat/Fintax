import getAllEmployees from '@/actions/getAllEmployees';
import getAllSettlements from '@/actions/getAllSettlements';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import DataTable from '@/components/data-table/data-table';
import { columns } from './components/settlement-cols';

const SettlementsPage = async () => {
  const allCompanySettlements = await getAllSettlements();
  const allCompanyEmployees = await getAllEmployees();

  return (
    <PageContainer heading="Settlements">
      {allCompanySettlements && allCompanyEmployees && (
        <Card title="Settlements" action="setSettlement">
          <DataTable
            title="Settlements"
            columns={columns}
            data={allCompanySettlements}
            employees={allCompanyEmployees}
            settlements={allCompanySettlements}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default SettlementsPage;
