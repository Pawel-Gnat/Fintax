'use server';

import prisma from '@/lib/prisma';

import getCurrentCompany from './getCurrentCompany';

const getAllClients = async () => {
  try {
    const currentCompany = await getCurrentCompany();

    if (!currentCompany) {
      return null;
    }

    const clients = await prisma.client.findMany({
      where: {
        companyId: currentCompany.id,
      },
      include: {
        employee: true,
      },
    });

    if (!clients) {
      return null;
    }

    return clients;
  } catch (error) {
    return null;
  }
};

export default getAllClients;
