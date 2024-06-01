import { queryClient } from '@/main';
import { httpClient } from '@/utils/requests';
import { useMutation } from '@tanstack/react-query';
import TestForm from './fragments/TestForm';
import BaseScreen from '../BaseScreen';
import { TTestFormData } from '@/utils/zodSchemas/test';
import { toast } from 'react-toastify';

const TestCreate = () => {
  const mutation = useMutation({
    mutationFn: (data: TTestFormData) =>
      httpClient
        .post('/tests/', data)
        .then(() => {
          toast.success('Prova criada com sucesso!');
          queryClient.invalidateQueries({ queryKey: ['tests'] });
        })
        .catch((error) => {
          toast.error(error.response.data.detail);
        }),
  });

  return (
    <BaseScreen>
      <TestForm
        mutation={mutation}
        title="Criar registro de prova"
        buttonText="Criar"
      />
    </BaseScreen>
  );
};

export default TestCreate;
