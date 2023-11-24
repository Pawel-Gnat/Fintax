'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { Button } from '@/components/ui/button';
import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ControllerLabel from '@/components/controller-label/controller-label';
import ImageUpload from '@/components/image-upload/image-upload';

interface FormProps {
  form: UseFormReturn<any>;
  inputs: string[];
  image?: boolean;
  imageSrc?: string;
  onChangeImage?: (value: string) => void;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const Form: React.FC<FormProps> = ({
  form,
  inputs,
  isLoading,
  onSubmit,
  onChangeImage,
  image,
  imageSrc,
}) => {
  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {inputs.map((input) => (
          <FormField
            key={input}
            control={form.control}
            name={input}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {input === 'newPassword'
                    ? 'New password'
                    : capitalizeFirstLetter(input)}
                </FormLabel>
                <FormControl>
                  <Input
                    type={
                      input === 'email'
                        ? 'email'
                        : input === 'password' || input === 'newPassword'
                        ? 'password'
                        : 'text'
                    }
                    placeholder={
                      input === 'newPassword'
                        ? 'New password'
                        : capitalizeFirstLetter(input)
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {image && (
          <Controller
            control={form.control}
            name="image"
            render={({ field }) => (
              <div>
                {ControllerLabel('Image')}
                <ImageUpload onChange={onChangeImage} imageSrc={imageSrc} />
              </div>
            )}
          />
        )}

        <Button type="submit" className={isLoading ? 'w-full opacity-60' : 'w-full'}>
          {isLoading ? <ClipLoader size={25} cssOverride={override} /> : 'Save changes'}
        </Button>
      </form>
    </FormUI>
  );
};

export default Form;
