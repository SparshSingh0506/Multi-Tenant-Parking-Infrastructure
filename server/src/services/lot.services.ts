import { createInitLotData, getStaticLotDetails } from "@/repository/lot.repo.js";
import type { InitLotDataSchema } from "@/zod-schemas/lot.schema.js";


export const postInitLotDataService = async (data: InitLotDataSchema) => {
  try {
    return await createInitLotData(data);
  }

  catch (error) {
    throw error; // TODO: global error handler
  }
}


export const getStaticLotDataService = async (lotId: string) => {
  try {
    return await getStaticLotDetails(lotId);
  }

  catch (error) {
    throw error;
  }
}



