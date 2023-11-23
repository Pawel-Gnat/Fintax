import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentUser from '@/actions/getCurrentUser';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name, surname, email, image } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

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
