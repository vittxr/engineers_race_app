import React from 'react'
import DeleteButton from '@/components/buttons/DeleteButton';

type Item = {
    id: number | string;
    title: string;
    description?: string | React.ReactNode;
}

type Props = {
    items: Item[]
    crudConfig?: {
        onEdit?: (id: string | number) => void;
        onDelete?: (id: string | number ) => void;
    }
}

const List = ({ items, crudConfig }: Props) => {
  return (
    <ul className="space-y-2">
        {items.map((item: Item) => (
            <li key={item.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{item.description}</p>
                    </div>

                    {crudConfig?.onDelete && (
                        <DeleteButton onClick={() => crudConfig.onDelete?.(item.id)}/>
                    )}
                </div>
            </li>
        ))}
    </ul>
  )
}

export default List