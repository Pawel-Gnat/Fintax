'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { CSSProperties, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SettlementFormProps {}

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  location: z.string(),
  employeeName: z.string(),
});

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const SettlementForm: React.FC<SettlementFormProps> = () => {
  const employees: { id: number; name: string }[] = [
    // { id: 1, name: 'Pawel' },
    // { id: 2, name: 'Gaweł' },
    // { id: 3, name: 'Asia' },
    // { id: 4, name: 'Stasia' },
  ];

  const { toast } = useToast();

  const [loading, setIsLoading] = useState(false);
  const [openEmployeeController, setOpenEmployeeController] = useState(false);
  const [valueEmployeeController, setValueEmployeeController] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      employeeName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
      location: capitalizeFirstLetter(values.location),
    };

    console.log(formData);

    if (loading) return;

    // setIsLoading(true);

    // axios
    //   .post('/api/register', formData)
    //   .then(() => {
    //     toast({
    //       description: 'New employee has been added.',
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       variant: 'destructive',
    //       // description: 'Something went wrong.',
    //       description: error.message,
    //     });
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <Popover
              open={openEmployeeController}
              onOpenChange={setOpenEmployeeController}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openEmployeeController}
                  className="w-[200px] justify-between"
                >
                  {valueEmployeeController
                    ? employees.find(
                        (employee) =>
                          employee.name.toUpperCase() ===
                          valueEmployeeController.toUpperCase(),
                      )?.name
                    : 'Assign employee...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Assign employee..." />
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {employees.length > 1 &&
                      employees.map((employee) => (
                        <CommandItem
                          key={employee.id}
                          value={String(employee.name)}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            setValueEmployeeController(
                              currentValue === valueEmployeeController.toUpperCase()
                                ? ''
                                : currentValue.toUpperCase(),
                            );
                            setOpenEmployeeController(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              valueEmployeeController === employee.name
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {employee.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />

        <Button type="submit" className={loading ? 'w-full opacity-60' : 'w-full'}>
          {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Add'}
        </Button>
      </form>
    </Form>
  );
};

export default SettlementForm;
