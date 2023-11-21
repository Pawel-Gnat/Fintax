import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentEmployee from '@/actions/getCurrentEmployee';

interface ParamsProps {
  elementId: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { name, location, employee } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return NextResponse.error();
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

// export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
//   const { elementId } = params;
//   const body = await request.json();
//   const { name, surname, email, department, location } = body;

//   const currentEmployee = await getCurrentEmployee(elementId);
//   const currentCompany = await getCurrentCompany();

//   if (!currentCompany || !currentEmployee) {
//     return NextResponse.error();
//   }

//   const existingLocation = await prisma.location.findUnique({
//     where: {
//       companyId_name: {
//         companyId: currentCompany.id,
//         name: location,
//       },
//     },
//   });

//   const existingDepartment = await prisma.department.findUnique({
//     where: {
//       companyId_name: {
//         companyId: currentCompany.id,
//         name: department,
//       },
//     },
//   });

//   const employee = await prisma.employee.update({
//     where: { id: currentEmployee.id },
//     data: {
//       name,
//       surname,
//       email,
//       departmentId: existingDepartment?.id,
//       locationId: existingLocation?.id,
//     },
//   });

//   return NextResponse.json(employee);
// }

// export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
//   const { elementId } = params;

//   const currentEmployee = await getCurrentEmployee(elementId);

//   if (!currentEmployee) {
//     return null;
//   }

//   const employee = await prisma.employee.delete({
//     where: { id: currentEmployee.id },
//   });

//   return NextResponse.json(employee);
// }
