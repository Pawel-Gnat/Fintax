import { useQuery } from '@tanstack/react-query';

import getCurrentUser from '@/actions/getCurrentUser';

export default function useUser() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getCurrentUser(),
  });

  return { user, isUserLoading, userError };
}
