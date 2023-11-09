import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

const getCurrentUser = async () => {
  try {
    // const session = await getSession();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
    // return error;
  }
};

export default getCurrentUser;
