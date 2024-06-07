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
        { title: `Valor da prova (${tests[0].value_description})`, field: 'value' },
        { title: 'Penalidade', field: 'penalty' },
        { title: 'Valor final', field: 'final_value' },
      ]}
    />
  );
};

export default IndividualPodiumByTest;
