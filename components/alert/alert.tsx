import { Alert as AlertUI, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const Alert: React.FC<AlertProps> = ({ title, description, icon }) => {
  return (
    <AlertUI variant="default">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertUI>
  );
};

export default Alert;
