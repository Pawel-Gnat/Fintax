import { ReactNode } from 'react';

const ContentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-between gap-5 rounded-lg bg-secondary p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
};

export default ContentWrapper;
