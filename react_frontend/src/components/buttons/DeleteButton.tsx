import { TrashIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type Props = {
  id?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

const DeleteButton = ({ id, onClick, className, disabled = false }: Props) => {
  return (
    <button
      id={id || undefined}
      onClick={(e) => onClick(e)}
      className={twMerge(
        'bg-red-600 w-fit h-fit px-2 py-2 rounded-full text-white hover:bg-white hover:text-red-600 border-2 border-red-600 transition-colors',
        className,
        disabled && 'cursor-not-allowed opacity-50',
      )}
      type="button"
      disabled={disabled}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};

export default DeleteButton;