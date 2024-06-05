import Table from '@/components/Table';

type Props = {
  title: string;
  // TODO: type grades properly
  tests_grades: object[];
};

const IndividualTestGrades = ({ title, tests_grades }: Props) => {
  return (
    <Table
      columns={[
        { title: 'Equipe', field: 'squad.name' },
        { title: 'Nota', field: 'grade', type: 'numeric' },
      ]}
      data={tests_grades || []}
      title={title}
    />
  );
};

export default IndividualTestGrades;
