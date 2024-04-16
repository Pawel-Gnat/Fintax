'use client';

import useClients from '@/hooks/useClients';
import useEmployees from '@/hooks/useEmployees';

import Card from '@/components/card/card';
import DataTable from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './client-cols';

import { User } from '@prisma/client';

interface ClientsTableProps {
  user: User;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ user }) => {
  const { clients, isClientsLoading } = useClients();
  const { employees, isEmployeesLoading } = useEmployees();
  const cardAction = user.role === 'admin' ? 'setClient' : undefined;

  if (isClientsLoading || isEmployeesLoading) {
    return <Skeleton className="mt-10 h-[400px] w-full rounded-lg" />;
  }

  return (
    <>
      {clients && employees && (
        <Card title="Clients" action={cardAction} className="mt-10">
          <DataTable
            title="Clients"
            columns={columns}
            data={clients}
            employees={employees}
            clients={clients}
            user={user}
          />
        </Card>
      )}
    </>
  );
};
