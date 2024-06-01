import { httpClient } from '@/utils/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseScreen from '../BaseScreen';
import { Button, GridList } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import EmptyState from '@/components/EmptyState';
import { useNavigate } from 'react-router-dom';
import { Test } from '@/utils/types/apiSchemas';
import { toast } from 'react-toastify';

type TestGroupedBySquad = {
  [key: string]: Test[];
};

const Tests = () => {
  const nav = useNavigate();
  const tests = useQuery({
    queryKey: ['tests'],
    queryFn: () => httpClient.get('/tests'),
    select: (res) => {
      // group data by squad.id
      const testsGroupedBySquad: TestGroupedBySquad = {};

      for (const test of res.data) {
        if (testsGroupedBySquad[test.squad.name] === undefined) {
          testsGroupedBySquad[test.squad.name] = [];
        }
        testsGroupedBySquad[test.squad.name].push(test);
      }

      return testsGroupedBySquad;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      httpClient
        .delete(`/tests/${id}/`)
        .then(() => {
          toast.success('Prova deletada com sucesso!');
          tests.refetch();
        })
        .catch(() => {
          toast.error('Erro ao deletar prova!');
        }),
  });

  return (
    <BaseScreen>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Provas</h1>
        <Button className="px-8 space-x-2" onClick={() => nav('/provas/criar')}>
          <span>Adicionar prova</span>
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
      </div>

      <hr className="my-2"></hr>

      {tests.data?.data?.length === 0 && (
        <EmptyState
          title="Não há provas registradas!"
          description="Comece criando a primeira prova!"
          buttonText="Adicionar prova"
          buttonOnClick={() => nav('/provas/criar')}
          className="mt-20"
        />
      )}

      {tests.data && Object.keys(tests.data) && (
        <div>
          {Object.keys(tests.data).map((key) => {
            return (
              <div key={key}>
                <h2 className="text-lg font-medium mt-4">{key}</h2>
                <GridList
                  items={tests.data[key].map((test: Test) => {
                    return {
                      id: test.id?.toString() || 'no-id',
                      title: test.name || 'no-title',
                    };
                  })}
                  crudMethods={{
                    onEdit: (id: string) => nav(`/provas/${id}`),
                    onDelete: (id: string) => deleteMutation.mutateAsync(id),
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </BaseScreen>
  );
};

export default Tests;
