import { useQuery } from '@tanstack/react-query';

import getAllEmployees from '@/actions/getAllEmployees';

export default function useEmployees() {
  const {
    data: employees,
    isLoading: isEmployeesLoading,
    error: employeesError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => await getAllEmployees(),
  });

  return { employees, isEmployeesLoading, employeesError };
}
