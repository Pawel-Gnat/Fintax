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
  department: z.string(),
  location: z.string(),
});

const AssignEmployeeForm = () => {
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
      department: isEditing && currentEmployee ? currentEmployee.department?.name : '',
      location: isEditing && currentEmployee ? currentEmployee.location?.name : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      department: capitalizeFirstLetter(values.department),
      location: capitalizeFirstLetter(values.location),
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/employees/assign/${elementId}`, formData)
      .then(() => {
        toast({
          description: 'Employee has been assigned.',
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
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
      location
      department
    />
  );
};

export default AssignEmployeeForm;
