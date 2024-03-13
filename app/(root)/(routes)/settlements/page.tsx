'use client';

import useSettlements from '@/hooks/useSettlements';
import useEmployees from '@/hooks/useEmployees';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';
import DataTable from '@/components/data-table/data-table';
import { columns } from './components/settlement-cols';

const SettlementsPage = () => {
  const { settlements, isSettlementsLoading } = useSettlements();
  const { employees, isEmployeesLoading } = useEmployees();

  return (
    <PageContainer>
      {settlements && employees && (
        <Card title="Settlements" action="setSettlement">
          <DataTable
            title="Settlements"
            columns={columns}
            data={settlements}
            employees={employees}
            settlements={settlements}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default SettlementsPage;
