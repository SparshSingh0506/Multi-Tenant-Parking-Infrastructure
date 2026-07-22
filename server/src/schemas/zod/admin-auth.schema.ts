import { email, z } from 'zod';

export const adminRegisterSchema = z.object({
  email: email()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),

  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be less than 100 characters long'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be less than 50 characters long'),
});

export type adminRegisterType = z.infer<typeof adminRegisterSchema>;