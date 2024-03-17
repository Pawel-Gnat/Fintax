'use client';

import Link from 'next/link';

import useCompany from '@/hooks/useCompany';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';

import { User } from '@prisma/client';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { company } = useCompany();

  const settings = (
    <Link href="/settings" className="w-full">
      Settings
    </Link>
  );

  return (
    <header className="sticky top-0 z-10 ml-1 flex items-center justify-between rounded-bl-lg bg-background p-6">
      <h1 className="text-3xl font-bold">{company?.name}</h1>
      <DropdownMenu user={user} actions={[settings]} />
    </header>
  );
};

export default Header;
