import { useQuery } from '@tanstack/react-query';

import getAllSettlements from '@/actions/getAllSettlements';

export default function useSettlements() {
  const {
    data: settlements,
    isLoading: isSettlementsLoading,
    error: settlementsError,
  } = useQuery({
    queryKey: ['settlements'],
    queryFn: async () => await getAllSettlements(),
  });

  return {
    settlements,
    isSettlementsLoading,
    settlementsError,
  };
}
