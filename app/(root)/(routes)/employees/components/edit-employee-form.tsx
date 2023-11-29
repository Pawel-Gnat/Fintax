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
  surname: z.string().trim().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  email: z.string().trim().email(),
});

const EditEmployeeForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    setIsOpen,
    elementId,
    isEditing,
    isLoading,
    setIsLoading,
    employees,
    setIsEditing,
  } = useContext(ModalSheetContext);

  const currentEmployee = employees.find((employee) => employee.id === elementId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEditing && currentEmployee ? currentEmployee.name : '',
      surname: isEditing && currentEmployee ? currentEmployee.surname : '',
      email: isEditing && currentEmployee ? currentEmployee.email : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
      surname: capitalizeFirstLetter(values.surname),
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/employees/edit/${elementId}`, formData)
      .then(() => {
        toast({
          description: 'Employee has been updated.',
        });
        setIsOpen(false);
        setIsEditing(false);
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
      inputs={['name', 'surname', 'email']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
    />
  );
};

export default EditEmployeeForm;
