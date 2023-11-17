'use client';

import { createContext, useState } from 'react';

interface ModalSheetContextProps {
  title: string;
  setTitle: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  databaseName: string;
  setDatabaseName: (value: string) => void;
}

export const ModalSheetContext = createContext<ModalSheetContextProps>({
  title: '',
  setTitle: () => {},
  isOpen: false,
  setIsOpen: () => {},
  databaseName: '',
  setDatabaseName: () => {},
});

export const ModalSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [databaseName, setDatabaseName] = useState('');

  return (
    <ModalSheetContext.Provider
      value={{ isOpen, setIsOpen, title, setTitle, databaseName, setDatabaseName }}
    >
      {children}
    </ModalSheetContext.Provider>
  );
};
