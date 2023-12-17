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
      {name && surname && <Avatar image={image} name={name} surname={surname} />}
      <DropdownMenuTrigger
        className={cn(
          'p-2 text-tetriary transition-colors hover:text-secondary',
          name && 'text-primary',
        )}
      >
        {name && surname && `${name} ${surname}`}
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
