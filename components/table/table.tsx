'use client';

import { useContext } from 'react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import getTableHeadersDescription from '@/utils/getTableHeadersDescription';

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from '@/components/ui/table';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import Avatar from '@/components/avatar/avatar';

import { Department, Employee, Location } from '@prisma/client';

interface ManageTableProps {
  title: string;
  databaseName: string;
  data: Employee[] & Location[] & Department[];
}

const Table: React.FC<ManageTableProps> = ({ title, data, databaseName }) => {
  const {
    setTitle,
    setIsOpen,
    setIsEditing,
    setElementId,
    setDatabaseName,
    setElementName,
  } = useContext(ModalSheetContext);
  const { setIsAlertOpen, setAlertElementId, setAlertDatabaseName, setAlertElementName } =
    useContext(AlertDialogContext);

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const editButton = (elementId: string, elementName: string) => (
    <button
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle(title);
        setElementId(elementId);
        setElementName(elementName);
        setDatabaseName(databaseName);
      }}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (elementId: string, elementName: string) => (
    <button
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementId(elementId);
        setAlertElementName(elementName);
        setAlertDatabaseName(databaseName);
      }}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileMinus2 />
      Delete
    </button>
  );

  const tableHeaders = getTableHeadersDescription(databaseName);

  return (
    <TableUI>
      <TableHeader>
        {tableHeaders.map((column) => (
          <TableHead key={column}>{column}</TableHead>
        ))}
        <TableHead className="text-right">Options</TableHead>
      </TableHeader>
      <TableBody>
        {data.map((element) => (
          <TableRow key={element.id}>
            <TableCell className="">
              {databaseName === 'employees' ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    image={element.image}
                    name={element.name}
                    surname={element.surname}
                  />
                  <p>{`${element.name} ${element.surname}`}</p>
                </div>
              ) : (
                element.name
              )}
            </TableCell>
            {databaseName === 'employees' && <TableCell>{element.role}</TableCell>}
            {databaseName === 'employees' && <TableCell>{element.location}</TableCell>}
            {databaseName === 'employees' && <TableCell>{element.companies}</TableCell>}
            <TableCell className="text-right">
              <DropdownMenu
                icon={<LuCircleEllipsis size={20} />}
                actions={[
                  editButton(element.id, element.name),
                  deleteButton(element.id, element.name),
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableUI>
  );
};

export default Table;
