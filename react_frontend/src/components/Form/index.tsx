import React, { useEffect } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import Input from './fragments/Input';
import Select from './fragments/Select';
import Button from '@/components/buttons/Button';
import { twMerge } from 'tailwind-merge';
import { zodResolver } from '@hookform/resolvers/zod';

type Props<DataT> = {
  id: string;
  defaultValues?: DefaultValues<DataT>;
  children: React.ReactElement | React.ReactElement[];
  onSubmit: (data: DataT) => void;
  className?: string;
  isSubmitting?: boolean;
  zodSchema?: unknown;
  hideSubmitButton?: boolean;
  buttonText?: string;
};


export default function RHForm<DataT extends object>({
  id,
  defaultValues,
  children,
  onSubmit,
  className,
  isSubmitting,
  zodSchema,
  hideSubmitButton,
  buttonText
}: Props<DataT>) {
  const methods = useForm<DataT>({
    defaultValues,
    mode: 'onChange',
    // @ts-expect-error - cannot type zod schema properly
    resolver:
      zodSchema &&
      zodResolver(zodSchema),
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  console.log('defaultValues', defaultValues)
  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge('py-2 flex flex-col', className)}
      >
        {children}
        {!hideSubmitButton && (
            <Button
                type="submit"
                className="mt-4 w-fit px-20 self-end"
                isLoading={isSubmitting}
            >
                {buttonText}
            </Button>
        )}
      </form>
    </FormProvider>
  );
}

RHForm.Input = Input;
RHForm.Select = Select;