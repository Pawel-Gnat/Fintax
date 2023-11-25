'use client';

import { useContext, useEffect } from 'react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import {
  Table as TableUI,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
} from '@/components/ui/table';

import { Department, Location } from '@prisma/client';
import { SafeEmployee, SafeSettlement } from '@/types/types';
interface ManageTableProps {
  title: string;
  data: SafeEmployee[] | Department[] | Location[] | SafeSettlement[];
  headers: string[];
  rows: any;
  employees?: SafeEmployee[];
  settlements?: SafeSettlement[];
  locations?: Location[];
  departments?: Department[];
}

const Table: React.FC<ManageTableProps> = ({
  title,
  data,
  headers,
  rows,
  employees,
  settlements,
  locations,
  departments,
}) => {
  const { setLocations, setDepartments, setEmployees, setSettlements } =
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
    if (settlements) setSettlements(settlements);
  }, [settlements, setSettlements]);

  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  return (
    <TableUI>
      <TableHeader>
        <TableRow>
          {headers.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{rows}</TableBody>
    </TableUI>
  );
};

export default Table;
