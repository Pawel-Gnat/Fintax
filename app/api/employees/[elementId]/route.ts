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

  if (!existingDepartment || !existingLocation) {
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const employee = await prisma.employee.create({
    data: {
      name,
      surname,
      email,
      hashedPassword,
      company: {
        connect: { id: currentCompany.id },
      },
      department: {
        connect: { id: existingDepartment.id },
      },
      location: {
        connect: { id: existingLocation.id },
      },
    },
  });

  return NextResponse.json(employee);
}

// export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
//   const { elementId } = params;
//   const body = await request.json();
//   const { location } = body;

//   const currentLocation = await getCurrentLocation(elementId);
//   const currentCompany = await getCurrentCompany();

//   if (!currentLocation || !currentCompany) {
//     return null;
//   }

//   const removedLocation = await prisma.location.delete({
//     where: { id: currentLocation.id },
//   });

//   const newLocation = await prisma.location.create({
//     data: {
//       name: location,
//       company: {
//         connect: {
//           id: currentCompany.id,
//         },
//       },
//     },
//   });

//   return NextResponse.json(newLocation);
// }

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
