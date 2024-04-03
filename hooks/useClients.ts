import { useQuery } from '@tanstack/react-query';

import getAllClients from '@/actions/getAllClients';

export default function useClients() {
  const {
    data: clients,
    isLoading: isClientsLoading,
    error: clientsError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => await getAllClients(),
  });

  return {
    clients,
    isClientsLoading,
    clientsError,
  };
}
