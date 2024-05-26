import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/utils/requests'
import BaseScreen from '@/screens/BaseScreen'
import { GridList, Button} from '@/components'
import { Squad } from '@/utils/types/apiSchemas'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Outlet, useNavigate } from 'react-router-dom'

const Squads = () => {
  // const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const nav = useNavigate()
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads')
  })

  console.log('squads', squads.data?.data)

  return (
    <BaseScreen >
      <Outlet />

      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Equipes</h1>
        <Button className='px-8 space-x-2' onClick={() => nav('/equipes/criar')}>
          <span>Adicionar equipe</span>
          <PlusCircleIcon className='w-6 h-6'/>
        </Button>
      </div>

      <hr className='my-2'></hr>

      <GridList 
        items={squads.data?.data?.map((squad: Squad) => {
          return {
            id: squad.id,
            title: squad.name,
            description: squad.car_id
          }
        }) || []} 
        crudMethods={
          {
            onEdit: (id: string) => console.log('onEdit', id),
            onDelete: (id: string) => console.log('onDelete', id),
            onAdd: () => console.log('onAdd')
          }
        }
      />
    </BaseScreen>
  )
}

export default Squads