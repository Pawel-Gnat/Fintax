import getAllDepartments from '@/actions/getAllDepartments';
import getAllLocations from '@/actions/getAllLocations';

import Card from '@/components/card/card';
import PageContainer from '@/components/page-container/page-container';

// const employees = [
//   {
//     id: '1',
//     name: 'Kondrat',
//     surname: 'Turman',
//     email: 'placeholder@poczta.pl',
//     role: 'Kadry i płace',
//     location: 'Warszawa',
//     companies: 17,
//     userId: '1',

//     emailVerified: new Date(),
//     hashedPassword: 'randomHashedPassword',
//     image: 'randomImageURL',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: '2',
//     name: 'Katarzyna',
//     surname: 'Dobrzyk',
//     email: 'placeholder@poczta.pl',
//     role: 'Kadry i płace',
//     location: 'Warszawa',
//     companies: 12,
//     userId: '2',

//     emailVerified: new Date(),
//     hashedPassword: 'randomHashedPassword',
//     image: 'randomImageURL',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: '3',
//     name: 'Joanna',
//     surname: 'Leman',
//     email: 'placeholder@poczta.pl',
//     role: 'Księgowość',
//     location: 'Katowice',
//     companies: 21,
//     userId: '3',

//     emailVerified: new Date(),
//     hashedPassword: 'randomHashedPassword',
//     image: 'randomImageURL',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

const EmployeesPage = async () => {
  const allCompanyDepartments = await getAllDepartments();
  const allCompanyLocations = await getAllLocations();
  const allCompanyEmployees = [];

  return (
    <PageContainer heading="Employees">
      {allCompanyLocations && allCompanyDepartments && (
        <Card
          title="Employees"
          databaseName="employees"
          data={allCompanyEmployees}
          // employees={employees}
          departments={allCompanyDepartments}
          locations={allCompanyLocations}
        />
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
