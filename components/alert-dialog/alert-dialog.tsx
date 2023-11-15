'use client';

import { useEffect, useState } from 'react';

import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onContinue: () => void;
  title: string;
  description: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  setIsOpen,
  onContinue,
  title,
  description,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  return (
    <AlertDialogUI open={isDialogOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onContinue()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};

export default AlertDialog;
