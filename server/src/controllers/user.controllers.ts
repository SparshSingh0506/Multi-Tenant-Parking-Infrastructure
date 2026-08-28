import { getUserService } from "@/services/user.services.js";
import type { Context } from "hono";


export const getUserController = async (c: Context) => {
  const body = await c.req.json();
  const data = await getUserService(body);

  return c.json({ data }, 200);
}