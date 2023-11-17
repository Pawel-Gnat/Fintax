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
  const { setTitle, setIsOpen, setDatabaseName } = useContext(ModalSheetContext);
  const {
    setIsAlertOpen,
    setElementName: setAlertElementName,
    setDatabaseName: setAlertDatabaseName,
  } = useContext(AlertDialogContext);

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

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
                actions={[editButton, deleteButton(element, databaseName)]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
