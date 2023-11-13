import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { company, name, surname, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      surname,
      email,
      hashedPassword,
    },
  });

  const newCompany = await prisma.company.create({
    data: {
      name: company,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json(user);
}
