import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface NoticeContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const NoticeContainer: React.FC<NoticeContainerProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]}) relative rounded-lg bg-secondary p-8',
        className,
      )}
    >
      <p className="text-xl">{title}</p>
      <div>{children}</div>
    </div>
  );
};

export default NoticeContainer;
