import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { IconType } from 'react-icons';

interface CardProps {
  title: string;
  number: number | undefined;
  icon: IconType;
  loading: boolean;
}

const StatisticCard: React.FC<CardProps> = ({ title, number, icon: Icon, loading }) => {
  if (loading) return <Skeleton className="h-[104px] w-[240px] rounded-lg" />;

  return (
    <Card className="flex flex-row gap-4 border-none p-6 shadow-xl">
      <div className="flex w-14 min-w-[56px] items-center justify-center rounded-full bg-accent">
        <Icon size={20} />
      </div>
      <div>
        <p className="">{title}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </Card>
  );
};

export default StatisticCard;
