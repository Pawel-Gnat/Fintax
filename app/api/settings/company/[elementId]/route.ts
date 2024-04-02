import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import getCurrentCompany from '@/actions/getCurrentCompany';

interface ParamsProps {
  elementId: string;
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { name } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      name,
    },
  });

  return NextResponse.json('Company updated');
}
