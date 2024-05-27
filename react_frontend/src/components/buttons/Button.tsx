import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  /** the component/content to be rendered inside the button */
  children: React.ReactNode;
  /** the function to be called when the button is clicked */
  onClick?: () => void;
  /** additional classes to be added to the button */
  className?: string;
  /** the type of the button */
  type?: 'button' | 'submit' | 'reset';
  /** flag indicating if the button should be disabled */
  disabled?: boolean;
  /** flag indicating if the button is isLoading */
  isLoading?: boolean;
  /** tooltip text to be displayed on hover */
  tooltip?: string;
  /** the form id vinculated with this button */
  form?: string;
};

const defaultClassName =
  'inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm sm:col-start-1 sm:text-sm bg-indigo-500 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out';

const Button = ({
  children,
  onClick,
  className,
  tooltip,
  type = 'button',
  disabled = false,
  isLoading = false,
  form
}: Props) => {
  if (isLoading) {
    return (
      <button
        onClick={onClick}
        className={twMerge(defaultClassName, 'cursor-not-allowed', className)}
        type={type}
        disabled={true}
        title={tooltip}
      >
        {children}
        <svg
          className="animate-spin h-5 w-5 ml-2 text-inherit"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.75s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(
        defaultClassName,
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      type={type}
      disabled={disabled}
      title={tooltip}
      form={form}
    >
      {children}
    </button>
  );
};

export default Button;