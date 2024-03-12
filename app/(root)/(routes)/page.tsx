import PageContainer from '@/components/page-container/page-container';
import Alerts from './components/alerts';
import Charts from './components/charts';
import Statistics from './components/statistics';

const Home = async () => {
  return (
    <PageContainer>
      <Statistics />
      <Alerts />
      <Charts />
    </PageContainer>
  );
};

export default Home;
