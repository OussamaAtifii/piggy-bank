import { z } from 'zod';

// Reglas generales.
export const baseUserSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(16, 'Username cannot exceed 16 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(244, 'Email cannot exceed 244 characters')
    .email('The email address in invalid')
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(255, 'Password cannot exceed 255 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
      'Password must contain lowercase letters, uppercase letters, numbers, and symbols'
    ),
  avatar: z.string().optional(),
});

// Reglas para el registro de usuario.
export const userRegisterSchema = baseUserSchema.pick({
  username: true,
  email: true,
  password: true,
});

// Reglas para el inicio de sesión.
export const userLoginSchema = z.object({
  email: z.string().toLowerCase(),
  password: z.string(),
});

// Reglas para la actualización el perfil.
export const userProfileUpdateSchema = baseUserSchema.partial();
