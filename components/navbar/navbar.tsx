'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LuUsers2 } from 'react-icons/lu';
import { LuBarChartBig } from 'react-icons/lu';
import { LuFolderKanban } from 'react-icons/lu';

import Logo from '@/public/logo.svg';
import NavLink from './nav-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PAGES = [
  { src: '/', label: 'Dashboard', icon: LuBarChartBig },
  {
    src: '/settlements',
    label: 'Settlements',
    icon: LuFolderKanban,
  },
  {
    src: '/employees',
    label: 'Employees',
    icon: LuUsers2,
  },
];

const Navbar = () => {
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
        <DropdownMenu>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="" aria-hidden="true" />
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>
          <DropdownMenuTrigger className="p-2 text-background opacity-70 transition-opacity hover:opacity-100">
            Nazwa konta
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/" className="w-full">
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
