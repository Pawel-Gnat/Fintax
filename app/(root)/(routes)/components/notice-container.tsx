import { ReactNode } from 'react';

interface NoticeContainerProps {
  title: string;
  children: ReactNode;
}

const NoticeContainer: React.FC<NoticeContainerProps> = ({ title, children }) => {
  return (
    <div className="relative rounded-lg bg-secondary p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <p className="text-xl">{title}</p>
      <div>{children}</div>
    </div>
  );
};

export default NoticeContainer;
