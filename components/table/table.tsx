'use client';

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
}

const Table: React.FC<ManageTableProps> = ({ title, data, headers, rows }) => {
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
            <TableHead key={column} className="font-bold">
              {column}
            </TableHead>
          ))}
          <TableHead className="text-right font-bold">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{rows}</TableBody>
    </TableUI>
  );
};

export default Table;
