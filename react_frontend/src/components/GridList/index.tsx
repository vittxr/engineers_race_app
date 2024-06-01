import { ReactNode } from 'react';
import DeleteButton from '@/components/buttons/DeleteButton';
import UpdateButton from '@/components/buttons/UpdateButton';

type GridItem = {
  id: string;
  title: string | ReactNode;
  description?: string | ReactNode;
};

type CrudMethods = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

type Props = {
  items: GridItem[];
  crudMethods?: CrudMethods;
};

export default function GridList({ items, crudMethods }: Props) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">
                  {item.title}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {item.description}
              </p>
            </div>
            <div className="space-x-2 text-white">
              {crudMethods?.onEdit && (
                <UpdateButton onClick={() => crudMethods.onEdit(item.id)} />
              )}
              {crudMethods?.onDelete && (
                <DeleteButton onClick={() => crudMethods.onDelete(item.id)} />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
