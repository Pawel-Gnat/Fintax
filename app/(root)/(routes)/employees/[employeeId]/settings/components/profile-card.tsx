import useEmployee from '@/hooks/useEmployee';

import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import ProfileForm from './profile-form';

interface ProfileCardProps {
  id: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ id }) => {
  const { employee, isEmployeeLoading } = useEmployee(id);

  if (isEmployeeLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {employee && (
        <Card title="Employee informations">
          <ProfileForm data={employee} />
        </Card>
      )}
    </>
  );
};
