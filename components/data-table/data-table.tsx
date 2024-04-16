'use client';

import { useContext, useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SafeClient, SafeEmployee } from '@/types/types';
import { Department, Location, User } from '@prisma/client';

interface DataTableProps<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  employees?: SafeEmployee[];
  clients?: SafeClient[];
  locations?: Location[];
  departments?: Department[];
  user: User;
}

const DataTable = <TData, TValue>({
  title,
  columns,
  data,
  employees,
  clients,
  locations,
  departments,
  user,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { setLocations, setDepartments, setEmployees, setClients } =
    useContext(ModalSheetContext);

  useEffect(() => {
    if (locations) setLocations(locations);
  }, [locations, setLocations]);

  useEffect(() => {
    if (departments) setDepartments(departments);
  }, [departments, setDepartments]);

  useEffect(() => {
    if (employees) setEmployees(employees);
  }, [employees, setEmployees]);

  useEffect(() => {
    if (clients) setClients(clients);
  }, [clients, setClients]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  const getFilterInput = (title: string) => {
    if (title === 'Employees') {
      return (
        <Input
          placeholder="Filter employee..."
          value={(table.getColumn('surname')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('surname')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      );
    }

    if (title === 'Clients') {
      return (
        <Input
          placeholder="Filter clients..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      );
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">{getFilterInput(title)}</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  if (index === headerGroup.headers.length - 1 && user.role !== 'admin')
                    return (
                      <TableHead
                        key={header.id}
                        className="first-of-type:align-left text-center last-of-type:text-right"
                      ></TableHead>
                    );

                  return (
                    <TableHead
                      key={header.id}
                      className="first-of-type:align-left text-center last-of-type:text-right"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell, index) => {
                  if (index === row.getVisibleCells().length - 1 && user.role !== 'admin')
                    return (
                      <TableCell
                        key={cell.id}
                        className="text-center first-of-type:text-left last-of-type:text-right"
                      ></TableCell>
                    );

                  return (
                    <TableCell
                      key={cell.id}
                      className="text-center first-of-type:text-left last-of-type:text-right"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.length > 10 ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;
