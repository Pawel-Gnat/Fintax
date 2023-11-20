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
  password: z.string().trim().min(2, {
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
    elementName,
    isEditing,
    isLoading,
    setIsLoading,
    setElementName,
    setElementId,
    setIsEditing,
  } = useContext(ModalSheetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      department: '',
      location: '',
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
      .then(() => {
        toast({
          description: isEditing
            ? 'Employee has been updated.'
            : 'New employee has been added.',
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
      inputs={['name', 'surname', 'email', 'password']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
      location
      department
    />
  );
};

export default EmployeeForm;
