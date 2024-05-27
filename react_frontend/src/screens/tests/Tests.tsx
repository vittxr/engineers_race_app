import { httpClient } from "@/utils/requests"
import { useMutation, useQuery } from "@tanstack/react-query"
import BaseScreen from "../BaseScreen"
import { Button, GridList } from "@/components"
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import EmptyState from "@/components/EmptyState"
import { useNavigate } from "react-router-dom"
import { Test } from "@/utils/types/apiSchemas"
import { toast } from "react-toastify"


const Tests = () => {
  const nav = useNavigate()
  const tests = useQuery({
    queryKey: ['tests'],
    queryFn: () => httpClient.get('/tests')
  })
  const deleteMutation = useMutation({
    mutationFn: (id: string) => httpClient.delete(`/tests/${id}/`).then(() => {
      toast.success('Prova deletada com sucesso!')
      tests.refetch()
    }).catch(() => {
      toast.error('Erro ao deletar prova!')
    })
  })

  console.log('tests', tests.data?.data)
  return (
    <BaseScreen>
        <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Provas</h1>
        <Button className='px-8 space-x-2' onClick={() => nav('/provas/criar')}>
          <span>Adicionar prova</span>
          <PlusCircleIcon className='w-6 h-6'/>
        </Button>
      </div>

      <hr className='my-2'></hr>

      {tests.data?.data?.length === 0 && (
          <EmptyState
            title="Não há provas registradas!"
            description="Comece criando a primeira prova!"
            buttonText="Adicionar prova"
            buttonOnClick={() => nav('/provas/criar')}
            className='mt-20'
          />
       )}
      <GridList 
        items={tests.data?.data?.map((test: Test) => {
          return {
            id: test.name,
            title: test.name,
          }
        }) || []} 
        crudMethods={
          {
            onEdit: (id: string) => nav(`/equipes/${id}`),
            onDelete: (id: string) => deleteMutation.mutateAsync(id),
          }
        }
      />
    </BaseScreen>
  )
}

export default Tests