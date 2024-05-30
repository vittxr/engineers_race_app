import { twMerge } from 'tailwind-merge';
import SelectSkeleton from '@/components/skeletons/SelectSkeleton';

type Style = {
  container?: string;
  label?: string;
  select?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  options: SelectOption[];
  defaultValue?: string;
  isLoading?: boolean;
  style?: Style;
  onChange?: (value: string) => void;
};

const Select = (props: Props) => {
  console.log('options', props.options)
  return (
    <div className={twMerge('flex flex-col', props.style?.container)}>
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
          defaultValue={props.defaultValue}
          onChange={(e) => props.onChange && props.onChange(e.target.value)}
        >
          {props.options.map((option) => (
            <option
              key={option.value}
              defaultValue={props.options[0].label}
              id={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;