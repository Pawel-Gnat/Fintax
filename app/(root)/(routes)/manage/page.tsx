import Locations from './components/locations';
import Departments from './components/departments';

const ManagePage = async () => {
  return (
    <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
      <Locations />
      <Departments />
    </div>
  );
};

export default ManagePage;
