import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentEmployee from '@/actions/getCurrentEmployee';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { department, location } = body;

  const currentEmployee = await getCurrentEmployee(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentCompany || !currentEmployee) {
    return NextResponse.error();
  }

  const existingLocation = await prisma.location.findUnique({
    where: {
      companyId_name: {
        companyId: currentCompany.id,
        name: location,
      },
    },
  });

  const existingDepartment = await prisma.department.findUnique({
    where: {
      companyId_name: {
        companyId: currentCompany.id,
        name: department,
      },
    },
  });

  const employee = await prisma.employee.update({
    where: { id: currentEmployee.id },
    data: {
      departmentId: existingDepartment?.id || null,
      locationId: existingLocation?.id || null,
    },
  });

  return NextResponse.json(employee);
}
