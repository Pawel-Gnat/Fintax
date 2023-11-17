'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CSSProperties, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { useToast } from '@/components/ui/use-toast';
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
  const router = useRouter();
  const { setIsOpen, elementName, isEditing, isLoading, setIsLoading } =
    useContext(ModalSheetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: isEditing ? elementName : '',
    },
  });

  const buttonText = () => {
    return isEditing ? 'Edit' : 'Add';
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      location: capitalizeFirstLetter(values.location),
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .post(`/api/locations/${formData.location}`, formData)
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
        <Button type="submit" className={isLoading ? 'w-full opacity-60' : 'w-full'}>
          {isLoading ? <ClipLoader size={25} cssOverride={override} /> : buttonText()}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
