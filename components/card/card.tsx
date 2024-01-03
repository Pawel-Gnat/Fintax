'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardProps {
  title: string;
  action?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, action }) => {
  const { setTitle, setIsOpen, setAction, setIsEditing } = useContext(ModalSheetContext);

  return (
    <CardUI className="h-max w-full border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <CardHeader className="flex flex-col items-start justify-between  gap-4 sm:flex-row sm:items-center">
        <CardTitle>{title}</CardTitle>

        {action && (
          <Button
            onClick={() => {
              setIsOpen(true);
              setTitle(title);
              setAction(action);
              setIsEditing(false);
            }}
          >
            Add new {title.toLowerCase()}
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardUI>
  );
};

export default Card;
