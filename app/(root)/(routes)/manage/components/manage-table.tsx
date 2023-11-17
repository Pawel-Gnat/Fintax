'use client';

import { useContext } from 'react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';

interface ManageTableProps {
  title: string;
  databaseName: string;
  data: string[];
}

const ManageTable: React.FC<ManageTableProps> = ({ title, data, databaseName }) => {
  const { setTitle, setIsOpen, setIsEditing, setElementName, setDatabaseName } =
    useContext(ModalSheetContext);
  const { setIsAlertOpen, setAlertElementName, setAlertDatabaseName } =
    useContext(AlertDialogContext);

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const editButton = (element: string) => (
    <button
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle(title);
        setElementName(element);
        setDatabaseName(databaseName);
      }}
      className="flex w-full items-center justify-center gap-2"
    >
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (element: string) => (
    <button
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementName(element);
        setAlertDatabaseName(databaseName);
      }}
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
                actions={[editButton(element), deleteButton(element)]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
