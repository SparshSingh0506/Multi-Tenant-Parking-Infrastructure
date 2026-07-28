import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);

export const connectToDb = () => {
  try {
    db.select();
    console.log('Connected to the database successfully.');
  } catch (error) { 
    console.error('Error connecting to the database:', error);
  }
};