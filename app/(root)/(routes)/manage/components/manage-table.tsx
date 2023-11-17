'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import AlertDialog from '@/components/alert-dialog/alert-dialog';

interface ManageTableProps {
  title: string;
  databaseName: string;
  data: string[];
}

const ManageTable: React.FC<ManageTableProps> = ({ title, data, databaseName }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setTitle, setIsOpen, setDatabaseName } = useContext(ModalSheetContext);
  const [loading, setIsLoading] = useState(false);
  const [elementName, setElementName] = useState('');
  const [databaseRoute, setDatabaseRoute] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const getDatabaseRoute = () => {
    let route = '';

    if (databaseRoute === 'departments') {
      route = `/api/departments/${elementName}`;
    }

    if (databaseRoute === 'locations') {
      route = `/api/locations/${elementName}`;
    }

    return route;
  };

  const handleDelete = () => {
    if (loading) return;

    setIsLoading(true);

    axios
      .patch(getDatabaseRoute())
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
        setDatabaseRoute('');
      });
  };

  const handleEdit = () => {};

  const editButton = (
    <button
      onClick={() => {
        setIsOpen(true);
        setTitle(title);
        setDatabaseName(databaseName);
      }}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (element: string, databaseName: string) => (
    <button
      onClick={() => {
        setIsDialogOpen(true);
        setElementName(element);
        setDatabaseRoute(databaseName);
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
                  actions={[editButton, deleteButton(element, databaseName)]}
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
