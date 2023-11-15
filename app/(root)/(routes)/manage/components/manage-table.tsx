'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import AlertDialog from '@/components/alert-dialog/alert-dialog';

interface ManageTableProps {
  title: string;
  apiRoute: string;
  data: string[];
}

const ManageTable: React.FC<ManageTableProps> = ({ title, data, apiRoute }) => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const [elementName, setElementName] = useState('');
  const [urlRoute, setUrlRoute] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const getUrlRoute = () => {
    let route = '';

    if (urlRoute === 'departments') {
      route = `/api/departments/${elementName}`;
    }

    if (urlRoute === 'locations') {
      route = `/api/locations/${elementName}`;
    }

    return route;
  };

  const handleDelete = () => {
    if (loading) return;

    setIsLoading(true);

    axios
      .patch(getUrlRoute())
      .then(() => {
        toast({
          description: `${elementName} has been deleted.`,
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
        setElementName('');
        setUrlRoute('');
      });
  };

  const handleEdit = () => {};

  const editButton = (
    <button className="flex w-full items-center justify-center gap-2">
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (element: string, apiRoute: string) => (
    <button
      onClick={() => {
        setIsDialogOpen(true);
        setElementName(element);
        setUrlRoute(apiRoute);
      }}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileMinus2 />
      Delete
    </button>
  );

  return (
    <>
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
      <AlertDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onContinue={handleDelete}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your data from our servers."
      />
    </>
  );
};

export default ManageTable;
