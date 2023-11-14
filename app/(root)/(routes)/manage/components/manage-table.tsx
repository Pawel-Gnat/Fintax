import { LuCircleEllipsis, LuFileEdit, LuFileMinus2 } from 'react-icons/lu';

import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
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

  const editButton = (
    <button className="flex w-full items-center justify-center gap-2">
      <LuFileEdit />
      Edit
    </button>
  );

  const deleteButton = (
    <button className="flex w-full items-center justify-center gap-2">
      <LuFileMinus2 />
      Delete
    </button>
  );

  return (
    <Table>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item}>
            <TableCell>{item}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu
                icon={<LuCircleEllipsis size={20} />}
                actions={[editButton, deleteButton]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
