import prisma from '@/lib/prisma';

import getCurrentCompany from './getCurrentCompany';
import { SafeEmployee } from '@/types/types';

const getAllEmployees = async (): Promise<SafeEmployee[] | null> => {
  try {
    const currentCompany = await getCurrentCompany();

    if (!currentCompany) {
      return null;
    }

    const employees = await prisma.employee.findMany({
      where: {
        companyId: currentCompany.id,
      },
      include: {
        department: true,
        location: true,
      },
    });

    if (!employees) {
      return null;
    }

    return employees;
  } catch (error) {
    return null;
  }
};

export default getAllEmployees;
