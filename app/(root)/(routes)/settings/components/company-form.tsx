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

import { Company } from '@prisma/client';

interface CompanyFormProps {
  data: Company;
}

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
});

const CompanyForm: React.FC<CompanyFormProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      name: capitalizeFirstLetter(values.name),
    };

    if (isLoading) return;

    setIsLoading(true);

    axios
      .patch(`/api/settings/company/${data.id}`, formData)
      .then(() => {
        toast({
          description: 'Company has been updated.',
        });
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

  return <Form form={form} inputs={['name']} onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CompanyForm;
