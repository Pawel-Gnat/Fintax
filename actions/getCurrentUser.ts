'use server';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    const employee = await prisma.employee.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    const account = user || employee;

    if (!account) {
      return null;
    }

    return account;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
