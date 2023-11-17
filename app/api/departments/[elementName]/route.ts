import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import getCurrentCompany from '@/actions/getCurrentCompany';

interface ParamsProps {
  elementName: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { department } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      departments: {
        push: department,
      },
    },
  });

  return NextResponse.json(company);
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementName } = params;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const newDepartments = currentCompany.departments.filter(
    (department) => department !== elementName,
  );

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      departments: {
        set: newDepartments,
      },
    },
  });

  return NextResponse.json(company);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementName } = params;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const newDepartments = currentCompany.departments.filter(
    (department) => department !== elementName,
  );

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      departments: {
        set: newDepartments,
      },
    },
  });

  return NextResponse.json(company);
}
