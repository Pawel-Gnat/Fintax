'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ManageTable from './manage-table';
import { Button } from '@/components/ui/button';

interface ManageCardProps {
  title: string;
  apiRoute: string;
  data: string[];
}

const ManageCard: React.FC<ManageCardProps> = ({ title, data, apiRoute }) => {
  const { setIsTitle, setIsOpen } = useContext(ModalSheetContext);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          onClick={() => {
            setIsOpen(true);
            setIsTitle(title);
          }}
        >
          Add new {title.toLowerCase()}
        </Button>
      </CardHeader>
      <CardContent>
        <ManageTable title={title} data={data} apiRoute={apiRoute} />
      </CardContent>
    </Card>
  );
};

export default ManageCard;
