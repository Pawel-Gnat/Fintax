'use client';

import { useState } from 'react';

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
  SheetTrigger,
} from '@/components/ui/sheet';

interface ModalSheetProps {
  title: string;
}

const getModalForm = (
  title: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (title === 'Locations') {
    return <LocationForm setIsOpen={setIsOpen} />;
  }

  if (title === 'Departments') {
    return <DepartmentForm />;
  }

  if (title === 'Employees') {
    return <EmployeeForm />;
  }
};

const ModalSheet: React.FC<ModalSheetProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>Add new {getTitle(title)}</SheetTrigger>
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
