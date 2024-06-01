import RHForm from '@/components/Form';
import { httpClient } from '@/utils/requests';
import { Squad, Test } from '@/utils/types/apiSchemas';
import { TTestFormData, TestFormData } from '@/utils/zodSchemas/test';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  mutation: UseMutationResult<void, Error, TTestFormData, unknown>;
  title: string;
  buttonText: string;
  test?: Test;
  isLoading?: boolean;
};

const TestForm = ({ title, test, mutation, buttonText, isLoading }: Props) => {
  const [valueUnit, setValueUnit] = useState<'metros' | 'segundos' | 'gramas'>(
    'metros',
  );
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads'),
  });

  const handleTestTypeChange = async (value: string) => {
    if (value === 'Subida de Rampa em 45° (contagem de distância)')
      return setValueUnit('metros');
    if (value === 'Velocidade máxima com manobrabilidade (contagem de tempo)')
      return setValueUnit('segundos');
    if (value === 'Tração (contagem de peso)') return setValueUnit('gramas');
  };

  console.log('test: ', test);
  return (
    <>
      <h1 className="font-medium text-2xl text-center">{title}</h1>
      <RHForm
        id="test-form"
        onSubmit={(data: TTestFormData) => {
          console.log('data: ', data);
          mutation.mutateAsync({ ...data, value_description: valueUnit });
        }}
        buttonText={buttonText}
        zodSchema={TestFormData}
        defaultValues={
          test
            ? {
                name: test.name,
                value: test.value,
                value_description: test.value_description,
                penalty: test.penalty,
                penalty_description: test.penalty_description,
                squad_id: test.squad.id,
              }
            : {
                value_description: valueUnit,
                squad_id: squads.data?.data[0]?.id,
              }
        }
        isSubmitting={mutation.isPending}
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
          defaultValue={test?.squad.id || squads.data?.data[0]?.id}
        />
      </RHForm>
    </>
  );
};

export default TestForm;
