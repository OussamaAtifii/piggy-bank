import { z } from 'zod';

// Reglas generales.
export const baseTagSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(16, 'Name cannot exceed 16 characters'),
  description: z.string().optional(),
  color: z
    .string()
    .regex(
      /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
      'Color must be a valid hex code'
    )
    .optional(),
  bankId: z.number({ required_error: 'Bank ID is required' }),
});

export const tagUpdateSchema = baseTagSchema.omit({ bankId: true }).partial();
