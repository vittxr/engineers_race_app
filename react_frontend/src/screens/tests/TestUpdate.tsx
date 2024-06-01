import { queryClient } from '@/main';
import { httpClient } from '@/utils/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import TestForm from './fragments/TestForm';
import BaseScreen from '../BaseScreen';
import { TTestFormData } from '@/utils/zodSchemas/test';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const TestUpdate = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (data: TTestFormData) =>
      httpClient
        .put(`/tests/${id}/`, data)
        .then(() => {
          toast.success('Prova editada com sucesso!');
          queryClient.invalidateQueries({ queryKey: ['tests'] });
        })
        .catch((error) => {
          toast.error(error.response.data.detail);
        }),
  });
  const test = useQuery({
    queryKey: ['tests', id],
    queryFn: () => httpClient.get(`/tests/${id}/`),
  });

  return (
    <BaseScreen>
      <TestForm
        test={test?.data?.data}
        mutation={mutation}
        title="Atualizar registro de prova"
        buttonText="Salvar alterações"
      />
    </BaseScreen>
  );
};

export default TestUpdate;
