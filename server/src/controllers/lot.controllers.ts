import { getStaticLotDataService, postInitLotDataService, postVehicleEntryService } from "@/services/lot.services.js";
import type { PostLotSchema, PostVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";
import type { Context } from "hono";


export const postInitLotDataController = async (c: Context) => {
  const body = await c.req.json() as PostLotSchema;

  const data = await postInitLotDataService(body);

  return c.json({ data }, 201);
}


export const getStaticLotDataController = async (c: Context) => {
  const lotId = c.req.param('lotId');

  if (!lotId) throw new Error("Lot ID is required");

  const data = await getStaticLotDataService(lotId);

  return c.json({ data }, 200);
}


export const postVehicleEntryController = async (c: Context) => {
  const body = await c.req.json() as PostVehicleEntrySchema;

  const ticket = await postVehicleEntryService(body);

  return c.json({ data: ticket }, 201);
}