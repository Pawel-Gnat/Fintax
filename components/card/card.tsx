'use client';

import { useContext, useEffect } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Table from '@/components/table/table';
import { Button } from '@/components/ui/button';

import { Department, Employee, Location } from '@prisma/client';

interface CardProps {
  title: string;
  databaseName: string;
  employees?: Employee[];
  departments?: Department[];
  locations?: Location[];
  data: Employee[] & Department[] & Location[];
}

const Card: React.FC<CardProps> = ({
  title,
  databaseName,
  employees,
  departments,
  locations,
  data,
}) => {
  const { setTitle, setIsOpen, setDatabaseName, setLocations, setDepartments } =
    useContext(ModalSheetContext);

  useEffect(() => {
    if (locations) setLocations(locations);
  }, [locations, setLocations]);

  useEffect(() => {
    if (departments) setDepartments(departments);
  }, [departments, setDepartments]);

  return (
    <CardUI className="h-max">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          onClick={() => {
            setIsOpen(true);
            setTitle(title);
            setDatabaseName(databaseName);
          }}
        >
          Add new {title.toLowerCase()}
        </Button>
      </CardHeader>
      <CardContent>
        <Table title={title} databaseName={databaseName} data={data} />
      </CardContent>
    </CardUI>
  );
};

export default Card;
