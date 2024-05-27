import { queryClient } from '@/main'
import { httpClient } from '@/utils/requests'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import TestForm from './fragments/TestForm'
import BaseScreen from '../BaseScreen'

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