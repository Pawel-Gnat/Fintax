import prisma from '@/lib/prisma';

const getCurrentDepartment = async (departmentId: string) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      return null;
    }

    return department;
  } catch (error) {
    return null;
  }
};

export default getCurrentDepartment;
