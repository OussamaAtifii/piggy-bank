import { z } from 'zod';

// Reglas generales.
export const baseBankSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(24, 'Name cannot exceed 16 characters'),
  totalSavings: z.number().nonnegative().optional(),
  description: z.string().optional(),
  goal: z.number().nonnegative().optional(),
  visibility: z.boolean().optional(),
  userId: z.number(),
});
