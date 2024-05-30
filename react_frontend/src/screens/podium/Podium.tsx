import { httpClient } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import BaseScreen from '../BaseScreen';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Podium = () => {
  const podium = useQuery({
    queryKey: ['podium'],
    queryFn: () => httpClient.get('/podium'),
  });

  return (
    <BaseScreen>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Podium</h1>
        <Button className="px-8 space-x-2">
          <span>Exportar relatório!</span>
          <ArrowDownTrayIcon className="w-5 h-5" />
        </Button>
      </div>

      <hr className="my-2"></hr>
      {podium.data?.data?.length === 0 ||
        (!podium?.data?.data && (
          <EmptyState
            title="Não há registros de provas para calcular o Podium! "
            // buttonText="Adicionar prova"
            // buttonOnClick={() => nav('/equipes/criar')}
            className="mt-20"
          />
        ))}
    </BaseScreen>
  );
};

export default Podium;
