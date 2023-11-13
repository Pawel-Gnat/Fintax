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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  location: z.string().trim().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const LocationForm = () => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      location: capitalizeFirstLetter(values.location),
    };

    console.log(formData);

    // setIsLoading(true);

    // axios
    //   .post('/api/register', formData)
    //   .then(() => {
    //     toast({
    //       description: 'New employee has been created.',
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
        <Button type="submit" className="w-full">
          {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Add'}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
