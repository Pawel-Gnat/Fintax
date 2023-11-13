import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Employee } from '@prisma/client';

interface EmployeesTableProps {
  employees: (Employee & { companies: number })[];
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees }) => {
  if (employees.length === 0) {
    return (
      <p className="text-center">Your list is currently empty. Please add employees.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Managed companies</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              {employee.name} {employee.surname}
            </TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.location}</TableCell>
            <TableCell className="text-right">{employee.companies}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;
