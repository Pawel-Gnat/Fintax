'use client';

import useLocations from '@/hooks/useLocations';

import Card from '@/components/card/card';
import Table from '@/components/table/table';
import { Skeleton } from '@/components/ui/skeleton';

import LocationRows from './location-rows';

const Locations = () => {
  const { locations, isLocationsLoading } = useLocations();

  if (isLocationsLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {locations && locations.length > 0 && (
        <Card title="Locations" action="setLocation" className="w-full">
          <Table
            title="Locations"
            data={locations}
            headers={['Location']}
            rows={<LocationRows data={locations} />}
          />
        </Card>
      )}
    </>
  );
};

export default Locations;
