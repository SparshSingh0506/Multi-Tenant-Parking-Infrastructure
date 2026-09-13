import { db } from "@/configs/db.config.js";
import { eq } from "drizzle-orm";
import type { InitLotDataSchema, VehicleEntrySchema, VehicleExitSchema } from "@/zod-schemas/lot.schema.js";
import { gate, parkingLot, vehicleCategory, slotsCategory as db_slotsCategories, ticket } from "@/db/schemas/db.schema.js";
import type { InitTicket } from "@/interfaces/ticket.interfaces.js";


export const createInitLotData = async (data: InitLotDataSchema) => {
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
      gates: gateResults,
      vehicleCategories: categoryResults,
      slotsCategories: slotsCategoriesResults,
    };
  })

  return result;
}


export const getStaticLotDetails = async (lotId: string) => {
  const lotResult = await db
    .select({
      id: parkingLot.id,
      name: parkingLot.name,
    })
    .from(parkingLot).where(eq(parkingLot.id, lotId));

  const gates = await db
    .select({
      id: gate.id,
      name: gate.name,
      type: gate.type
    })
    .from(gate).where(eq(gate.lotId, lotId));

  const vehicleCategories = await db
    .select({
      id: vehicleCategory.id,
      name: vehicleCategory.name,
      fare: vehicleCategory.fare
    })
    .from(vehicleCategory).where(eq(vehicleCategory.lotId, lotId));

  const slotsCategories = await db
    .select({
      id: db_slotsCategories.id,
      name: db_slotsCategories.name,
      capacity: db_slotsCategories.capacity
    })
    .from(db_slotsCategories).where(eq(db_slotsCategories.lotId, lotId));

  return {
    id: lotResult[0].id,
    name: lotResult[0].name,
    gates,
    vehicleCategories,
    slotsCategories
  };
}


export const createTicket = async (data: InitTicket) => {
  const { lotId, vehiclePlate, vehicleCategoryId, entryGateId } = data;

  const result = await db.transaction(async (tx) => {

    // TODO: implement live slot capacity check 

    const slotCapacity = {}; // only generate ticket if the lot has available capacity for the vehicle category

    if (slotCapacity === 0) throw new Error("No available slots for the selected vehicle category");

    const ticketResult = await tx.insert(ticket).values({
      lotId,
      vehiclePlate,
      vehicleCategoryId,
      entryGateId,
    }).returning();

    return ticketResult[0];
  });

  return result;
}


export const completeTicket = async (data: VehicleExitSchema) => {
  const { ticketId, exitGateId, amountPaid } = data;

  const result = await db
    .update(ticket).set({
      exitGateId,
      closedAt: new Date(),
      amountPaid: amountPaid.toFixed(2),
    })
    .where(eq(ticket.id, ticketId)).returning();

  return result[0];
}

// TODO: send actual data instead of the id's of the lot, vehicle category, and gate. 