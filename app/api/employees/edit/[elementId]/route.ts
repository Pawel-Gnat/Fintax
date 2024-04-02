import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentEmployee from '@/actions/getCurrentEmployee';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, surname, email, image } = body;

  const currentEmployee = await getCurrentEmployee(elementId);

  if (!currentEmployee) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.employee.update({
    where: { id: currentEmployee.id },
    data: {
      name,
      surname,
      email,
      image,
    },
  });

  return NextResponse.json('Employee updated');
}
