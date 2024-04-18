'use client';

import useCompany from '@/hooks/useCompany';

import Card from '@/components/card/card';

import CompanyForm from './company-form';
import { Skeleton } from '@/components/ui/skeleton';

export const CompanyCard = () => {
  const { company, isCompanyLoading } = useCompany();

  if (isCompanyLoading) {
    return <Skeleton className="h-[200px] w-full rounded-lg" />;
  }

  return (
    <>
      {company && (
        <Card title="Company informations">
          <CompanyForm data={company} />
        </Card>
      )}
    </>
  );
};
