'use client';

import { Department, Location } from '@prisma/client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ModalSheetContextProps {
  title: string;
  setTitle: (value: string) => void;
  elementId: string;
  setElementId: (value: string) => void;
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
  locations: Location[];
  setLocations: Dispatch<SetStateAction<Location[]>>;
  departments: Department[];
  setDepartments: Dispatch<SetStateAction<Department[]>>;
}

export const ModalSheetContext = createContext<ModalSheetContextProps>({
  title: '',
  setTitle: () => {},
  elementId: '',
  setElementId: () => {},
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
  locations: [],
  setLocations: () => {},
  departments: [],
  setDepartments: () => {},
});

export const ModalSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [elementId, setElementId] = useState('');
  const [elementName, setElementName] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  return (
    <ModalSheetContext.Provider
      value={{
        isOpen,
        setIsOpen,
        title,
        setTitle,
        databaseName,
        setDatabaseName,
        elementId,
        setElementId,
        elementName,
        setElementName,
        isEditing,
        setIsEditing,
        isLoading,
        setIsLoading,
        locations,
        setLocations,
        departments,
        setDepartments,
      }}
    >
      {children}
    </ModalSheetContext.Provider>
  );
};
