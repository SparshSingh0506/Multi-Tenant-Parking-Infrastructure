import { Hono } from 'hono';
import { index } from './routes/index.routes.js';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello fellow developer!')
})

app.route('/api/v1', index);

export default app;
