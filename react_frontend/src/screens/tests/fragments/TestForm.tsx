import RHForm from '@/components/Form'
import { httpClient } from '@/utils/requests';
import { Squad } from '@/utils/types/apiSchemas';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

type Props = {
  mutation: any;
  buttonText: string;
  test?: Squad;
  isLoading?: boolean;
}

const TestForm = ({ mutation, buttonText, squad, isLoading }: Props) => {
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads')
  })

  return (
    <>
      <RHForm id="test-form" onSubmit={mutation.mutateAsync} buttonText={buttonText}>
        <RHForm.Select label="Nome" id="name" 
          options={[
            { value: 'Subida de Rampa em 45° (contagem de distância)', label: 'Subida de Rampa em 45° (contagem de distância)' },
            { value: 'Velocidade máxima com manobrabilidade (contagem de tempo)', label: 'Velocidade máxima com manobrabilidade (contagem de tempo)' },
            { value: 'Tração (contagem de peso)', label: 'Tração (contagem de peso)' },
          ]}
        />
        <RHForm.Input type="number" label="Valor" id="value" />
        <RHForm.Input type="number" label="Penalidade" id="penalty" />
        <RHForm.Input type="text" label="Descrição da penalidade" id="penalty_description" />
        <RHForm.Select label="Equipe" id="squad_id" options={squads.data?.data?.map((s: Squad) => {
          return { value: s.id, label: s.name }
        })} />
    </RHForm>

    </>
  )
}

export default TestForm