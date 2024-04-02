'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useToast } from '@/components/ui/use-toast';
import Form from '@/components/form/form';

import { Employee } from '@prisma/client';

interface PasswordFormProps {
  data: Employee;
}

const formSchema = z.object({
  password: z.string().trim(),
  newPassword: z.string().trim().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

const PasswordForm: React.FC<PasswordFormProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/employees/password/${data.id}`, values)
      .then((response) => {
        toast({
          description: response.data,
        });
        router.refresh();
        form.reset();
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
    <Form
      form={form}
      inputs={['password', 'newPassword']}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default PasswordForm;
