import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/utils/requests'
import BaseScreen from '@/screens/BaseScreen'
import GridList from '@/components/GridList'

const Squad = () => {
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads')
  })

  console.log('squads', squads.data?.data)

  return (
    <BaseScreen>
      <GridList 
        items={squads.data?.data?.map(squad => {
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

export default Squad