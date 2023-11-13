import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import getCurrentCompany from '@/actions/getCurrentCompany';

export async function POST(request: Request) {
  const body = await request.json();
  const { location } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      locations: {
        push: location,
      },
    },
  });

  return NextResponse.json(company);
}
