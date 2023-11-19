import prisma from '@/lib/prisma';

import getCurrentCompany from './getCurrentCompany';

const getAllSettlements = async () => {
  try {
    const currentCompany = await getCurrentCompany();

    if (!currentCompany) {
      return null;
    }

    const settlements = await prisma.settlement.findMany({
      where: {
        companyId: currentCompany.id,
      },
    });

    if (!settlements) {
      return null;
    }

    return settlements;
  } catch (error) {
    return null;
  }
};

export default getAllSettlements;
