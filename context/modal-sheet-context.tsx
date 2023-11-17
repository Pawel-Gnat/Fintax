'use client';

import { createContext, useState } from 'react';

interface ModalSheetContextProps {
  title: string;
  setTitle: (value: string) => void;
  elementName: string;
  setElementName: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  databaseName: string;
  setDatabaseName: (value: string) => void;
}

export const ModalSheetContext = createContext<ModalSheetContextProps>({
  title: '',
  setTitle: () => {},
  elementName: '',
  setElementName: () => {},
  isOpen: false,
  setIsOpen: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isEditing: false,
  setIsEditing: () => {},
  databaseName: '',
  setDatabaseName: () => {},
});

export const ModalSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [elementName, setElementName] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ModalSheetContext.Provider
      value={{
        isOpen,
        setIsOpen,
        title,
        setTitle,
        databaseName,
        setDatabaseName,
        elementName,
        setElementName,
        isEditing,
        setIsEditing,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ModalSheetContext.Provider>
  );
};
