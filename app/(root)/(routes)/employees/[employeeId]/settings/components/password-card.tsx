'use client';

import useEmployee from '@/hooks/useEmployee';

import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import PasswordForm from './password-form';

interface PasswordCardProps {
  id: string;
}

export const PasswordCard: React.FC<PasswordCardProps> = ({ id }) => {
  const { employee, isEmployeeLoading } = useEmployee(id);

  if (isEmployeeLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {employee && (
        <Card title="Employee password">
          <PasswordForm data={employee} />
        </Card>
      )}
    </>
  );
};
