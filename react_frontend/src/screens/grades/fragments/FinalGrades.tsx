import { useState, useEffect } from 'react';
import IndividualTestGrades from './IndividualTestGrades';
import { Test } from '@/utils/types/apiSchemas';

type Props = {
  tests_grades: any;
};

const FinalGrades = ({ tests_grades }: Props) => {
  const [finalGrades, setFinalGrades] = useState<Test[]>([]);

  useEffect(() => {
    if (tests_grades) {
      const acc_grades_by_squad: Test[] = [];

      console.log('grades', tests_grades);

      Object.keys(tests_grades).forEach((key) => {
        tests_grades[key].forEach((test: Test) => {
          const grade_value = test.grade;
          const squad_grade = acc_grades_by_squad.find(
            (squad_grade) => squad_grade.squad.name === test.squad.name,
          );

          if (squad_grade) {
            squad_grade.grade! += grade_value!;
          } else {
            acc_grades_by_squad.push({
              squad: test.squad,
              grade: grade_value,
            });
          }
        });
      });

      setFinalGrades(acc_grades_by_squad);
    }
  }, [tests_grades]);

  return <IndividualTestGrades tests_grades={finalGrades} title="Nota final" />;
};

export default FinalGrades;
