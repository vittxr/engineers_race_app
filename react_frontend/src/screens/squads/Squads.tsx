import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/utils/requests'
import BaseScreen from '../BaseScreen'

const Squad = () => {
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads')
  })

  console.log('squads', squads.data?.data)

  return (
    <BaseScreen>Squads</BaseScreen>
  )
}

export default Squad