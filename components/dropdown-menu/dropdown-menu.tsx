import { cn } from '@/lib/utils';

import {
  DropdownMenu as DropdownMenuUI,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/avatar/avatar';

interface DropdownMenuProps {
  image?: string | null | undefined;
  name?: string;
  surname?: string;
  icon?: React.ReactNode;
  actions: JSX.Element[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  image,
  name,
  surname,
  icon,
  actions,
}) => {
  return (
    <DropdownMenuUI>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-4 p-2 text-tetriary transition-colors hover:text-secondary',
          name && 'text-primary',
        )}
      >
        {name && surname && <Avatar image={image} name={name} surname={surname} />}
        <span className="hidden md:block">{name && surname && `${name} ${surname}`}</span>
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
