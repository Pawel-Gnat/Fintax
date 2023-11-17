'use client';

import { createContext, useState } from 'react';

interface AlertDialogContextProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (value: boolean) => void;
  elementName: string;
  setElementName: (value: string) => void;
  databaseName: string;
  setDatabaseName: (value: string) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextProps>({
  isAlertOpen: false,
  setIsAlertOpen: () => {},
  elementName: '',
  setElementName: () => {},
  databaseName: '',
  setDatabaseName: () => {},
});

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [elementName, setElementName] = useState('');
  const [databaseName, setDatabaseName] = useState('');

  return (
    <AlertDialogContext.Provider
      value={{
        isAlertOpen,
        setIsAlertOpen,
        databaseName,
        setDatabaseName,
        elementName,
        setElementName,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};
