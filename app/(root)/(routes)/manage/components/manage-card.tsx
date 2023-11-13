import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ManageTable from './manage-table';
import ModalSheet from '@/components/modal/modal-sheet';

interface ManageCardProps {
  title: string;
  data: string[];
}

const ManageCard: React.FC<ManageCardProps> = ({ title, data }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <ModalSheet title={title} />
      </CardHeader>
      <CardContent>
        <ManageTable title={title} data={data} />
      </CardContent>
    </Card>
  );
};

export default ManageCard;
