import { ChangeEvent, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { UseFormRegister, FieldValues, useFormContext } from 'react-hook-form';

type Props = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  errorMsg?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<FieldValues>;
};

const Input = ({ id, className = '', isLoading = false, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (isLoading) {
    return (
      <input
        className={twMerge(
          'block w-full px-3 py-2 border-2 border-gray-300 rounded-md skeleton',
          className,
        )}
        disabled
      />
    );
  }

  return (
    <div className="relative my-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {rest.label}
      </label>
      <input
        {...register?.(id)}
        {...rest}
        className={twMerge(
          'block w-full px-3 py-2 placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ',
          errors[id]?.message
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300',
          className,
        )}
      />
      {errors[id] && (
        <span className="text-red-500 text-sm absolute bottom-[-20px]">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;