import { PencilSquareIcon } from '@heroicons/react/24/solid'

type Props = {
    onClick: () => void
}

const UpdateButton = ({ onClick }: Props) => {
  return (
    <button
        onClick={onClick}
        className="p-2 bg-indigo-500 rounded-full flex-shrink-0 hover:bg-white hover:text-indigo-500 border-2 border-indigo-500 transition-colors"
    >
        <PencilSquareIcon className="w-5 h-5"/>
    </button>
  )
}

export default UpdateButton