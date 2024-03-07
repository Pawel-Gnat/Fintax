import { LuUsers2, LuLandmark, LuMapPin, LuGlobe2 } from 'react-icons/lu';

import getAllDepartments from '@/actions/getAllDepartments';
import getAllEmployees from '@/actions/getAllEmployees';
import getAllLocations from '@/actions/getAllLocations';
import getAllSettlements from '@/actions/getAllSettlements';
import getCurrentCompany from '@/actions/getCurrentCompany';

import PageContainer from '@/components/page-container/page-container';
import ContentWrapper from '@/components/content-wrapper/content-wrapper';
import PieChart from './components/pie-chart';
import DetailCard from './components/detail-card';
import NoticeContainer from './components/notice-container';
import BarChart from './components/bar-chart';
import ActivitiesBoard from './components/activities-board';

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
          <h1 className="text-4xl font-bold">{currentCompany.name}</h1>
          <p className="text-xl">General statistics</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-10">
          <DetailCard
            title="Locations"
            number={allCompanyLocations?.length}
            icon={LuGlobe2}
          />
          <DetailCard
            title="Departments"
            number={allCompanyDepartments?.length}
            icon={LuLandmark}
          />
          <DetailCard
            title="Employees"
            number={allCompanyEmployees?.length}
            icon={LuUsers2}
          />
          <DetailCard
            title="Settlements"
            number={allCompanySettlements?.length}
            icon={LuMapPin}
          />
        </div>
      </ContentWrapper>

      <NoticeContainer title="Required activities" className="my-10">
        <ActivitiesBoard />
      </NoticeContainer>

      {allCompanyLocations && allCompanyEmployees && allCompanySettlements && (
        <NoticeContainer title="Charts" className="my-10">
          <div className="hidden md:block">
            <PieChart locations={allCompanyLocations} employees={allCompanyEmployees} />
            <BarChart
              employees={allCompanyEmployees}
              settlements={allCompanySettlements}
            />
          </div>
          <p className="my-5 block text-center md:hidden">
            The charts are not available for the current screen width.
          </p>
        </NoticeContainer>
      )}
    </PageContainer>
  );
};

export default Home;
