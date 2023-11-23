import CompanyForm from '@/app/(root)/(routes)/settings/components/company-form';
import ProfileForm from '@/app/(root)/(routes)/settings/components/profile-form';
import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { SafeEmployee } from '@/types/types';
import { Company, User } from '@prisma/client';

interface SettingsCardProps {
  title: string;
  databaseName: string;
  data: Company | User | SafeEmployee;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, databaseName, data }) => {
  const getForm = (databaseName: string) => {
    if (databaseName === 'company') {
      return <CompanyForm data={data as Company} />;
    }

    if (databaseName === 'user') {
      return <ProfileForm data={data as User} />;
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
