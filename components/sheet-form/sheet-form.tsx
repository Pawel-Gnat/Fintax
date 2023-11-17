import { UseFormReturn } from 'react-hook-form';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SheetFormProps {
  form: UseFormReturn<any>;
  inputs: string[];
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const SheetForm: React.FC<SheetFormProps> = ({
  form,
  inputs,
  isEditing,
  isLoading,
  onSubmit,
}) => {
  const buttonText = () => {
    return isEditing ? 'Edit' : 'Add';
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {inputs.map((input) => (
          <FormField
            key={input}
            control={form.control}
            name={input}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{capitalizeFirstLetter(input)}</FormLabel>
                <FormControl>
                  <Input placeholder={capitalizeFirstLetter(input)} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className={isLoading ? 'w-full opacity-60' : 'w-full'}>
          {isLoading ? <ClipLoader size={25} cssOverride={override} /> : buttonText()}
        </Button>
      </form>
    </Form>
  );
};

export default SheetForm;
