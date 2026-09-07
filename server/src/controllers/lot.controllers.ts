import { postLotService } from "@/services/lot.services.js";
import type { PostLotSchema } from "@/zod-schemas/lot.schema.js";
import type { Context } from "hono";


export const postLotController = async (c: Context) => {
  const body = await c.req.json() as PostLotSchema;

  const data = await postLotService(body);

  return c.json({ data }, 200);
}