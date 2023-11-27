'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import getTitle from '@/utils/getFormTitle';
import getDescription from '@/utils/getFormDescription';
import getModalForm from '@/utils/getModalForm';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const ModalSheet = () => {
  const { isOpen, setIsOpen, isEditing, action } = useContext(ModalSheetContext);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>
            {isEditing ? 'Edit current' : 'Add new'} {getTitle(action)}
          </SheetTitle>
          <SheetDescription>{getDescription(action)}</SheetDescription>
        </SheetHeader>
        {getModalForm(action)}
      </SheetContent>
    </Sheet>
  );
};

export default ModalSheet;
