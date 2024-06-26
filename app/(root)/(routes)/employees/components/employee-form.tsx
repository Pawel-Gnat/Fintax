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
  surname: z.string().trim().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  email: z.string().trim().email(),
  password: z.string().trim().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
  department: z.string(),
  location: z.string(),
});

const EmployeeForm = () => {
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

  const currentEmployee = findById(employees, elementId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEditing && currentEmployee ? currentEmployee.name : '',
      surname: isEditing && currentEmployee ? currentEmployee.surname : '',
      email: isEditing && currentEmployee ? currentEmployee.email : '',
      password: isEditing ? 'placeholder' : '',
      // placeholder is added to password while isEditing to pass the formSchema requirements //
      department: isEditing && currentEmployee ? currentEmployee.department?.name : '',
      location: isEditing && currentEmployee ? currentEmployee.location?.name : '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
      surname: capitalizeFirstLetter(values.surname),
      department: capitalizeFirstLetter(values.department),
      location: capitalizeFirstLetter(values.location),
    };

    if (isLoading) return;

    setIsLoading(true);

    const requestMethod = isEditing ? axios.patch : axios.post;
    const requestParams = isEditing ? elementId : formData.name;

    requestMethod(`/api/employees/${requestParams}`, formData)
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
      inputs={
        !isEditing
          ? ['name', 'surname', 'email', 'password']
          : ['name', 'surname', 'email']
      }
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
      location
      department
    />
  );
};

export default EmployeeForm;
