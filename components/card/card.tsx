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
    <CardUI className="h-max">
      <CardHeader className="flex flex-row items-center justify-between">
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
