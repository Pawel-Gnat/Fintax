'use server';

import prisma from '@/lib/prisma';

import getCurrentCompany from './getCurrentCompany';

const getAllLocations = async () => {
  try {
    const currentCompany = await getCurrentCompany();

    if (!currentCompany) {
      return null;
    }

    const locations = await prisma.location.findMany({
      where: {
        companyId: currentCompany.id,
      },
    });

    if (!locations) {
      return null;
    }

    return locations;
  } catch (error) {
    return null;
  }
};

export default getAllLocations;
