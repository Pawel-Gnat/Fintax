import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentClient from '@/actions/getCurrentClient';

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

  await prisma.client.create({
    data: {
      name,
      location,
      companyId: currentCompany.id,
      employeeId: existingEmployee?.id || null,
    },
  });

  return NextResponse.json('Client added');
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, location, employee } = body;

  const currentClient = await getCurrentClient(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentClient || !currentCompany) {
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

  await prisma.client.update({
    where: { id: currentClient.id },
    data: {
      name,
      location,
      employeeId: existingEmployee?.id || null,
    },
  });

  return NextResponse.json('Client updated');
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;

  const currentClient = await getCurrentClient(elementId);

  if (!currentClient) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await prisma.client.delete({
    where: { id: currentClient.id },
  });

  return NextResponse.json(`${client.name} deleted`);
}
