import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

import getCurrentEmployee from '@/actions/getCurrentEmployee';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { password, newPassword } = body;

  const currentEmployee = await getCurrentEmployee(elementId);

  if (!currentEmployee) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const comparePassword = await bcrypt.compare(password, currentEmployee.hashedPassword);

  if (!comparePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 12);

  const employee = await prisma.employee.update({
    where: { id: currentEmployee.id },
    data: {
      hashedPassword: newHashedPassword,
    },
  });

  return NextResponse.json(employee);
}
