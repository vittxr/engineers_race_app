import { Button } from '@/components'
import RHForm from '@/components/Form'
import List from '@/components/List'
import Modal from '@/components/modals/Modal'
import { httpClient } from '@/utils/requests'
import { StudentCreate } from '@/utils/types/apiSchemas'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SquadCreate = () => {
  const nav = useNavigate()
  const [students, setStudents] = useState<StudentCreate[] | []>([])
  const mutation = useMutation({
    mutationFn: (data: StudentCreate) => httpClient.post('/squads', data).then(res => res.data)
  })

  console.log('students', students)
  return (
    <Modal title="Criar equipe" isVisible={true} setIsVisible={() => {nav(-1)}}>
        <RHForm onSubmit={(data: StudentCreate) => mutation.mutateAsync(data)} hideSubmitButton={true}>
            <RHForm.Input type="text" label="Nome" id="name" />
            <RHForm.Input type="text" label="Carro" id="car_id"  />
        </RHForm>

        <RHForm className="flex-row space-y-0 space-x-2" onSubmit={(data: StudentCreate) => {
            if(students.find((s: StudentCreate) => s.RA === data.RA)) {
                return toast.error('Um aluno com esse RA já foi adicionado!')
            }
            setStudents((prev: StudentCreate[]) => [...prev, data])
        }} hideSubmitButton={true}>
            <RHForm.Input type="text" label="RA do Aluno" id="RA" />
            <RHForm.Input type="text" label="Nome do Aluno" id="name"/>
            <Button type="submit" className='h-fit self-end'>
                <PlusIcon className="w-6 h-6"/>
            </Button>
        </RHForm>

        <List items={students.map((s: StudentCreate) => { 
           return { id: s.RA, title: `${s.name} | ${s.RA}`} }
        )}
            crudConfig={{
                onDelete: (id: string | number) => {
                    setStudents((prev: StudentCreate[]) => prev.filter((s: StudentCreate) => s.RA !== id))
                }
            }}
        />

        <Button className='w-full mt-4' type="submit" isLoading={mutation.isPending}>
            Criar
        </Button>
    </Modal>
  )
}

export default SquadCreate