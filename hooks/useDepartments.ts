import { useQuery } from '@tanstack/react-query';

import getAllDepartments from '@/actions/getAllDepartments';

export default function useDepartments() {
  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    error: departmentsError,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await getAllDepartments(),
  });

  return {
    departments,
    isDepartmentsLoading,
    departmentsError,
  };
}
