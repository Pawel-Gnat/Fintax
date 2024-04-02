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
  department: z.string().trim().min(2, {
    message: 'Department must be at least 2 characters.',
  }),
});

const DepartmentForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    setIsOpen,
    elementId,
    elementName,
    isEditing,
    isLoading,
    setIsLoading,
    setIsEditing,
  } = useContext(ModalSheetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: isEditing ? elementName : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      department: capitalizeFirstLetter(values.department),
    };

    if (isLoading) return;

    setIsLoading(true);

    const requestMethod = isEditing ? axios.patch : axios.post;
    const requestParams = isEditing ? elementId : formData.department;

    requestMethod(`/api/departments/${requestParams}`, formData)
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
      inputs={['department']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
    />
  );
};

export default DepartmentForm;
