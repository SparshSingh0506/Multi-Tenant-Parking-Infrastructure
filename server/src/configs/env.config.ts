import 'dotenv/config';
import { envSchema } from '../schemas/env.schema.js';

export const env = envSchema.parse(process.env);

export const validateEnv = () => {
  env; // just having this line will trigger the parsing and validation of environment variables. If any variable is missing or invalid, an error will be thrown.
  console.log('Environment variables validated successfully.');
}