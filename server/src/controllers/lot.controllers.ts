import { getStaticLotDataService, postInitLotDataService } from "@/services/lot.services.js";
import type { InitLotDataSchema } from "@/zod-schemas/lot.schema.js";
import type { Context } from "hono";


export const postInitLotDataController = async (c: Context) => {
  const body = await c.req.json() as InitLotDataSchema;

  const initLotData = await postInitLotDataService(body);

  return c.json({ data: initLotData }, 201);
}


export const getStaticLotDataController = async (c: Context) => {
  const lotId = c.req.param('lotId');

  const lotData = await getStaticLotDataService(lotId!); 

  return c.json({ data: lotData }, 200);
}





