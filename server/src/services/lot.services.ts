import {
  createInitLotData,
  getJoinTokenFromLotId,
  getLotIdFromJoinToken,
  getLotOperators,
  getStaticLotDetails,
  mapJoinTokenToLot,
  validateJoinToken
} from "@/repository/lot.repo.js";

import { setUserLotIdAndRole } from "@/repository/user.repo.js";
import { generateJoinToken } from "@/utils/join-token.utils.js";
import type { CreateLotSchema } from "@/zod-schemas/lot.schema.js";


export const postCreateLotService = async (userId: string, data: CreateLotSchema) => {
  const lotData = await createInitLotData(data);

  const lotId = lotData.id;

  await setUserLotIdAndRole(userId, lotId, "Manager");

  const joinToken = generateJoinToken();

  await mapJoinTokenToLot(lotId, joinToken);

  return {
    lotId,
    joinToken
  };
}


export const postJoinLotService = async (userId: string, joinToken: string) => {
  const lotId = await getLotIdFromJoinToken(joinToken);

  //TODO: first verify the join token is mapped to a lot and not expired 
  if (!(await validateJoinToken(joinToken))) {
    throw new Error("Invalid or expired join token");
  }

  await setUserLotIdAndRole(userId, lotId, "Operator");
  //TODO: [Provision] Maybe implement message queue to notify manager of join request and also let manager set how many operators can join the lot
}


export const getJoinTokenService = async (lotId: string) => {
  return await getJoinTokenFromLotId(lotId);
}


export const getStaticLotDataService = async (lotId: string) => {
  return await getStaticLotDetails(lotId);
}


export const getLotOperatorsService = async (lotId: string) => {
  return await getLotOperators(lotId);
}



