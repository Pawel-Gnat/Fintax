import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentEmployee from '@/actions/getCurrentEmployee';
import getCurrentSettlement from '@/actions/getCurrentSettlement';

interface ParamsProps {
  elementId: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { name, location, employee } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      companyId_name_surname: {
        companyId: currentCompany.id,
        name: employee.name,
        surname: employee.surname,
      },
    },
  });

  const settlement = await prisma.settlement.create({
    data: {
      name,
      location,
      companyId: currentCompany.id,
      employeeId: existingEmployee?.id || null,
    },
  });

  return NextResponse.json(settlement);
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, location, employee } = body;

  const currentSettlement = await getCurrentSettlement(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentSettlement || !currentCompany) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      companyId_name_surname: {
        companyId: currentCompany.id,
        name: employee.name,
        surname: employee.surname,
      },
    },
  });

  const settlement = await prisma.settlement.update({
    where: { id: currentSettlement.id },
    data: {
      name,
      location,
      employeeId: existingEmployee?.id || null,
    },
  });

  return NextResponse.json(settlement);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;

  const currentSettlement = await getCurrentSettlement(elementId);

  if (!currentSettlement) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settlement = await prisma.settlement.delete({
    where: { id: currentSettlement.id },
  });

  return NextResponse.json(settlement);
}
