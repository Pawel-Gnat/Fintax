'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ManageTable from './manage-table';
import { Button } from '@/components/ui/button';

import { Department, Location } from '@prisma/client';

interface ManageCardProps {
  title: string;
  databaseName: string;
  data: Location[] | Department[];
}

const ManageCard: React.FC<ManageCardProps> = ({ title, data, databaseName }) => {
  const { setTitle, setIsOpen, setDatabaseName } = useContext(ModalSheetContext);

  return (
    <Card className="h-max">
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
        <ManageTable title={title} data={data} databaseName={databaseName} />
      </CardContent>
    </Card>
  );
};

export default ManageCard;
