import type { InitTicket } from "@/interfaces/ticket.interfaces.js";
import { completeTicket, createInitLotData, createTicket, getStaticLotDetails } from "@/repository/lot.repo.js";
import type { InitLotDataSchema, VehicleEntrySchema, VehicleExitSchema } from "@/zod-schemas/lot.schema.js";


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



export const postVehicleEntryService = async (lotId: string, data: VehicleEntrySchema) => {
  try {
    const initTicket: InitTicket = {
      lotId,
      vehiclePlate: data.vehiclePlate,
      vehicleCategoryId: data.vehicleCategoryId,
      entryGateId: data.entryGateId
    };

    return await createTicket(initTicket);
  }

  catch (error) {
    throw error;
  }
}


export const postVehicleExitService = async (data: VehicleExitSchema) => {
  try {
    return await completeTicket(data);
  }

  catch (error) {
    throw error;
  }
}

