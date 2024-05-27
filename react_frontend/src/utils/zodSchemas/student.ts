import { z } from 'zod';

export const StudentFormData = z.object({
    name: z.string().trim().min(1, { message: "O nome é obrigatório."}),
    RA: z.string().trim().min(1, { message: "O RA é obrigatório."}),
});

export type TStudentFormData = z.infer<typeof StudentFormData>;