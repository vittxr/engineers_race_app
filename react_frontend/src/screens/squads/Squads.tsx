import { useMutation, useQuery } from '@tanstack/react-query';
import { httpClient } from '@/utils/requests';
import BaseScreen from '@/screens/BaseScreen';
import { GridList, Button } from '@/components';
import { Squad } from '@/utils/types/apiSchemas';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmptyState from '@/components/EmptyState';

const Squads = () => {
  const nav = useNavigate();
  const squads = useQuery({
    queryKey: ['squads'],
    queryFn: () => httpClient.get('/squads'),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      httpClient
        .delete(`/squads/${id}/`)
        .then(() => {
          toast.success('Equipe deletada com sucesso!');
          squads.refetch();
        })
        .catch(() => {
          toast.error('Erro ao deletar equipe!');
        }),
  });

  return (
    <BaseScreen>
      <Outlet />

      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Equipes</h1>
        <Button
          className="px-8 space-x-2"
          onClick={() => nav('/equipes/criar')}
        >
          <span>Adicionar equipe</span>
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
      </div>

      <hr className="my-2"></hr>

      {squads.data?.data?.length === 0 && (
        <EmptyState
          title="Não há equipes"
          description="Comece criando a primeira equipe!"
          buttonText="Adicionar equipe"
          buttonOnClick={() => nav('/equipes/criar')}
          className="mt-20"
        />
      )}
      <GridList
        items={
          squads.data?.data?.map((squad: Squad) => {
            return {
              id: squad.id,
              title: squad.name,
              description: squad.car_id,
            };
          }) || []
        }
        crudMethods={{
          onEdit: (id: string) => nav(`/equipes/${id}`),
          onDelete: (id: string) => deleteMutation.mutateAsync(id),
        }}
      />
    </BaseScreen>
  );
};

export default Squads;
