import { createInitialLotDetails, createTicket, getStaticLotDetails } from "@/repository/lot.repo.js";
import type { PostLotSchema, PostVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";
import { Ticket } from "@/models/lot.model.js";



export const postLotService = async (data: PostLotSchema) => {
  try {
    const result = await createInitialLotDetails(data);

    return result;
  }

  catch (error) {
    throw error;
  }
}

export const getLotService = async (lotId: string) => {
    try {
    const result = await getStaticLotDetails(lotId);

    return result;
  }

  catch (error) {
    throw error;
  }
}

export const postVehicleEntryService = async (data: PostVehicleEntrySchema) => {
  try {
    const result = await createTicket(data);

    return result;
  }

  catch (error) {
    throw error;
  }
}