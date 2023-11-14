import {
  DropdownMenu as DropdownMenuUI,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownMenuProps {
  avatar?: JSX.Element;
  trigger?: string;
  icon?: React.ReactNode;
  actions: JSX.Element[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  avatar,
  trigger,
  icon,
  actions,
}) => {
  return (
    <DropdownMenuUI>
      {avatar}
      <DropdownMenuTrigger className="p-2 opacity-60 transition-opacity hover:opacity-100">
        {trigger}
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
