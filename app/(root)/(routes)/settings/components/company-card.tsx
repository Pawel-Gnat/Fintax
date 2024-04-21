'use client';

import useCompany from '@/hooks/useCompany';
import useUser from '@/hooks/useUser';

import Card from '@/components/card/card';
import { Skeleton } from '@/components/ui/skeleton';

import CompanyForm from './company-form';

export const CompanyCard = () => {
  const { company, isCompanyLoading } = useCompany();
  const { user } = useUser();

  if (isCompanyLoading) {
    return <Skeleton className="h-[200px] w-full rounded-lg" />;
  }

  return (
    <>
      {company && (
        <Card title="Company informations">
          {user?.role === 'admin' ? (
            <CompanyForm data={company} />
          ) : (
            <p>{company.name}</p>
          )}
        </Card>
      )}
    </>
  );
};
