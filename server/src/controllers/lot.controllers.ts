import type { Context } from "hono";


export const postLotController = (c: Context) => {
  const body = c.req.json();
  /*
  body schema: {
    "parkingLotName": "string",
  }
  */
  const data = {};

  return c.json({ data }, 200);
}