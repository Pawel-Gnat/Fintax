'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Table from '@/components/table/table';
import { Button } from '@/components/ui/button';

import { Department, Location } from '@prisma/client';

interface CardProps {
  title: string;
  databaseName: string;
  data: Location[] | Department[];
}

const Card: React.FC<CardProps> = ({ title, data, databaseName }) => {
  const { setTitle, setIsOpen, setDatabaseName } = useContext(ModalSheetContext);

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
        <Table title={title} data={data} databaseName={databaseName} columns={[title]} />
      </CardContent>
    </CardUI>
  );
};

export default Card;
