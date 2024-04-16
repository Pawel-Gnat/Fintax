'use client';

import useLocations from '@/hooks/useLocations';

import Card from '@/components/card/card';
import Table from '@/components/table/table';
import { Skeleton } from '@/components/ui/skeleton';

import LocationRows from './location-rows';

import { User } from '@prisma/client';

interface LocationsProps {
  user: User;
}

const Locations: React.FC<LocationsProps> = ({ user }) => {
  const { locations, isLocationsLoading } = useLocations();
  const cardAction = user.role === 'admin' ? 'setLocation' : undefined;

  if (isLocationsLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />;
  }

  return (
    <>
      {locations && (
        <Card title="Locations" action={cardAction} className="w-full">
          <Table
            title="Locations"
            data={locations}
            headers={['Location']}
            rows={<LocationRows data={locations} user={user}/>}
          />
        </Card>
      )}
    </>
  );
};

export default Locations;
