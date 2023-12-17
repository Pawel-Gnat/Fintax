import { LuUsers2, LuLandmark, LuMapPin, LuGlobe2 } from 'react-icons/lu';

import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';
import getAllSettlements from '@/actions/getAllSettlements';
import getCurrentCompany from '@/actions/getCurrentCompany';

import PageContainer from '@/components/page-container/page-container';
import ContentWrapper from '@/components/content-wrapper/content-wrapper';
import Card from './components/card';

const Home = async () => {
  const currentCompany = await getCurrentCompany();
  const allCompanyLocations = await getAllLocations();
  const allCompanySettlements = await getAllSettlements();
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyEmployees = await getAllEmployees();

  if (!currentCompany) return null;

  return (
    <PageContainer>
      <ContentWrapper>
        <div className="flex flex-col justify-between">
          <h1 className="text-4xl">{currentCompany.name}</h1>
          <p className="text-xl">General statistics</p>
        </div>
        <div className="flex flex-row gap-10">
          <Card title="Locations" number={allCompanyLocations?.length} icon={LuGlobe2} />
          <Card
            title="Departments"
            number={allCompanyDepartments?.length}
            icon={LuLandmark}
          />
          <Card title="Employees" number={allCompanyEmployees?.length} icon={LuUsers2} />
          <Card
            title="Settlements"
            number={allCompanySettlements?.length}
            icon={LuMapPin}
          />
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;
