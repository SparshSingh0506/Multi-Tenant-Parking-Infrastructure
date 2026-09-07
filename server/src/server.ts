import { serve } from '@hono/node-server'

import { env, validateEnv } from './configs/env.config.js'
import { connectToDb } from './configs/db.config.js';

import app from './app.js'


validateEnv(); 
await connectToDb();

//not using Bun's built-in server to keep the codebase executable for general Node.js environments. 
serve({
  fetch: app.fetch, 
  port: env.PORT,
});

console.log(`Server running on port ${env.PORT}`);
