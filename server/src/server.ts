import { serve } from '@hono/node-server'

import { env, validateEnv } from './config/env.config.js'
import { connectToDb } from './config/db.config.js';

import app from './app.js'

validateEnv(); 
connectToDb();

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  }, 
  (info) => {
    console.log(`Server is now running on http://localhost:${info.port}`)
  }
)
