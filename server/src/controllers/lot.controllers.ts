import { getJoinTokenService, getLotOperatorsService, getStaticLotDataService, postCreateLotService, postJoinLotService } from "@/services/lot.services.js";
import type { CreateLotSchema, JoinLotSchema } from "@/zod-schemas/lot.schema.js";
import type { Context } from "hono";

const DUMMY_USER_ID = "USER"; //TODO: replace with actual user ID from auth middleware

export const postCreateLotController = async (c: Context) => {
  const body = await c.req.json() as CreateLotSchema;
  const userId = DUMMY_USER_ID;

  const { lotId, joinToken } = await postCreateLotService(userId, body);

  return c.json({ data: lotId, joinToken }, 201);
}


export const postJoinLotController = async (c: Context) => {
  const body = await c.req.json() as JoinLotSchema;
  const userId = DUMMY_USER_ID;

  await postJoinLotService(userId, body.joinToken);

  return c.status(204); 
}


export const getJoinTokenController = async (c: Context) => {
  // TODO: controller to retrieve the join token for a lot
  const lotId = c.req.param('lotId')!;

  const joinToken = await getJoinTokenService(lotId);

  return c.json({ data: joinToken }, 200);
}


export const getStaticLotDataController = async (c: Context) => {
  const lotId = c.req.param('lotId')!;

  const lotData = await getStaticLotDataService(lotId);

  return c.json({ data: lotData }, 200);
}


export const getLotOperatorsController = async (c: Context) => {
  const lotId = c.req.param('lotId');

  const operators = await getLotOperatorsService(lotId!);

  return c.json({ data: operators }, 200);
}




