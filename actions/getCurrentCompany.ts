'use server';

import prisma from '@/lib/prisma';

import getCurrentUser from './getCurrentUser';

const getCurrentCompany = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  } catch (error) {
    return null;
  }
};

export default getCurrentCompany;
