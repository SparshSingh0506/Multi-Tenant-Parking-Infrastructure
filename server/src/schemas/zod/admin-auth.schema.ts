import { email, z } from 'zod';

export const adminRegisterSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters long'),

  email: email()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
    
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be less than 100 characters long'),
});

export type AdminRegister = z.infer<typeof adminRegisterSchema>;


export const adminLoginSchema = z.object({
  email: email()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be less than 100 characters long'),
});

export type AdminLogin = z.infer<typeof adminLoginSchema>;