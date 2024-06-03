import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type Props = {
  /** the content/component to be rendered inside the alert */
  children: React.ReactNode;
  /** additional classes to kbe added to the alert */
  className?: string;
  /** the type of the alert */
  type: 'success' | 'error' | 'warning' | 'default';
};

const MAPPED_ICONS = {
  success: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
  error: <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />,
  warning: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />,
  default: <InformationCircleIcon className="w-5 h-5 text-blue-400" />,
};

const Alert = ({ children, className, type }: Props) => {
  return (
    <div
      data-state={type}
      className={twMerge(
        clsx({
          ['border-l-4 p-4']: true,
          ['bg-green-50 border-green-400']: type === 'success',
          ['bg-red-50 border-red-400']: type === 'error',
          ['bg-yellow-50 border-yellow-400']: type === 'warning',
          ['bg-blue-50 border-blue-400']: type === 'default',
        }),
        className,
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">{MAPPED_ICONS[type]}</div>

          <div
            className={clsx({
              'w-full ml-3': true,
              'text-green-800': type === 'success',
              'text-red-800': type === 'error',
              'text-yellow-800': type === 'warning',
              'text-blue-800': type === 'default',
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
