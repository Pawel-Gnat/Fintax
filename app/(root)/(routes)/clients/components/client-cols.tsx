'use client';

import { useContext } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Button from '@/components/button/button';

import { SafeClient, SafeEmployee } from '@/types/types';

interface ButtonProps {
  id: string;
  name: string;
}

const EditButton: React.FC<ButtonProps> = ({ id, name }) => {
  const { setTitle, setIsOpen, setIsEditing, setElementId, setAction, setElementName } =
    useContext(ModalSheetContext);

  return (
    <Button
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle('Clients');
        setElementId(id);
        setElementName(name);
        setAction('setClient');
      }}
      text="Edit client"
      icon={<LuFileEdit />}
    />
  );
};

const DeleteButton: React.FC<ButtonProps> = ({ id, name }) => {
  const {
    setIsAlertOpen,
    setAlertElementId,
    setAlertDatabaseRoute,
    setAlertElementName,
  } = useContext(AlertDialogContext);

  return (
    <Button
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementId(id);
        setAlertElementName(name);
        setAlertDatabaseRoute('clients');
      }}
      text="Delete client"
      icon={<LuFileMinus2 />}
    />
  );
};

export const columns: ColumnDef<SafeClient>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          icon={<ArrowUpDown className="ml-2 h-4 w-4" />}
          text="Client"
        />
      );
    },
    cell: ({ row }) => {
      return row.getValue('name');
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      return row.getValue('location');
    },
  },
  {
    accessorKey: 'employee',
    header: 'Employee',
    cell: ({ row }) => {
      const currentEmployee: SafeEmployee = row.getValue('employee');

      return currentEmployee
        ? `${currentEmployee?.name} ${currentEmployee?.surname}`
        : '-';
    },
  },
  {
    id: 'actions',
    header: 'Options',
    cell: ({ row }) => {
      const element = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-tetriary p-2 transition-colors hover:text-secondary">
            <span className="sr-only">Open menu</span>
            <LuCircleEllipsis size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <EditButton id={element.id} name={element.name} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButton id={element.id} name={element.name} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
