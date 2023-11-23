import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentEmployee from '@/actions/getCurrentEmployee';

interface ParamsProps {
  elementId: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { name, surname, email, password, department, location } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
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

  const hashedPassword = await bcrypt.hash(password, 12);
  const employee = await prisma.employee.create({
    data: {
      name,
      surname,
      image: '',
      email,
      hashedPassword,
      company: {
        connect: { id: currentCompany.id },
      },
    },
  });

  return NextResponse.json(employee);
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, surname, email, department, location } = body;

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
      name,
      surname,
      email,
      departmentId: existingDepartment?.id || null,
      locationId: existingLocation?.id || null,
    },
  });

  return NextResponse.json(employee);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;

  const currentEmployee = await getCurrentEmployee(elementId);

  if (!currentEmployee) {
    return null;
  }

  const employee = await prisma.employee.delete({
    where: { id: currentEmployee.id },
  });

  return NextResponse.json(employee);
}
