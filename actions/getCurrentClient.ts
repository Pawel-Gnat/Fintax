'use server';

import prisma from '@/lib/prisma';

const getCurrentClient = async (clientId: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return null;
    }

    return client;
  } catch (error) {
    return null;
  }
};

export default getCurrentClient;
