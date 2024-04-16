import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import Alerts from './components/alerts';
import Workload from './components/workload';
import Statistics from './components/statistics';
import EmployeeDistribution from './components/employee-distribution';

const Home = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <>
      <h2 className="text-4xl font-bold">Overview</h2>
      <Statistics />
      {user.role === 'admin' && (
        <>
          <div className="my-10 flex w-full flex-col gap-4 2xl:flex-row">
            <Workload />
            <EmployeeDistribution />
          </div>
          <Alerts />
        </>
      )}
    </>
  );
};

export default Home;
