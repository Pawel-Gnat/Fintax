'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import axios from 'axios';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

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

const SettlementForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    setIsOpen,
    elementId,
    isEditing,
    isLoading,
    setIsLoading,
    setElementName,
    setElementId,
    setIsEditing,
    employees,
  } = useContext(ModalSheetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      employee: '',
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

    requestMethod(`/api/settlements/${requestParams}`, formData)
      .then(() => {
        toast({
          description: isEditing
            ? 'Settlement has been updated.'
            : 'New settlement has been added.',
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
        setIsEditing(false);
        setElementId('');
        setElementName('');
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

export default SettlementForm;
