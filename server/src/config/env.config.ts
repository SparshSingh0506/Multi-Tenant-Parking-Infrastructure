import 'dotenv/config';
import { envSchema } from '../schemas/zod/env.schema.js';

export const env = envSchema.parse(process.env);

export const validateEnv = () => env; 
// Ensure environment variables are loaded and validated, else throw an error and exit application.