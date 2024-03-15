import Alerts from './components/alerts';
import Charts from './components/charts';
import Statistics from './components/statistics';

const Home = async () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Overview</h1>
      <Statistics />
      {/* <Alerts /> */}
      {/* <Charts /> */}
    </>
  );
};

export default Home;
