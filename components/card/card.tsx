'use client';

import { useContext } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { cn } from '@/lib/utils';

import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardProps {
  className?: string;
  title?: string;
  action?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, title, children, action }) => {
  const { setTitle, setIsOpen, setAction, setIsEditing } = useContext(ModalSheetContext);

  return (
    <CardUI className={cn('h-max border-none bg-card shadow-xl', className)}>
      <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <CardTitle>{title}</CardTitle>

        {action && title && (
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
