import { getStaticLotDataService, postInitLotDataService, postVehicleEntryService, postVehicleExitService } from "@/services/lot.services.js";
import type { InitLotDataSchema, VehicleEntrySchema, VehicleExitSchema } from "@/zod-schemas/lot.schema.js";
import type { Context } from "hono";


export const postInitLotDataController = async (c: Context) => {
  const body = await c.req.json() as InitLotDataSchema;

  const initLotData = await postInitLotDataService(body);

  return c.json({ data: initLotData }, 201);
}


export const getStaticLotDataController = async (c: Context) => {
  const lotId = c.req.param('lotId');

  if (!lotId) throw new Error("Lot ID is required");

  const lotData = await getStaticLotDataService(lotId);

  return c.json({ data: lotData }, 200);
}


export const postVehicleEntryController = async (c: Context) => { // create ticket
  const body = await c.req.json() as VehicleEntrySchema;
  const lotId = c.req.param('lotId');

  if (!lotId) throw new Error("Lot ID is required");

  const initTicket = await postVehicleEntryService(lotId, body);

  return c.json({ data: initTicket }, 201);
}


export const postVehicleExitController = async (c: Context) => { // complete ticket
  const body = await c.req.json() as VehicleExitSchema;

  const finalTicket = await postVehicleExitService(body);

  return c.json({ data: finalTicket }, 200);
}