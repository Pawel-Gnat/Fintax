import { ReactNode } from 'react';

import { IconType } from 'react-icons';

interface NoticeContainerProps {
  title: string;
  children: ReactNode;
}

const NoticeContainer: React.FC<NoticeContainerProps> = ({ title, children }) => {
  return (
    <div className="relative rounded-lg bg-secondary p-10">
      <p className="text-xl">{title}</p>
      <div className="h-[50rem]">{children}</div>
    </div>
  );
};

export default NoticeContainer;
