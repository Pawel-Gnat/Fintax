'use client';

import useClients from '@/hooks/useClients';
import useEmployees from '@/hooks/useEmployees';

import Card from '@/components/card/card';
import DataTable from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './components/client-cols';

const ClientsPage = () => {
  const { clients, isClientsLoading } = useClients();
  const { employees, isEmployeesLoading } = useEmployees();

  if (isClientsLoading || isEmployeesLoading) {
    return <Skeleton className="mt-10 h-[400px] w-full rounded-lg" />;
  }

  return (
    <>
      {clients && employees && (
        <Card title="Clients" action="setClient" className="mt-10">
          <DataTable
            title="Clients"
            columns={columns}
            data={clients}
            employees={employees}
            clients={clients}
          />
        </Card>
      )}
    </>
  );
};

export default ClientsPage;
