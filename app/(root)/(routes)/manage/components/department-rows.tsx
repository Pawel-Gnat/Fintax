'use client';

import { useContext } from 'react';
import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import { ModalSheetContext } from '@/context/modal-sheet-context';
import { AlertDialogContext } from '@/context/alert-dialog-context';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import Button from '@/components/button/button';
import { TableCell, TableRow } from '@/components/ui/table';

import { Department } from '@prisma/client';

interface DepartmentRowsProps {
  title: string;
  data: Department[];
}

const DepartmentRows: React.FC<DepartmentRowsProps> = ({ data, title }) => {
  const { setTitle, setIsOpen, setIsEditing, setElementId, setAction, setElementName } =
    useContext(ModalSheetContext);

  const {
    setIsAlertOpen,
    setAlertElementId,
    setAlertDatabaseRoute,
    setAlertElementName,
  } = useContext(AlertDialogContext);

  const buttons = (elementId: string, elementName: string) => [
    <Button
      key="edit"
      onClick={() => {
        setIsOpen(true);
        setIsEditing(true);
        setTitle(title);
        setElementId(elementId);
        setElementName(elementName);
        setAction('setDepartment');
      }}
      text="Edit department"
      icon={<LuFileEdit />}
    />,
    <Button
      key="delete"
      onClick={() => {
        setIsAlertOpen(true);
        setAlertElementId(elementId);
        setAlertElementName(elementName);
        setAlertDatabaseRoute('departments');
      }}
      text="Delete department"
      icon={<LuFileMinus2 />}
    />,
  ];

  return (
    <>
      {data.map((element) => (
        <TableRow key={element.id}>
          <TableCell>{element.name}</TableCell>
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

export default DepartmentRows;
