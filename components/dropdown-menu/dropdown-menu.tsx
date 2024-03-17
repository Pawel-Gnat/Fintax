import { cn } from '@/lib/utils';

import {
  DropdownMenu as DropdownMenuUI,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/avatar/avatar';

import { User } from '@prisma/client';

interface DropdownMenuProps {
  user?: User;
  icon?: React.ReactNode;
  actions: JSX.Element[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ user, icon, actions }) => {
  return (
    <DropdownMenuUI>
      <DropdownMenuTrigger
        className={cn(
          'text-tetriary flex items-center gap-4 p-2 transition-colors hover:text-accent/30',
          user?.name && 'text-primary',
        )}
      >
        {user?.name && user?.surname && (
          <Avatar image={user?.image} name={user?.name} surname={user?.surname} />
        )}
        <div className="text-left">
          <span className="hidden font-bold md:block">
            {user?.name && user?.surname && `${user?.name} ${user?.surname}`}
          </span>
          <span className="hidden md:block">{user?.email && `${user?.email}`}</span>
        </div>
        {icon}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((item, index) => (
          <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuUI>
  );
};

export default DropdownMenu;
