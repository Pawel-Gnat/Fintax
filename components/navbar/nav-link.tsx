import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { IconType } from 'react-icons';

interface NavLinkProps {
  href: string;
  label: string;
  icon?: IconType;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, label }) => {
  const currentRoute = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        currentRoute !== href && 'opacity-70 hover:opacity-100',
        'text-x relative flex items-center gap-2 p-2 text-primary transition-opacity',
      )}
    >
      {Icon && <Icon size={20} />}
      {label}
    </Link>
  );
};

export default NavLink;
