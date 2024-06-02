import BaseScreen from '../BaseScreen';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/utils/requests';

const Grades = () => {
  const grades = useQuery({
    queryKey: ['grades'],
    queryFn: () => httpClient.get('/grades'),
  });

  console.log('grades: ', grades.data?.data);
  return <BaseScreen>grades</BaseScreen>;
};

export default Grades;
