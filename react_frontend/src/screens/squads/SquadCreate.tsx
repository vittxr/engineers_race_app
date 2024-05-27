import { httpClient } from '@/utils/requests'
import { TSquadFormData } from '@/utils/zodSchemas/squad'
import { queryClient } from '@/main'
import SquadForm from './fragments/SquadForm'
import { useMutation } from '@tanstack/react-query'

const SquadCreate = () => {
  const mutation = useMutation({
    mutationFn: (data: TSquadFormData) => httpClient.post('/squads/', data).then(() => {
        queryClient.invalidateQueries({ queryKey: ['squads'] })
    })
  })

  return (
    <SquadForm mutation={mutation} modalTitle='Criar equipe' buttonText='Criar' />
  )
}

export default SquadCreate