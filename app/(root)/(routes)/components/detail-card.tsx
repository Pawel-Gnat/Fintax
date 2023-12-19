import { Card as CardUI, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { IconType } from 'react-icons';

interface CardProps {
  title: string;
  number: number | undefined;
  icon: IconType;
}

const DetailCard: React.FC<CardProps> = ({ title, number, icon: Icon }) => {
  return (
    <CardUI className="relative h-max border-none text-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-tetriary p-4">
          <Icon size={20} />
        </div>
        <CardTitle className="pt-4 text-xl font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{number ?? 0}</p>
      </CardContent>
    </CardUI>
  );
};

export default DetailCard;
