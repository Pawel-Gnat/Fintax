'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import {
  LuBarChartBig,
  LuAtom,
  LuFolderKanban,
  LuUsers2,
  LuLogOut,
} from 'react-icons/lu';
import Logo from '@/public/logo.svg';

import { Button } from '@/components/ui/button';

import NavLink from './nav-link';

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

const Navbar = () => {
  return (
    <nav className="sticky flex h-screen flex-col items-center gap-4 p-6">
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

      <ul className="mt-16 flex flex-col gap-4 text-left">
        {PAGES.map((page) => (
          <li key={page.label}>
            <NavLink href={page.src} label={page.label} icon={page.icon} />
          </li>
        ))}
      </ul>

      <Button className="mt-auto w-full" onClick={() => signOut()} size="lg">
        <LuLogOut size={20} /> Log out
      </Button>
    </nav>
  );
};

export default Navbar;
