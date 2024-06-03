import { twMerge } from 'tailwind-merge';
import SelectSkeleton from '@/components/skeletons/SelectSkeleton';
import { useFormContext } from 'react-hook-form';

type Style = {
  container?: string;
  label?: string;
  select?: string;
};

type SelectOption = {
  value: string | number;
  label: string;
};

type Props = {
  id: string;
  label: string;
  options: SelectOption[];
  defaultValue?: string | number | undefined;
  isLoading?: boolean;
  style?: Style;
  onChange?: (value: string) => void;
};

const Select = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={twMerge('flex flex-col relative my-3', props.style?.container)}
    >
      <label
        htmlFor={props.id}
        className={twMerge('flex flex-col', props.style?.label)}
      >
        {props.label}
      </label>

      {props.isLoading ? (
        <SelectSkeleton />
      ) : (
        <select
          className={twMerge(
            'block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm',
            props.style?.select,
          )}
          id={props.id}
          // defaultValue={props.defaultValue}
          {...register?.(props.id, {
            value: props.defaultValue,
            onChange: (e) => {
              props.onChange?.(e.target.value);
            },
          })}
        >
          {props.options.map((option) => (
            <option
              key={option.value}
              id={option.value.toString()}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}

      {errors[props.id] && (
        <span className="text-red-500 text-sm absolute bottom-[-20px]">
          {errors[props.id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Select;
