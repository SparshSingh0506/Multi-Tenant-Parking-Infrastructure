import { serve } from '@hono/node-server'

import { env, validateEnv } from './configs/env.config.js'
import { connectToDb } from './configs/db.config.js';

import app from './app.js'


validateEnv(); 
await connectToDb();

serve({
  fetch: app.fetch, 
  port: env.PORT,
  }
);

console.log(`Server running on port ${env.PORT}`);

// export default { 
//   port: env.PORT,
//   fetch: app.fetch, 
// } 
