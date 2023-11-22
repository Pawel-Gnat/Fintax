'use client';

import { useContext, useEffect } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Table from '@/components/table/table';
import { Button } from '@/components/ui/button';

import { Department, Location } from '@prisma/client';
import { SafeEmployee, SafeSettlement } from '@/types/types';

interface CardProps {
  title: string;
  databaseName: string;
  employees?: SafeEmployee[];
  departments?: Department[];
  locations?: Location[];
  settlements?: SafeSettlement[];
  data: SafeEmployee[] | Department[] | Location[] | SafeSettlement[];
}

const Card: React.FC<CardProps> = ({
  title,
  databaseName,
  employees,
  departments,
  locations,
  settlements,
  data,
}) => {
  const {
    setTitle,
    setIsOpen,
    setDatabaseName,
    setLocations,
    setDepartments,
    setEmployees,
    setSettlements,
  } = useContext(ModalSheetContext);

  useEffect(() => {
    if (locations) setLocations(locations);
  }, [locations, setLocations]);

  useEffect(() => {
    if (departments) setDepartments(departments);
  }, [departments, setDepartments]);

  useEffect(() => {
    if (employees) setEmployees(employees);
  }, [employees, setEmployees]);

  useEffect(() => {
    if (settlements) setSettlements(settlements);
  }, [settlements, setSettlements]);

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
