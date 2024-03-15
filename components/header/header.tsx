'use client';

import Link from 'next/link';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';

import { User } from '@prisma/client';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const settings = (
    <Link href="/settings" className="w-full">
      Settings
    </Link>
  );

  return (
    <header className="sticky top-0 z-10 flex justify-end border-b-[1px] bg-background p-6 shadow-md">
      <DropdownMenu user={user} actions={[settings]} />
    </header>
  );
};

export default Header;
