import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import getCurrentCompany from '@/actions/getCurrentCompany';
import getCurrentLocation from '@/actions/getCurrentLocation';

interface ParamsProps {
  elementId: string;
}

export async function POST(request: Request, { params }: { params: ParamsProps }) {
  const body = await request.json();
  const { location } = body;

  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return NextResponse.error();
  }

  const newLocation = await prisma.location.create({
    data: {
      name: location,
      company: {
        connect: {
          id: currentCompany.id,
        },
      },
    },
  });

  return NextResponse.json(newLocation);
}

export async function PATCH(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;
  const body = await request.json();
  const { location } = body;

  const currentLocation = await getCurrentLocation(elementId);
  const currentCompany = await getCurrentCompany();

  if (!currentLocation || !currentCompany) {
    return NextResponse.error();
  }

  const removedLocation = await prisma.location.delete({
    where: { id: currentLocation.id },
  });

  const newLocation = await prisma.location.create({
    data: {
      name: location,
      company: {
        connect: {
          id: currentCompany.id,
        },
      },
    },
  });

  return NextResponse.json(newLocation);
}

export async function DELETE(request: Request, { params }: { params: ParamsProps }) {
  const { elementId } = params;

  const currentLocation = await getCurrentLocation(elementId);

  if (!currentLocation) {
    return NextResponse.error();
  }

  const location = await prisma.location.delete({
    where: { id: currentLocation.id },
  });

  return NextResponse.json(location);
}
