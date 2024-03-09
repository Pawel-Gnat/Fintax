'use server';

import prisma from '@/lib/prisma';

const getCurrentEmployee = async (employeeId: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return null;
    }

    return employee;
  } catch (error) {
    return null;
  }
};

export default getCurrentEmployee;
