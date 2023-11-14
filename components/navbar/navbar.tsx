'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { LuBarChartBig, LuAtom, LuFolderKanban, LuUsers2 } from 'react-icons/lu';
import { User } from '@prisma/client';

import Logo from '@/public/logo.svg';
import NavLink from './nav-link';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {
  user: User;
}

const PAGES = [
  { src: '/', label: 'Dashboard', icon: LuBarChartBig },
  {
    src: '/manage',
    label: 'Manage',
    icon: LuAtom,
  },
  {
    src: '/employees',
    label: 'Employees',
    icon: LuUsers2,
  },
  {
    src: '/settlements',
    label: 'Settlements',
    icon: LuFolderKanban,
  },
];

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { name, surname, image } = user;

  const transformUserDetails = () => {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  };

  const avatar = (
    <Avatar>
      {image && <AvatarImage src={image} alt="" aria-hidden="true" />}
      <AvatarFallback>{transformUserDetails()}</AvatarFallback>
    </Avatar>
  );

  const settings = (
    <Link href="/settings" className="w-full">
      Settings
    </Link>
  );

  const logOut = (
    <button onClick={() => signOut()} className="w-full text-left">
      Log out
    </button>
  );

  return (
    <nav className="container flex items-center gap-4 p-5">
      <Image src={Logo} alt="" aria-hidden="true" width={30} height={30} />

      <ul className="ml-10 flex gap-4">
        {PAGES.map((page) => (
          <li key={page.label}>
            <NavLink href={page.src} label={page.label} icon={page.icon} />
          </li>
        ))}
      </ul>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu
          avatar={avatar}
          trigger={`${name} ${surname}`}
          actions={[settings, logOut]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
