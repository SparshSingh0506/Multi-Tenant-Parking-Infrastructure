import { env } from './env.config.js';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(env.DATABASE_URL);

export const connectToDb = () => {
  try {
    db.select();
    console.log('Connected to the database successfully.');
  } 
  
  catch (error) { 
    throw new Error('Failed to connect to the database: ' + (error as Error).message);
  }
};