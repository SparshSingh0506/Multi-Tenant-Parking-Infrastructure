import type { Context } from "hono";


export const getDashboardController = (c: Context) => {
  const data = {};

  return c.json({ data }, 200);
}
