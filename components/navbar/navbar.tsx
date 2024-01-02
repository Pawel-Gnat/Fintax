'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { LuBarChartBig, LuAtom, LuFolderKanban, LuUsers2 } from 'react-icons/lu';

import Logo from '@/public/logo.svg';
import NavLink from './nav-link';
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';

import { User } from '@prisma/client';

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
    <nav className="container flex items-center gap-4 p-4">
      <Link href="/" className="hidden p-2 lg:block">
        <Image
          src={Logo}
          alt=""
          aria-hidden="true"
          width={30}
          height={30}
          className="min-w-[30px]"
        />
      </Link>

      <ul className="ml-4 flex gap-4 md:ml-8">
        {PAGES.map((page) => (
          <li key={page.label}>
            <NavLink href={page.src} label={page.label} icon={page.icon} />
          </li>
        ))}
      </ul>

      <div className="ml-auto">
        <DropdownMenu
          image={image}
          name={name}
          surname={surname}
          actions={[settings, logOut]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
