import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import EmployeeForm from './employee-form';

interface EmployeeSheetProps {
  trigger: string;
}

const EmployeeSheet: React.FC<EmployeeSheetProps> = ({ trigger }) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new employee</SheetTitle>
          <SheetDescription>
            Create a new employee with the following information to create a new access
            and add it to the general list of employees.
          </SheetDescription>
        </SheetHeader>
        <EmployeeForm />
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
