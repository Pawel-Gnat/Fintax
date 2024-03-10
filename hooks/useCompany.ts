import { useQuery } from '@tanstack/react-query';

import getCurrentCompany from '@/actions/getCurrentCompany';

export default function useCompany() {
  const {
    data: company,
    isLoading: isCompanyLoading,
    error: companyError,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await getCurrentCompany(),
  });

  return {
    company,
    isCompanyLoading,
    companyError,
  };
}
