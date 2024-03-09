'use server';

import prisma from '@/lib/prisma';

import getCurrentCompany from './getCurrentCompany';

const getAllDepartments = async () => {
  try {
    const currentCompany = await getCurrentCompany();

    if (!currentCompany) {
      return null;
    }

    const departments = await prisma.department.findMany({
      where: {
        companyId: currentCompany.id,
      },
    });

    if (!departments) {
      return null;
    }

    return departments;
  } catch (error) {
    return null;
  }
};

export default getAllDepartments;
