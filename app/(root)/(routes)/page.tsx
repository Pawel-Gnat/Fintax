// import { NextPageContext } from 'next';
// import { getSession } from 'next-auth/react';

import getCurrentUser from '@/actions/getCurrentUser';
import { useEffect } from 'react';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

const Home = async () => {
  // const currentUser = await getCurrentUser();

  // useEffect(() => {
  //   console.log('lol');
  //   // console.log(currentUser);
  // }, []);

  // console.log('lol');

  return <div>Hello from Dashboard</div>;
};

export default Home;
