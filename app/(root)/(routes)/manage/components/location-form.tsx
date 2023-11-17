'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { useToast } from '@/components/ui/use-toast';
import SheetForm from '@/components/sheet-form/sheet-form';

const formSchema = z.object({
  location: z.string().trim().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});

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
    <SheetForm
      form={form}
      inputs={['location']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
    />
  );
};

export default LocationForm;
