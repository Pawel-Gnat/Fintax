import PageContainer from '@/components/page-container/page-container';
import Activities from './components/activities';
import Charts from './components/charts';
import Statistics from './components/statistics';

const Home = async () => {
  return (
    <PageContainer>
      <Statistics />
      <Activities />
      <Charts />
    </PageContainer>
  );
};

export default Home;
