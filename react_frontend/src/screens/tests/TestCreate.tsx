import { queryClient } from '@/main'
import { httpClient } from '@/utils/requests'
import { useMutation } from '@tanstack/react-query'
import TestForm from './fragments/TestForm'
import BaseScreen from '../BaseScreen'
import { TSquadFormData } from '@/utils/zodSchemas/squad'

const TestCreate = () => {
  const mutation = useMutation({
    mutationFn: (data: TSquadFormData) => httpClient.post('/tests/', data).then(() => {
        queryClient.invalidateQueries({ queryKey: ['tests'] })
    })
  })

  return (
    <BaseScreen >
        <TestForm mutation={mutation} buttonText='Criar' />
    </BaseScreen>
  )
}

export default TestCreate