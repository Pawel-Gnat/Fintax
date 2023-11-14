'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface ManageTableProps {
  title: string;
  apiRoute: string;
  data: string[];
}

const ManageTable: React.FC<ManageTableProps> = ({ title, data, apiRoute }) => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const getApiRoute = (element: string, apiRoute: string) => {
    let route = '';

    if (apiRoute === 'Departments') {
      route = `/api/departments/${element}`;
    }

    if (apiRoute === 'Locations') {
      route = `/api/locations/${element}`;
    }

    return route;
  };

  const handleDelete = (element: string, apiRoute: string) => {
    if (loading) return;

    setIsLoading(true);

    axios
      .patch(getApiRoute(element, apiRoute))
      .then(() => {
        toast({
          description: `${element} has been deleted.`,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editButton = (
    <button className="flex w-full items-center justify-center gap-2">
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (element: string, apiRoute: string) => (
    <button
      onClick={() => handleDelete(element, apiRoute)}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileMinus2 />
      Delete
    </button>
  );

  return (
    <Table>
      <TableBody>
        {data.map((element) => (
          <TableRow key={element}>
            <TableCell>{element}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu
                icon={<LuCircleEllipsis size={20} />}
                actions={[editButton, deleteButton(element, apiRoute)]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
