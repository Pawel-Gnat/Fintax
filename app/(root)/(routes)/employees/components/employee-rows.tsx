'use client';

import { useContext } from 'react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import Button from '@/components/button/button';
import { TableCell, TableRow } from '@/components/ui/table';
import Avatar from '@/components/avatar/avatar';

import { SafeEmployee } from '@/types/types';

interface EmployeeRowsProps {
  title: string;
  databaseName: string;
  data: SafeEmployee[];
}

const EmployeeRows: React.FC<EmployeeRowsProps> = ({ data, title, databaseName }) => {
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

  const buttons = (elementId: string, elementName: string, databaseName: string) => [
    <Button
      key="edit"
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle(title);
        setElementId(elementId);
        setElementName(elementName);
        setDatabaseName(databaseName);
      }}
      text="Edit employee"
      icon={<LuFileEdit />}
    />,
    <Button
      key="delete"
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementId(elementId);
        setAlertElementName(elementName);
        setAlertDatabaseName(databaseName);
      }}
      text="Delete employee"
      icon={<LuFileMinus2 />}
    />,
  ];

  return (
    <>
      {data.map((element) => (
        <TableRow key={element.id}>
          <TableCell className="flex items-center gap-2">
            <Avatar image={element.image} name={element.name} surname={element.surname} />
            <p>{`${element.name} ${element.surname}`}</p>
          </TableCell>
          <TableCell>{element.department?.name}</TableCell>
          <TableCell>{element.location?.name}</TableCell>
          <TableCell>{element.settlements?.length}</TableCell>
          <TableCell className="text-right">
            <DropdownMenu
              icon={<LuCircleEllipsis size={20} />}
              actions={buttons(element.id, element.name, databaseName)}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EmployeeRows;
