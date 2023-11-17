import prisma from '@/lib/prisma';

const getCurrentLocation = async (locationId: string) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    });

    if (!location) {
      return null;
    }

    return location;
  } catch (error) {
    return null;
  }
};

export default getCurrentLocation;
