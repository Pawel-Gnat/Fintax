'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

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

import { LoadingButton } from '../loading-button/loading-button';

interface FormProps {
  form: UseFormReturn<any>;
  inputs: string[];
  image?: boolean;
  imageSrc?: string;
  onChangeImage?: (value: string) => void;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

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

        <LoadingButton isLoading={isLoading} text="Save changes" />
      </form>
    </FormUI>
  );
};

export default Form;
