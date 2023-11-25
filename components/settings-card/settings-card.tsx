import CompanyForm from '@/app/(root)/(routes)/settings/components/company-form';
import PasswordForm from '@/app/(root)/(routes)/settings/components/password-form';
import ProfileForm from '@/app/(root)/(routes)/settings/components/profile-form';
import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Company, User } from '@prisma/client';

interface SettingsCardProps {
  title: string;
  databaseName: string;
  data: Company | User;
  password?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  databaseName,
  data,
  password,
}) => {
  const getForm = (databaseName: string) => {
    if (databaseName === 'company') {
      return <CompanyForm data={data as Company} />;
    }

    if (databaseName === 'user' && !password) {
      return <ProfileForm data={data as User} />;
    }

    if (databaseName === 'user' && password) {
      return <PasswordForm data={data as User} />;
    }
  };

  return (
    <CardUI className="h-max">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{getForm(databaseName)}</CardContent>
    </CardUI>
  );
};

export default SettingsCard;
