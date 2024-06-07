import { httpClient } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import BaseScreen from '../BaseScreen';
import EmptyState from '@/components/EmptyState';
import { useEffect, useState } from 'react';
import IndividualPodiumByTest from './fragments/IndividualPodiumByTest';
import { classNames } from '@/utils/tw';
// import FinalPodium from './fragments/FinalPodium';
import { Test } from '@/utils/types/apiSchemas';

type Tab = {
  name: string;
  current: boolean;
  children: JSX.Element | undefined;
};

const Podium = () => {
  const tests = useQuery({
    queryKey: ['tests'],
    queryFn: () => httpClient.get('/tests/'),
    select: (res) => {
      const testsGroupedByType: { [key: string]: Test[] } = {
        first_tests: [],
        second_tests: [],
        third_tests: [],
      };

      for (const test of res.data) {
        if (test.name === 'Subida de Rampa em 45° (contagem de distância)') {
          testsGroupedByType.first_tests.push(test);
        }
        if (
          test.name ===
          'Velocidade máxima com manobrabilidade (contagem de tempo)'
        ) {
          testsGroupedByType.second_tests.push(test);
        }
        if (test.name === 'Tração (contagem de peso)') {
          testsGroupedByType.third_tests.push(test);
        }
      }

      testsGroupedByType.first_tests = testsGroupedByType.first_tests.sort(
        (a, b) => b.value - a.value,
      );
      testsGroupedByType.second_tests = testsGroupedByType.second_tests.sort(
        (a, b) => a.value - b.value,
      );
      testsGroupedByType.third_tests = testsGroupedByType.third_tests.sort(
        (a, b) => b.value - a.value,
      );

      return testsGroupedByType;
    },
  });
  const [tabs, setTabs] = useState<Tab[]>([
    { name: 'Subida de Rampa', current: true, children: undefined },
    { name: 'Velocidade Máxima', current: false, children: undefined },
    { name: 'Tração', current: false, children: undefined },
    // { name: 'Nota final', current: false, children: undefined },
  ]);

  useEffect(() => {
    if (tests.data) {
      setTabs((prev) => {
        return prev.map((tab) => {
          if (tab.name === 'Subida de Rampa') {
            return {
              ...tab,
              children: (
                <IndividualPodiumByTest
                  tests={tests.data?.first_tests}
                  title={tab.name}
                />
              ),
            };
          }

          if (tab.name === 'Velocidade Máxima') {
            return {
              ...tab,
              children: (
                <IndividualPodiumByTest
                  tests={tests.data?.second_tests}
                  title={tab.name}
                />
              ),
            };
          }

          if (tab.name === 'Tração') {
            return {
              ...tab,
              children: (
                <IndividualPodiumByTest
                  tests={tests.data?.third_tests}
                  title={tab.name}
                />
              ),
            };
          }

          // if (tab.name === 'Nota final') {
          //   return {
          //     ...tab,
          //     // @ts-expect-error - TODO: REMOVE THIS
          //     children: <FinalPodium tests={tests.data} />,
          //   };
          // }

          return tab;
        });
      });
    }
  }, [tests.data]);

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

  console.log('tests', tests.data);
  return (
    <BaseScreen>
      <h1 className="text-2xl">Podium</h1>

      <hr className="my-2"></hr>
      {tests.isLoading ? (
        <p>Carregando</p>
      ) : (
        <>
          {/** @ts-expect-error - TODO: REMOVE THIS */}
          {tests.data?.length === 0 || !tests?.data ? (
            <EmptyState
              title="Não há registros de provas para calcular o Podium! "
              className="mt-20"
            />
          ) : (
            <>
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

              <div className="mt-2 space-y-2">
                {tabs.find((tab) => tab.current)?.children}
              </div>
            </>
          )}
        </>
      )}
    </BaseScreen>
  );
};

export default Podium;
