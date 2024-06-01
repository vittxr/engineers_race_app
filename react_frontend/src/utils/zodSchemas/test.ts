import { z } from 'zod';

export const TestFormData = z.object({
  name: z.string(),
  value: z.coerce.number().positive('O valor deve ser maior que zero!'),
  value_description: z.string(),
  penalty: z.coerce
    .number()
    .optional()
    .nullable()
    .transform((v) => v || undefined),
  penalty_description: z
    .string()
    .optional()
    .nullable()
    .transform((v) => v || undefined),
  squad_id: z.coerce.number().int().positive(),
});

export type TTestFormData = z.infer<typeof TestFormData>;
