'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import axios from 'axios';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import findById from '@/utils/findById';

import { useToast } from '@/components/ui/use-toast';
import SheetForm from '@/components/sheet-form/sheet-form';

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  location: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  employee: z.string(),
});

const ClientForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    setIsOpen,
    elementId,
    isEditing,
    isLoading,
    setIsLoading,
    clients,
    setIsEditing,
  } = useContext(ModalSheetContext);

  const currentClient = findById(clients, elementId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEditing && currentClient ? currentClient.name : '',
      location: isEditing && currentClient ? currentClient.location : '',
      employee:
        isEditing && currentClient
          ? `${currentClient.employee?.name} ${currentClient.employee?.surname}`
          : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      name: capitalizeFirstLetter(values.name),
      location: capitalizeFirstLetter(values.location),
      employee: {
        name: values.employee && capitalizeFirstLetter(values.employee.split(' ')[0]),
        surname: values.employee && capitalizeFirstLetter(values.employee.split(' ')[1]),
      },
    };

    if (isLoading) return;

    setIsLoading(true);

    const requestMethod = isEditing ? axios.patch : axios.post;
    const requestParams = isEditing ? elementId : formData.name;

    requestMethod(`/api/clients/${requestParams}`, formData)
      .then((response) => {
        toast({
          description: response.data,
        });
        setIsOpen(false);
        setIsEditing(false);
        router.refresh();
      })
      .catch((error) => {
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
      inputs={['name', 'location']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
      employee
    />
  );
};

export default ClientForm;
