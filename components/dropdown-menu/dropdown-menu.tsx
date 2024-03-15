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
  user: User;
  icon?: React.ReactNode;
  actions: JSX.Element[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ user, icon, actions }) => {
  const { name, surname, email, image } = user;

  return (
    <DropdownMenuUI>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-4 p-2 text-tetriary transition-colors hover:text-secondary',
          name && 'text-primary',
        )}
      >
        {name && surname && <Avatar image={image} name={name} surname={surname} />}
        <div className="text-left">
          <span className="hidden font-bold md:block">
            {name && surname && `${name} ${surname}`}
          </span>
          <span className="hidden md:block">{email && `${email}`}</span>
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
