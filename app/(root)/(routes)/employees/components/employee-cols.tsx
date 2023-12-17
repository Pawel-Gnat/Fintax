'use client';

import { useContext } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { LuCircleEllipsis, LuFileCog, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/avatar/avatar';
import Button from '@/components/button/button';

import { SafeEmployee, SafeSettlement } from '@/types/types';
import { Department, Location } from '@prisma/client';

interface ButtonProps {
  id: string;
  name: string;
}

const AssignButton: React.FC<ButtonProps> = ({ id, name }) => {
  const { setTitle, setIsOpen, setIsEditing, setElementId, setAction, setElementName } =
    useContext(ModalSheetContext);

  return (
    <Button
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle('Employees');
        setElementId(id);
        setElementName(name);
        setAction('assignEmployee');
      }}
      text="Assign employee"
      icon={<LuFileEdit />}
    />
  );
};

const EditButton: React.FC<ButtonProps> = ({ id, name }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/employees/${id}/settings`)}
      text="Employee settings"
      icon={<LuFileCog />}
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
        setAlertDatabaseRoute('employees');
      }}
      text="Delete employee"
      icon={<LuFileMinus2 />}
    />
  );
};

export const columns: ColumnDef<SafeEmployee>[] = [
  {
    accessorKey: 'surname',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          icon={<ArrowUpDown className="ml-2 h-4 w-4" />}
          text="Employee"
        />
      );
    },
    cell: ({ row }) => {
      const currentEmployee = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar
            image={currentEmployee.image}
            name={currentEmployee.name}
            surname={currentEmployee.surname}
          />
          <p>{`${currentEmployee.name} ${currentEmployee.surname}`}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      const currentDepartment: Department = row.getValue('department');
      return currentDepartment ? `${currentDepartment?.name}` : null;
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const currentLocation: Location = row.getValue('location');
      return currentLocation ? `${currentLocation?.name}` : null;
    },
  },
  {
    accessorKey: 'settlements',
    header: 'Managed companies',
    cell: ({ row }) => {
      const currentSettlements: SafeSettlement[] = row.getValue('settlements');
      return `${currentSettlements.length}`;
    },
  },
  {
    id: 'actions',
    header: 'Options',
    cell: ({ row }) => {
      const element = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 text-tetriary transition-colors hover:text-secondary">
            <span className="sr-only">Open menu</span>
            <LuCircleEllipsis size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <AssignButton id={element.id} name={element.name} />
            </DropdownMenuItem>
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
