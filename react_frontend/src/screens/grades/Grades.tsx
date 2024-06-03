import BaseScreen from '../BaseScreen';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/utils/requests';
import { classNames } from '@/utils/tw';
import IndividualTestGrades from './fragments/IndividualTestGrades';
import { useEffect, useState } from 'react';
import FinalGrades from './fragments/FinalGrades';
import { Button } from '@/components';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import ToggleInput from '@/components/ToggleInput';

type Tab = {
  name: string;
  current: boolean;
  children: JSX.Element | undefined;
};

const Grades = () => {
  const tests_grades = useQuery({
    queryKey: ['tests_grades'],
    queryFn: () => httpClient.get('/tests/grades/'),
  });
  const [tabs, setTabs] = useState<Tab[]>([
    { name: 'Subida de Rampa', current: true, children: undefined },
    { name: 'Velocidade Máxima', current: false, children: undefined },
    { name: 'Tração', current: false, children: undefined },
    { name: 'Nota final', current: false, children: undefined },
  ]);

  useEffect(() => {
    if (tests_grades.data?.data) {
      setTabs((prev) => {
        return prev.map((tab) => {
          if (tab.name === 'Subida de Rampa') {
            return {
              ...tab,
              children: (
                <IndividualTestGrades
                  tests_grades={tests_grades.data?.data?.first_tests}
                  title={tab.name}
                />
              ),
            };
          }

          if (tab.name === 'Velocidade Máxima') {
            return {
              ...tab,
              children: (
                <IndividualTestGrades
                  tests_grades={tests_grades.data?.data?.second_tests}
                  title={tab.name}
                />
              ),
            };
          }

          if (tab.name === 'Tração') {
            return {
              ...tab,
              children: (
                <IndividualTestGrades
                  tests_grades={tests_grades.data?.data?.third_tests}
                  title={tab.name}
                />
              ),
            };
          }

          if (tab.name === 'Nota final') {
            return {
              ...tab,
              children: <FinalGrades tests_grades={tests_grades.data?.data} />,
            };
          }

          return tab;
        });
      });
    }
  }, [tests_grades.data?.data]);

  const handleTabChange = (tabName: string) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.name === tabName) {
          return { ...tab, current: true };
        }
        return { ...tab, current: false };
      }),
    );
  };

  return (
    <BaseScreen>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Provas</h1>
        <Button className="px-8 space-x-2">
          <span>Exportar relatório!</span>
          <ArrowDownTrayIcon className="w-5 h-5" />
        </Button>
      </div>
      {/* <ToggleInput label="Mostrar todos os alunos" /> */}

      {tests_grades.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="space-y-2">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              defaultValue={tabs.find((tab) => tab.current)?.name}
              onChange={(e) => handleTabChange(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm',
                    )}
                    onClick={() => handleTabChange(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 space-y-2">
        {tabs.find((tab) => tab.current)?.children}
      </div>
    </BaseScreen>
  );
};

export default Grades;
