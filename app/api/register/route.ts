import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { company, name, surname, email, password } = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email address is already in use' },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      surname,
      image: '',
      email,
      hashedPassword,
    },
  });

  await prisma.company.create({
    data: {
      name: company,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json('Account created');
}
