'use client';

import { createContext, useState } from 'react';

interface AlertDialogContextProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (value: boolean) => void;
  alertElementName: string;
  setAlertElementName: (value: string) => void;
  alertDatabaseName: string;
  setAlertDatabaseName: (value: string) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextProps>({
  isAlertOpen: false,
  setIsAlertOpen: () => {},
  alertElementName: '',
  setAlertElementName: () => {},
  alertDatabaseName: '',
  setAlertDatabaseName: () => {},
});

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertElementName, setAlertElementName] = useState('');
  const [alertDatabaseName, setAlertDatabaseName] = useState('');

  return (
    <AlertDialogContext.Provider
      value={{
        isAlertOpen,
        setIsAlertOpen,
        alertDatabaseName,
        setAlertDatabaseName,
        alertElementName,
        setAlertElementName,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};
