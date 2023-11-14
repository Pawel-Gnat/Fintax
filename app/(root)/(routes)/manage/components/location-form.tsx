'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CSSProperties, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
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

interface LocationFormProps {
  setIsOpen: (value: boolean) => void;
}

const formSchema = z.object({
  location: z.string().trim().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const LocationForm: React.FC<LocationFormProps> = ({ setIsOpen }) => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
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

    if (loading) return;

    setIsLoading(true);

    axios
      .post('/api/locations', formData)
      .then(() => {
        toast({
          description: 'New location has been added.',
        });
        setIsOpen(false);
        router.refresh();
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        <Button type="submit" className={loading ? 'w-full opacity-60' : 'w-full'}>
          {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Add'}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
