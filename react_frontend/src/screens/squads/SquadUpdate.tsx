import { httpClient } from '@/utils/requests';
import { TSquadFormData } from '@/utils/zodSchemas/squad';
import { queryClient } from '@/main';
import SquadForm from './fragments/SquadForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SquadUpdate = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (data: TSquadFormData) =>
      httpClient.put(`/squads/${id}`, data).then(() => {
        queryClient.invalidateQueries({ queryKey: ['squads'] });
        toast.success('Equipe atualizada com sucesso!');
      }),
  });
  const squad = useQuery({
    queryKey: ['squads', id],
    queryFn: () => httpClient.get(`/squads/${id}`),
  });

  console.log('suqad', squad.data?.data);
  return (
    <SquadForm
      mutation={mutation}
      squad={squad?.data?.data}
      modalTitle="Editar equipe"
      buttonText="Editar equipe"
      isLoading={squad.isLoading}
    />
  );
};

export default SquadUpdate;
