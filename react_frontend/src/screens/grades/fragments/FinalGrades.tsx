import { useState, useEffect } from 'react';
import IndividualTestGrades from './IndividualTestGrades';
import { Test } from '@/utils/types/apiSchemas';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tests_grades: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateFinalGrades(tests_grades: any) {
  const acc_grades_by_squad: Partial<Test>[] = [];

  Object.keys(tests_grades).forEach((key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tests_grades[key as any].forEach((test: Test) => { 
      const grade_value = test.grade;
      const squad_grade = acc_grades_by_squad.find(
        (squad_grade) => squad_grade.squad?.name === test.squad.name,
      );

      if (squad_grade) {
        squad_grade.grade! += grade_value || 0;
        squad_grade.grade = parseFloat(
          squad_grade.grade?.toFixed(2) || '0',
        );
      } else {
        acc_grades_by_squad.push({
          squad: test.squad,
          grade: grade_value,
        });
      }
    });
  });

  return acc_grades_by_squad;
}

const FinalGrades = ({ tests_grades }: Props) => {
  const [finalGrades, setFinalGrades] = useState<Partial<Test>[]>([]);

  useEffect(() => {
    if (tests_grades) {
      console.log('tests_grades', tests_grades)
      setFinalGrades(calculateFinalGrades(tests_grades));
    }
  }, [tests_grades]);

  return <IndividualTestGrades tests_grades={finalGrades} title="Nota final" />;
};

export default FinalGrades;
