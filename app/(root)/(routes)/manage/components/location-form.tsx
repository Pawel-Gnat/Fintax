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
  const {
    setIsOpen,
    elementId,
    elementName,
    isEditing,
    isLoading,
    setIsLoading,
    setIsEditing,
  } = useContext(ModalSheetContext);
  const { toast } = useToast();
  const router = useRouter();

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

    const requestMethod = isEditing ? axios.patch : axios.post;
    const requestParams = isEditing ? elementId : formData.location;

    requestMethod(`/api/locations/${requestParams}`, formData)
      .then(() => {
        toast({
          description: isEditing
            ? 'Location has been updated.'
            : 'New location has been added.',
        });
        setIsOpen(false);
        setIsEditing(false);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: 'destructive',
          description: error.response.data.error,
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
