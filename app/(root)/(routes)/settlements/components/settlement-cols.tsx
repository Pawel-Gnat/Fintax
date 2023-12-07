'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { Button as UIButton } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Button from '@/components/button/button';

import { SafeEmployee, SafeSettlement } from '@/types/types';

import { useContext } from 'react';
import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

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
        setTitle('Settlements');
        setElementId(id);
        setElementName(name);
        setAction('setSettlement');
      }}
      text="Edit settlement"
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
        setAlertDatabaseRoute('settlements');
      }}
      text="Delete settlement"
      icon={<LuFileMinus2 />}
    />
  );
};

export const columns: ColumnDef<SafeSettlement>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <UIButton
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Settlement
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </UIButton>
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
      return `${currentEmployee?.name} ${currentEmployee?.surname}`;
    },
  },
  {
    id: 'actions',
    header: 'Options',
    cell: ({ row }) => {
      const element = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UIButton variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuCircleEllipsis size={20} />
            </UIButton>
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
