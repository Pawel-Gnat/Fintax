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
        currentRoute !== href && 'hover:text-secondary',
        'relative flex items-center gap-2 p-2 text-primary transition-colors lg:p-4',
        currentRoute === href && 'text-tetriary',
      )}
    >
      {Icon && <Icon size={20} />}
      <span className="hidden md:block">{label}</span>
    </Link>
  );
};

export default NavLink;
