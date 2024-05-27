import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/components/buttons/Button";
import { twMerge } from "tailwind-merge";

type Props = {
    title: string;
    description?: string;
    buttonText?: string;
    buttonOnClick?: () => void;
    className?: string;
}

export default function EmptyState({ title, description, buttonText, buttonOnClick, className }: Props) {
  return (
    <div className={twMerge("text-center", className)}>
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {buttonText && buttonOnClick && (
        <div className="mt-6">
          <Button
            type="button"
              onClick={buttonOnClick}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}
