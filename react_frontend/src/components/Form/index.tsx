import React from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import Input from './fragments/Input';
import Select from './fragments/Select';
import Button from '@/components/buttons/Button';
import { twMerge } from 'tailwind-merge';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema, AnyObject } from 'yup';

type Props<DataT> = {
  defaultValues?: DefaultValues<DataT>;
  children: React.ReactElement | React.ReactElement[];
  onSubmit: (data: DataT) => void;
  className?: string;
  isSubmitting?: boolean;
  // yupSchema?: ObjectSchema<AnyObject>;
  yupSchema?: unknown;
  hideSubmitButton: boolean;
};

/**
 * RHForm component (using react hook form). If you are using this component, you should use the RHForm.Input, RHForm.Select... instead of the Input, Select... components. This is because the RHForm components are connected to the useForm hook and the Input, Select... components are not, but they have the same props.
 */
export default function RHForm<DataT extends object>({
  defaultValues,
  children,
  onSubmit,
  className,
  isSubmitting,
  yupSchema,
  hideSubmitButton,
}: Props<DataT>) {
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    // @ts-expect-error - cannot type yup schema properly
    resolver:
      yupSchema &&
      yupResolver(yupSchema as ObjectSchema<DataT, AnyObject, unknown, ''>),
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge('py-2 flex flex-col space-y-2', className)}
      >
        {children}
        {!hideSubmitButton && (
            <Button
                type="submit"
                className=""
                isLoading={isSubmitting}
            >
                Criar
            </Button>
        )}
      </form>
    </FormProvider>
  );
}

RHForm.Input = Input;
RHForm.Select = Select;