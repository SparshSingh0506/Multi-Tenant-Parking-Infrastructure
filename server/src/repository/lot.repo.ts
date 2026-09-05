import { db } from "@/configs/db.config.js";
import type { PostLotSchema } from "@/zod-schemas/lot.schema.js";
import { gate, parkingLot, vehicleCategory, vehicleSlots as db_vehicleSlots } from "@/db/schemas/db.schema.js";

export const createLotDetails = async (data: PostLotSchema) => {
  const { name, gates, vehicleCategories, vehicleSlots} = data;

  const result = await db.transaction(async (tx) => {
    const [{id}] = await tx.insert(parkingLot).values({
      name
    }).returning();

    const gateResults = await tx.insert(gate).values(gates.map((gate) => ({
      name: gate.name,
      type: gate.type,
      parkingLotId: id
    }))).returning();

    const categoryResults = await tx.insert(vehicleCategory).values(vehicleCategories.map((ctg) => ({
      category: ctg.category,
      fare: ctg.fare.toFixed(2),
      parkingLotId: id
    }))).returning();

    const slotsResults = await tx.insert(db_vehicleSlots).values(vehicleSlots.map((slot) => ({
      name: slot.name,
      capacity: slot.capacity,
      parkingLotId: id
    }))).returning();

    return {
      name,
      gates: gateResults.map((gate) => ({
        id: gate.id,
        name: gate.name,
      })),
      vehicleCategories: categoryResults.map((category) => ({
        id: category.id,
        category: category.category,
        fare: category.fare,
      })),
      vehicleSlots: slotsResults.map((slot) => ({
        id: slot.id,
        name: slot.name,
        capacity: slot.capacity,
      })),
    };
  })
    
  return result;
}