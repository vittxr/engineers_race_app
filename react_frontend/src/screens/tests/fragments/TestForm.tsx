import RHForm from '@/components/Form';
import { httpClient } from '@/utils/requests';
import { Squad } from '@/utils/types/apiSchemas';
import { TTestFormData } from '@/utils/zodSchemas/test';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  mutation: UseMutationResult<void, Error, TTestFormData, unknown>;
  buttonText: string;
  test?: Squad;
  isLoading?: boolean;
};

const TestForm = ({ mutation, buttonText, isLoading }: Props) => {
  const [title, setTitle] = useState<string>(
    'Criar registro de prova - Subida de Rampa em 45° (contagem de distância)',
  );
  const [valueUnit, setValueUnit] = useState<'metros' | 'segundos' | 'gramas'>(
    'metros',
  );
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads'),
  });

  const handleTestTypeChange = async (value: string) => {
    setTitle(`Criar registro de prova - ${value}`);
    switch (value) {
      case 'Subida de Rampa em 45° (contagem de distância)':
        setValueUnit('metros');
        break;
      case 'Velocidade máxima com manobrabilidade (contagem de tempo)':
        setValueUnit('segundos');
        break;
      case 'Tração (contagem de peso)':
        setValueUnit('gramas');
        break;
    }
  };

  return (
    <>
      <h1 className="font-medium text-2xl text-center">{title}</h1>
      <RHForm
        id="test-form"
        onSubmit={mutation.mutateAsync}
        buttonText={buttonText}
      >
        <RHForm.Select
          label="Nome (tipo de prova)"
          id="name"
          options={[
            {
              value: 'Subida de Rampa em 45° (contagem de distância)',
              label: 'Subida de Rampa em 45° (contagem de distância)',
            },
            {
              value:
                'Velocidade máxima com manobrabilidade (contagem de tempo)',
              label:
                'Velocidade máxima com manobrabilidade (contagem de tempo)',
            },
            {
              value: 'Tração (contagem de peso)',
              label: 'Tração (contagem de peso)',
            },
          ]}
          onChange={handleTestTypeChange}
        />
        <RHForm.Input type="number" label={`Valor - ${valueUnit}`} id="value" />
        <RHForm.Input type="number" label="Penalidade" id="penalty" />
        <RHForm.Input
          type="text"
          label="Descrição da penalidade"
          id="penalty_description"
        />
        <RHForm.Select
          label="Equipe"
          id="squad_id"
          options={
            squads.data?.data?.map((s: Squad) => {
              return { value: s.id, label: s.name };
            }) || []
          }
          isLoading={isLoading}
        />
      </RHForm>
    </>
  );
};

export default TestForm;
