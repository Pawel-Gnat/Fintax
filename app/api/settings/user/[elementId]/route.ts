import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

import getCurrentUser from '@/actions/getCurrentUser';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, surname, email, image, password, newPassword } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (name) {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        surname,
        email,
        image,
      },
    });

    return NextResponse.json(user);
  }

  if (password) {
    const comparePassword = await bcrypt.compare(password, currentUser.hashedPassword);

    if (!comparePassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return NextResponse.json(user);
  }
}
