import { createLotDetails } from "@/repository/lot.repo.js";
import type { PostLotSchema, PostVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";
import { Ticket } from "@/models/lot.model.js";


export const postLotService = async (data: PostLotSchema) => {
  try {
    const result = await createLotDetails(data);

    return result;
  }

  catch (error) {
    throw error;
  }
}

export const postVehicleEntryService = async (data: PostVehicleEntrySchema) => {
  const { lotId, plateId, categoryId, entryGateId } = data;

  const ticket = new Ticket({
    lotId,
    plateId,
    categoryId,
    entryGateId,
    entryTime: new Date().toISOString()
  });

  
}