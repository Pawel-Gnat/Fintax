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

const getModalForm = (title: string, setIsOpen: (value: boolean) => void) => {
  if (title === 'Locations') {
    return <LocationForm setIsOpen={setIsOpen} />;
  }

  if (title === 'Departments') {
    return <DepartmentForm setIsOpen={setIsOpen} />;
  }

  if (title === 'Employees') {
    return <EmployeeForm />;
  }
};

const ModalSheet = () => {
  const { isOpen, setIsOpen, title } = useContext(ModalSheetContext);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>Add new {getTitle(title)}</SheetTitle>
          <SheetDescription>{getDescription(title)}</SheetDescription>
        </SheetHeader>
        {getModalForm(title, setIsOpen)}
      </SheetContent>
    </Sheet>
  );
};

export default ModalSheet;
