'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CSSProperties, useState } from 'react';
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

interface EmployeeFormProps {}

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  surname: z.string().trim().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  email: z.string().trim().email(),
  location: z.string(),
  password: z.string().trim().min(2, {
    message: 'Password must be at least 4 characters.',
  }),
});

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const EmployeeForm: React.FC<EmployeeFormProps> = () => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      location: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
      surname: capitalizeFirstLetter(values.surname),
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
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={loading ? 'w-full opacity-60' : 'w-full'}>
          {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Add'}
        </Button>
      </form>
    </Form>
  );
};

export default EmployeeForm;
