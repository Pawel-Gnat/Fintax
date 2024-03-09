'use server';

import prisma from '@/lib/prisma';

const getCurrentSettlement = async (settlementId: string) => {
  try {
    const settlement = await prisma.settlement.findUnique({
      where: {
        id: settlementId,
      },
    });

    if (!settlement) {
      return null;
    }

    return settlement;
  } catch (error) {
    return null;
  }
};

export default getCurrentSettlement;
