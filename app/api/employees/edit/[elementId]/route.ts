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
  const { name, surname, email } = body;

  const currentEmployee = await getCurrentEmployee(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentCompany || !currentEmployee) {
    return NextResponse.error();
  }

  const employee = await prisma.employee.update({
    where: { id: currentEmployee.id },
    data: {
      name,
      surname,
      email,
    },
  });

  return NextResponse.json(employee);
}
