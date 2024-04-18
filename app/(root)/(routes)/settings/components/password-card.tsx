import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import PasswordForm from './password-form';

import { User } from '@prisma/client';

interface PasswordCardProps {
  user: User;
}

export const PasswordCard: React.FC<PasswordCardProps> = ({ user }) => {
  if (!user) {
    <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <Card title="User password">
      <PasswordForm data={user} />
    </Card>
  );
};
