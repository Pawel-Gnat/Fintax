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
  const {
    isOpen,
    setIsOpen,
    isEditing,
    databaseName,
    setIsEditing,
    setElementId,
    setElementName,
  } = useContext(ModalSheetContext);

  const handleOpen = () => {
    if (isEditing) {
      setIsEditing(false);
      setElementId('');
      setElementName('');
    }

    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpen}>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>
            {isEditing ? 'Edit current' : 'Add new'} {getTitle(databaseName)}
          </SheetTitle>
          <SheetDescription>{getDescription(databaseName)}</SheetDescription>
        </SheetHeader>
        {getModalForm(databaseName)}
      </SheetContent>
    </Sheet>
  );
};

export default ModalSheet;
