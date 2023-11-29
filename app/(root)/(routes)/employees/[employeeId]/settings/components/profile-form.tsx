'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { useToast } from '@/components/ui/use-toast';
import Form from '@/components/form/form';

import { Employee } from '@prisma/client';

interface ProfileFormProps {
  data: Employee;
}

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  surname: z.string().trim().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  image: z.string(),
  email: z.string().trim().email(),
});

const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      surname: data.surname,
      image: data.image,
      email: data.email,
    },
  });

  const image = form.watch('image');

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
      surname: capitalizeFirstLetter(values.surname),
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/employees/edit/${data.id}`, formData)
      .then(() => {
        toast({
          description: 'Employee has been updated.',
        });
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
    <Form
      form={form}
      inputs={['name', 'surname', 'email']}
      onSubmit={onSubmit}
      isLoading={isLoading}
      image
      imageSrc={image}
      onChangeImage={(value) => form.setValue('image', value)}
    />
  );
};

export default ProfileForm;
