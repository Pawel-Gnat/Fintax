import { useQuery } from '@tanstack/react-query';

import getCurrentEmployee from '@/actions/getCurrentEmployee';

export default function useEmployee(id: string) {
  const {
    data: employee,
    isLoading: isEmployeeLoading,
    error: employeeError,
  } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => await getCurrentEmployee(id),
  });

  return { employee, isEmployeeLoading, employeeError };
}
