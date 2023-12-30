import { LuUsers2, LuLandmark, LuMapPin, LuGlobe2 } from 'react-icons/lu';

import { Alert as AlertUI, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertProps {
  title: string;
  description: string;
  variant: 'employee' | 'location' | 'settlement' | 'department';
}

const Alert: React.FC<AlertProps> = ({ title, description, variant }) => {
  const AlertIcon = (variant: string) => {
    if (variant === 'employee') {
      return <LuUsers2 className="h-4 w-4" />;
    }

    if (variant === 'settlement') {
      return <LuGlobe2 className="h-4 w-4" />;
    }

    if (variant === 'location') {
      return <LuMapPin className="h-4 w-4" />;
    }

    if (variant === 'department') {
      return <LuLandmark className="h-4 w-4" />;
    }
  };

  return (
    <AlertUI variant="default">
      {AlertIcon(variant)}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertUI>
  );
};

export default Alert;
