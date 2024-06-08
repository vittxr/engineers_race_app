import { Button } from '@/components';
import RHForm from '@/components/Form';
import List from '@/components/List';
import Modal from '@/components/modals/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StudentFormData, TStudentFormData } from '@/utils/zodSchemas/student';
import { SquadFormData, TSquadFormData } from '@/utils/zodSchemas/squad';
import { Squad } from '@/utils/types/apiSchemas';
import { UseMutationResult } from '@tanstack/react-query';

type Props = {
  mutation: UseMutationResult<void, Error, TSquadFormData, unknown>;
  modalTitle: string;
  buttonText: string;
  squad?: Squad;
  isLoading?: boolean;
};

const SquadForm = ({
  mutation,
  modalTitle,
  buttonText,
  squad,
  isLoading,
}: Props) => {
  const nav = useNavigate();
  const [students, setStudents] = useState<TStudentFormData[] | []>([]);

  useEffect(() => setStudents(squad?.students || []), [squad]);

  return (
    <Modal
      title={modalTitle}
      isVisible={true}
      setIsVisible={() => {
        nav(-1);
      }}
    >
      {isLoading ? (
        <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-50"></div>
      ) : (
        <>
          <RHForm
            defaultValues={squad}
            id="squad-form"
            zodSchema={SquadFormData}
            onSubmit={(data: TSquadFormData) => {
              console.log('data', data);
              data.students = students;
              mutation.mutateAsync(data);
            }}
            hideSubmitButton={true}
          >
            <RHForm.Input
              type="text"
              label="Nome"
              id="name"
              defaultValue={squad?.name}
            />
            <RHForm.Input
              type="text"
              label="Carro"
              id="car_id"
              defaultValue={squad?.car_id}
            />
          </RHForm>

          <RHForm
            id="student-form"
            zodSchema={StudentFormData}
            className="flex-row space-x-2"
            onSubmit={(data: TStudentFormData) => {
              if (students.find((s: TStudentFormData) => s.RA === data.RA)) {
                return toast.error('Um aluno com esse RA já foi adicionado!');
              }
              setStudents((prev: TStudentFormData[]) => [...prev, data]);
            }}
            hideSubmitButton={true}
          >
            <RHForm.Input type="text" label="RA do Aluno" id="RA" />
            <RHForm.Input type="text" label="Nome do Aluno" id="name" />
            <Button type="submit" className="h-fit self-end mb-3">
              <PlusIcon className="w-6 h-6" />
            </Button>
          </RHForm>

          <List
            items={students.map((s: TStudentFormData) => {
              return { id: s.name, title: s.name };
            })}
            crudConfig={{
              onDelete: (id: string | number) => {
                setStudents((prev: TStudentFormData[]) =>
                  prev.filter((s: TStudentFormData) => s.name !== id),
                );
              },
            }}
          />

          <Button
            form="squad-form"
            className="w-full mt-4"
            type="submit"
            isLoading={mutation.isPending}
          >
            {buttonText}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default SquadForm;
