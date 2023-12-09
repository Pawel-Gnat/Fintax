'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2, LuFileCog } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import Button from '@/components/button/button';
import { TableCell, TableRow } from '@/components/ui/table';
import Avatar from '@/components/avatar/avatar';

import { SafeEmployee } from '@/types/types';

interface EmployeeRowsProps {
  data: SafeEmployee[];
}

const EmployeeRows: React.FC<EmployeeRowsProps> = ({ data }) => {
  const { setTitle, setIsOpen, setIsEditing, setElementId, setAction, setElementName } =
    useContext(ModalSheetContext);

  const {
    setIsAlertOpen,
    setAlertElementId,
    setAlertDatabaseRoute,
    setAlertElementName,
  } = useContext(AlertDialogContext);

  const router = useRouter();

  const buttons = (elementId: string, elementName: string) => [
    <Button
      key="assign"
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle('Employees');
        setElementId(elementId);
        setElementName(elementName);
        setAction('assignEmployee');
      }}
      text="Assign employee"
      icon={<LuFileEdit />}
    />,
    <Button
      key="settings"
      onClick={() => router.push(`/employees/${elementId}/settings`)}
      text="Employee settings"
      icon={<LuFileCog />}
    />,
    <Button
      key="delete"
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementId(elementId);
        setAlertElementName(elementName);
        setAlertDatabaseRoute('employees');
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
              actions={buttons(element.id, element.name)}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EmployeeRows;
