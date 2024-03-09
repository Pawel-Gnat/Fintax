import { useQuery } from '@tanstack/react-query';

import getAllLocations from '@/actions/getAllLocations';

export default function useLocations() {
  const {
    data: locations,
    isLoading: isLocationsLoading,
    error: locationsError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => await getAllLocations(),
  });

  return {
    locations,
    isLocationsLoading,
    locationsError,
  };
}
