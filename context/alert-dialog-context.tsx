'use client';

import { createContext, useState } from 'react';

interface AlertDialogContextProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  alertElementId: string;
  setAlertElementId: (value: string) => void;
  alertElementName: string;
  setAlertElementName: (value: string) => void;
  alertDatabaseRoute: string;
  setAlertDatabaseRoute: (value: string) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextProps>({
  isAlertOpen: false,
  setIsAlertOpen: () => {},
  isLoading: false,
  setIsLoading: () => {},
  alertElementId: '',
  setAlertElementId: () => {},
  alertElementName: '',
  setAlertElementName: () => {},
  alertDatabaseRoute: '',
  setAlertDatabaseRoute: () => {},
});

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertElementId, setAlertElementId] = useState('');
  const [alertElementName, setAlertElementName] = useState('');
  const [alertDatabaseRoute, setAlertDatabaseRoute] = useState('');

  return (
    <AlertDialogContext.Provider
      value={{
        isAlertOpen,
        setIsAlertOpen,
        isLoading,
        setIsLoading,
        alertDatabaseRoute,
        setAlertDatabaseRoute,
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
