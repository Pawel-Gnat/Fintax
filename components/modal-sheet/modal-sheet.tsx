'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import getTitle from '@/utils/getFormTitle';
import getDescription from '@/utils/getFormDescription';

import EmployeeForm from '@/app/(root)/(routes)/employees/components/employee-form';
import LocationForm from '@/app/(root)/(routes)/manage/components/location-form';
import DepartmentForm from '@/app/(root)/(routes)/manage/components/department-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const getModalForm = (databaseName: string, setIsOpen: (value: boolean) => void) => {
  if (databaseName === 'locations') {
    return <LocationForm setIsOpen={setIsOpen} />;
  }

  if (databaseName === 'departments') {
    return <DepartmentForm setIsOpen={setIsOpen} />;
  }

  if (databaseName === 'employees') {
    return <EmployeeForm />;
  }
};

const ModalSheet = () => {
  const { isOpen, setIsOpen, title, databaseName } = useContext(ModalSheetContext);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>Add new {getTitle(title)}</SheetTitle>
          <SheetDescription>{getDescription(title)}</SheetDescription>
        </SheetHeader>
        {getModalForm(databaseName, setIsOpen)}
      </SheetContent>
    </Sheet>
  );
};

export default ModalSheet;
