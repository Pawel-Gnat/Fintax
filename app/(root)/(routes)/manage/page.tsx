import PageContainer from '@/components/page-container/page-container';
import ManageCard from './components/manage-card';

const info = [
  { title: 'Locations', data: ['Warszawa', 'Poznań', 'Katowice'] },
  { title: 'Departments', data: ['Kadry i płace', 'Księgowość', 'Marketing'] },
];

const ManagePage = () => {
  return (
    <PageContainer heading="Manage">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {info.map((item) => (
          <ManageCard key={item.title} title={item.title} data={item.data} />
        ))}
      </div>
    </PageContainer>
  );
};

export default ManagePage;
