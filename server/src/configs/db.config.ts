import { Pool } from 'pg';
import { env } from './env.config.js';
import { drizzle } from 'drizzle-orm/node-postgres';
import {snakeCase} from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const db = drizzle({
  client: pool, 
});

export const connectToDb = async () => { 
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Connected to the database successfully.');
  } 
  
  catch (error) { 
    throw new Error('Failed to connect to the database: ' + (error as Error).message);
  }
};