'use client';

import { createContext, useState } from 'react';

interface ModalSheetContextProps {
  title: string;
  setIsTitle: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const ModalSheetContext = createContext<ModalSheetContextProps>({
  title: '',
  setIsTitle: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export const ModalSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setIsTitle] = useState('');

  return (
    <ModalSheetContext.Provider value={{ isOpen, setIsOpen, title, setIsTitle }}>
      {children}
    </ModalSheetContext.Provider>
  );
};
