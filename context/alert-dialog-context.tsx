'use client';

import { createContext, useState } from 'react';

interface AlertDialogContextProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (value: boolean) => void;
  alertElementId: string;
  setAlertElementId: (value: string) => void;
  alertElementName: string;
  setAlertElementName: (value: string) => void;
  alertDatabaseName: string;
  setAlertDatabaseName: (value: string) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextProps>({
  isAlertOpen: false,
  setIsAlertOpen: () => {},
  alertElementId: '',
  setAlertElementId: () => {},
  alertElementName: '',
  setAlertElementName: () => {},
  alertDatabaseName: '',
  setAlertDatabaseName: () => {},
});

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertElementId, setAlertElementId] = useState('');
  const [alertElementName, setAlertElementName] = useState('');
  const [alertDatabaseName, setAlertDatabaseName] = useState('');

  return (
    <AlertDialogContext.Provider
      value={{
        isAlertOpen,
        setIsAlertOpen,
        alertDatabaseName,
        setAlertDatabaseName,
        alertElementId,
        setAlertElementId,
        alertElementName,
        setAlertElementName,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};
