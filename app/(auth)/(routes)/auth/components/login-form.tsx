import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CSSProperties, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { signIn } from 'next-auth/react';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(2, {
    message: 'Password must be at least 4 characters.',
  }),
});

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const LoginForm = () => {
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    signIn('credentials', { ...values, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push('/');
        toast({
          description: 'You have logged in.',
        });
      }

      if (callback?.error) {
        toast({
          variant: 'destructive',
          description: callback.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
