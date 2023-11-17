import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import getCurrentCompany from '@/actions/getCurrentCompany';

interface ParamsProps {
  elementName: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
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

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementName } = params;

  const body = await request.json();

  // console.log(body);

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const newLocations = currentCompany.locations.filter(
    (location) => location !== elementName,
  );

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      locations: {
        set: newLocations,
      },
    },
  });

  return NextResponse.json(company);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementName } = params;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return null;
  }

  const newLocations = currentCompany.locations.filter(
    (location) => location !== elementName,
  );

  const company = await prisma.company.update({
    where: { id: currentCompany.id },
    data: {
      locations: {
        set: newLocations,
      },
    },
  });

  return NextResponse.json(company);
}
