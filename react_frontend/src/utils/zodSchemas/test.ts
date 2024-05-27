import { z } from 'zod';

const TestFormData = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    // race_score: z.number().positive(),
    // race_position: z.number().int().positive(),
    value: z.number().int().positive(),
    // value_description: z.string(),
    penalty: z.number().optional(),
    penalty_description: z.string().optional(),
    squad_id: z.number().int().positive(),
});

export type TTestFormData = z.infer<typeof TestFormData>;
