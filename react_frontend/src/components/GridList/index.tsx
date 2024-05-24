import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

type GridItem = {
    id: string
    title: string | ReactNode
    description: string | ReactNode
}

type CrudMethods = {
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onAdd: () => void
}

type Props = {
    items: GridItem[]
    crudMethods?: CrudMethods;
}

export default function GridList({ items, crudMethods }: Props) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">{item.title}</h3>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">{item.description}</p>
            </div>
            <div className="space-x-2 text-white">
                {crudMethods?.onEdit && (
                    <button
                        onClick={() => crudMethods.onEdit(item.id)}
                        className="p-2 bg-sky-500 rounded-full flex-shrink-0"
                    >
                        <PencilSquareIcon className="w-5 h-5"/>
                    </button>
                )}
                {crudMethods?.onDelete && (
                    <button
                        onClick={() => crudMethods.onDelete(item.id)}
                        className="p-2 bg-red-500 rounded-full flex-shrink-0"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            {/* <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={person.imageUrl} alt="" /> */}
          </div>
          <div>
            {/* <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                 
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <span className="ml-3">Call</span>
                </a>
              </div>
            </div> */}
          </div>
        </li>
      ))}
    </ul>
  )
}
