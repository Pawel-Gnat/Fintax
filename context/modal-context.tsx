// import { createContext, useState } from 'react';

// interface ModalContextProps {
//   isOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
// }

// interface ModalProviderProps {
//   children: React.ReactNode;
// }

// const ModalContext = createContext<ModalContextProps>({
//   isOpen: false,
//   openModal: () => {},
//   closeModal: () => {},
// });

// export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };
