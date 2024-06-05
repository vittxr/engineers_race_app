import { Test } from '@/utils/types/apiSchemas';

type Props = {
  tests: Test[];
};

const FinalPodium = ({ tests }: Props) => {
  console.log('tests', tests);
  return <div>FinalPodium</div>;
};

export default FinalPodium;
