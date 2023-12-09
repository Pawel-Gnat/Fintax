import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentDepartment from '@/actions/getCurrentDepartment';

interface ParamsProps {
  elementId: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { department } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return NextResponse.error();
  }

  const newDepartment = await prisma.department.create({
    data: {
      name: department,
      company: {
        connect: {
          id: currentCompany.id,
        },
      },
    },
  });

  return NextResponse.json(newDepartment);
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { department } = body;

  const currentDepartment = await getCurrentDepartment(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentDepartment || !currentCompany) {
    return NextResponse.error();
  }

  const removedDepartment = await prisma.department.delete({
    where: { id: currentDepartment.id },
  });

  const newDepartment = await prisma.department.create({
    data: {
      name: department,
      company: {
        connect: {
          id: currentCompany.id,
        },
      },
    },
  });

  return NextResponse.json(newDepartment);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;

  const currentDepartment = await getCurrentDepartment(elementId);

  if (!currentDepartment) {
    return NextResponse.error();
  }

  const department = await prisma.department.delete({
    where: { id: currentDepartment.id },
  });

  return NextResponse.json(department);
}
