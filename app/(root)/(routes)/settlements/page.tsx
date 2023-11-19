import getAllSettlements from '@/actions/getAllSettlements';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

const SettlementsPage = async () => {
  const allSettlements = await getAllSettlements();

  return (
    <PageContainer heading="Settlements">
      <Card title="Settlements" data={allSettlements} databaseName="settlements" />
    </PageContainer>
  );
};

export default SettlementsPage;
