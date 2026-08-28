import type { Context } from "hono";


export const getOrganizationController = (c: Context) => {
  const data = {};

  return c.json({ data }, 200);
}