import { ReactNode } from 'react';

const ContentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-row justify-between gap-5 rounded-lg bg-secondary p-10">
      {children}
    </div>
  );
};

export default ContentWrapper;
