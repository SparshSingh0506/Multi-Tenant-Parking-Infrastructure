import { db } from "@/configs/db.config.js";
import { eq } from "drizzle-orm";
import type { PostLotSchema, PostVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";
import { gate, parkingLot, vehicleCategory, slotsCategory as db_slotsCategories, ticket } from "@/db/schemas/db.schema.js";
import { id } from "zod/locales";

export const createInitialLotDetails = async (data: PostLotSchema) => {
  const { name, gates, vehicleCategories, slotsCategories } = data;

  const result = await db.transaction(async (tx) => {
    const [{ id }] = await tx.insert(parkingLot).values({
      name
    }).returning();

    const gateResults = await tx.insert(gate).values(gates.map(gate => ({
      name: gate.name,
      type: gate.type,
      lotId: id
    }))).returning();

    const categoryResults = await tx.insert(vehicleCategory).values(vehicleCategories.map(category => ({
      name: category.name,
      fare: category.fare.toFixed(2),
      lotId: id
    }))).returning();

    const slotsCategoriesResults = await tx.insert(db_slotsCategories).values(slotsCategories.map(slot => ({
      name: slot.name,
      capacity: slot.capacity,
      lotId: id
    }))).returning();

    return {
      id,
      name,
      
      gates: gateResults.map(gate => ({
        id: gate.id,
        name: gate.name,
        type: gate.type
      })),

      vehicleCategories: categoryResults.map(category => ({
        id: category.id,
        name: category.name,
        fare: category.fare,
      })),

      slotsCategories: slotsCategoriesResults.map(slot => ({
        id: slot.id,
        name: slot.name,
        capacity: slot.capacity,
      })),
    };
  })

  return result;
}


export const getStaticLotDetails = async (lotId: string) => {
  const lotResult = await
    db.select({
      id: parkingLot.id,
      name: parkingLot.name,
    })
    .from(parkingLot).where(eq(parkingLot.id, lotId));

  const gatesResult = await db.select({
    id: gate.id,
    name: gate.name,
    type: gate.type
  })
  .from(gate).where(eq(gate.lotId, lotId));

  const vehicleCategoriesResult = await db.select({
    id: vehicleCategory.id,
    name: vehicleCategory.name,
    fare: vehicleCategory.fare
  })
  .from(vehicleCategory).where(eq(vehicleCategory.lotId, lotId));
  
  const slotsCategoriesResult = await db.select({
    id: db_slotsCategories.id,
    name: db_slotsCategories.name,
    capacity: db_slotsCategories.capacity
  })
  .from(db_slotsCategories).where(eq(db_slotsCategories.lotId, lotId));


  return {
    id: lotResult[0].id,
    name: lotResult[0].name,

    gates: gatesResult.map(gate => ({
      id: gate.id,
      name: gate.name,
      type: gate.type
    })),

    vehicleCategories: vehicleCategoriesResult.map(category => ({
      id: category.id,
      name: category.name,
      fare: category.fare
    })),

    slotsCategories: slotsCategoriesResult.map(slot => ({
      id: slot.id,
      name: slot.name,
      capacity: slot.capacity
    }))
  }
};


export const createTicket = async (data: PostVehicleEntrySchema) => {
  const { lotId, vehiclePlate, vehicleCategoryId, slotCategoryId, entryGateId } = data;

  const result = await db.transaction(async (tx) => {
    const slotCapacity = {}; // only generate ticket if the lot has available capacity for the vehicle category

    if (slotCapacity == 0) throw new Error("No available slots for the selected vehicle category");

    const ticketResult = await tx.insert(ticket).values({
      lotId,
      vehiclePlate,
      vehicleCategoryId,
      entryGateId,
    }).returning();

    return ticketResult[0];
  })

  return result;
}