import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import ProfileForm from './profile-form';

import { User } from '@prisma/client';

interface ProfileCardProps {
  user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  if (!user) {
    <Skeleton className="h-[700px] w-full rounded-lg" />;
  }

  return (
    <Card title="Profile informations">
      <ProfileForm data={user} />
    </Card>
  );
};
