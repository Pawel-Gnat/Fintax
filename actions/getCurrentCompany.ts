'use server';

import prisma from '@/lib/prisma';

import getCurrentUser from './getCurrentUser';

const getCurrentCompany = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    // const company = await prisma.company.findUnique({
    //   where: {
    //     id: user.companyId,
    //   },
    // });

    // if (!company) {
    //   return null;
    // }

    // return company;

    if (user.companyId) {
      const companyByCompanyId = await prisma.company.findUnique({
        where: {
          id: user.companyId,
        },
      });

      if (companyByCompanyId) {
        return companyByCompanyId;
      }
    }

    const companyByUserId = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (companyByUserId) {
      return companyByUserId;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export default getCurrentCompany;
