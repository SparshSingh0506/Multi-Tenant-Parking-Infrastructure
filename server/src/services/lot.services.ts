import { createInitialLotDetails, createTicket, getStaticLotDetails } from "@/repository/lot.repo.js";
import type { PostLotSchema, PostVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";
import { Ticket } from "@/models/lot.model.js";


export const postInitLotDataService = async (data: PostLotSchema) => {
  try {
    const result = await createInitialLotDetails(data);

    return result;
  }

  catch (error) {
    throw error;
  }
}

export const getStaticLotDataService = async (lotId: string) => {
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
    const ticket = await createTicket(data);

    return ticket;
  }

  catch (error) {
    throw error;
  }
}