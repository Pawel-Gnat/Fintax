'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import axios from 'axios';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import { useToast } from '@/components/ui/use-toast';
import SheetForm from '@/components/sheet-form/sheet-form';

const formSchema = z.object({
  password: z.string().trim(),
  newPassword: z.string().trim().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

const PasswordEmployeeForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setIsOpen, elementId, isEditing, isLoading, setIsLoading, setIsEditing } =
    useContext(ModalSheetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/employees/password/${elementId}`, formData)
      .then(() => {
        toast({
          description: 'Employee password has been updated.',
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
      inputs={['password', 'newPassword']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditing={isEditing}
    />
  );
};

export default PasswordEmployeeForm;
