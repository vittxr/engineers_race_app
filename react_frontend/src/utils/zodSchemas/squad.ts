import { z } from 'zod';
import { StudentFormData } from './student';

export const SquadFormData = z.object({
    name: z.string().min(1, { message: "O nome da equipe é obrigatório."}),
    car_id: z.string().min(1, { message: "O ID do carro da equipe é obrigatório."}),
    students: z.array(StudentFormData).optional()
});

export type TSquadFormData = z.infer<typeof SquadFormData>;
