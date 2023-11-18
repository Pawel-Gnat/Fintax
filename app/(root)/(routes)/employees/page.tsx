import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

const allEmployees = [
  {
    id: '1',
    name: 'Kondrat',
    surname: 'Turman',
    email: 'placeholder@poczta.pl',
    role: 'Kadry i płace',
    location: 'Warszawa',
    companies: 17,
    userId: '1',

    emailVerified: new Date(),
    hashedPassword: 'randomHashedPassword',
    image: 'randomImageURL',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Katarzyna',
    surname: 'Dobrzyk',
    email: 'placeholder@poczta.pl',
    role: 'Kadry i płace',
    location: 'Warszawa',
    companies: 12,
    userId: '2',

    emailVerified: new Date(),
    hashedPassword: 'randomHashedPassword',
    image: 'randomImageURL',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Joanna',
    surname: 'Leman',
    email: 'placeholder@poczta.pl',
    role: 'Księgowość',
    location: 'Katowice',
    companies: 21,
    userId: '3',

    emailVerified: new Date(),
    hashedPassword: 'randomHashedPassword',
    image: 'randomImageURL',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const EmployeesPage = () => {
  return (
    <PageContainer heading="Employees">
      <Card title="Employees" data={allEmployees} databaseName="employees" />
    </PageContainer>
  );
};

export default EmployeesPage;
