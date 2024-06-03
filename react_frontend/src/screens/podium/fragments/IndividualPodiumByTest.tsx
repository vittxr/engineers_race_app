import Table from '@/components/Table';
import { Test } from '@/utils/types/apiSchemas';

type Props = {
  tests: Test[];
  title: string;
};

const IndividualPodiumByTest = ({ tests, title }: Props) => {
  return (
    <Table
      title={title}
      data={tests}
      columns={[
        { title: 'Equipe', field: 'squad.name' },
        { title: 'Valor da prova', field: 'value' },
      ]}
    />
  );
};

export default IndividualPodiumByTest;
