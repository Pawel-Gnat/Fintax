import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface ManageTableProps {
  title: string;
  data: string[];
}

const ManageTable: React.FC<ManageTableProps> = ({ title, data }) => {
  if (data.length === 0) {
    return (
      <p className="text-center">
        Your list is currently empty. Please add new {title.toLowerCase()}.
      </p>
    );
  }

  return (
    <Table>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item}>
            <TableCell>{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
