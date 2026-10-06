import { db } from "@/configs/db.config.js";

import { and, count, eq, isNull } from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";

import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js"; // InitTicketSchema (req body) + lotId (param) = InitTicket
// TODO: maybe make these zod schemas instead of an interface

import {
  gate,
  parkingLot,
  ticket,
  vehicleCategory
} from "@/db/schemas/db.schema.js";


const getAvailableLotCapacity = async (tx: any, lotId: string) => {
  const [lot] = await tx
    .select({
      capacity: parkingLot.capacity,
    })
    .from(parkingLot)
    .where(eq(parkingLot.id, lotId))
    .limit(1)
    .for("update");

  if (!lot) return 0;

  const [occupancy] = await tx
    .select({ count: count(ticket.id) })
    .from(ticket)
    .where(and(
      eq(ticket.lotId, lotId),
      isNull(ticket.closedAt)
    ));

  return lot.capacity - occupancy.count;
};


export const createTicket = async (data: InitTicket) => {
  const { lotId, vehiclePlate, vehicleCategoryId, entryGateId } = data;

  const result = await db.transaction(async (tx) => {
    const availableCapacity = await getAvailableLotCapacity(tx, lotId);

    if (availableCapacity <= 0) {
      throw new Error("No available parking capacity");
    }

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


export const completeTicket = async (data: CloseTicket) => {
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

export const getFinalTicket = async (ticketId: string) => {
  const entryGate = alias(gate, 'entry_gate');
  const exitGate = alias(gate, 'exit_gate');

  const result = await db.select({
    id: ticket.id,

    lot: parkingLot.name,

    vehiclePlate: ticket.vehiclePlate,

    vehicleCategory: vehicleCategory.category,
    vehicleCategoryFare: vehicleCategory.fare,

    entryGate: entryGate.name,
    exitGate: exitGate.name,

    closedAt: ticket.closedAt,
    amountPaid: ticket.amountPaid, // TODO: Might not be needed for MVP
  })
  .from(ticket)
  .innerJoin(parkingLot, eq(ticket.lotId, parkingLot.id))
  .innerJoin(vehicleCategory, eq(ticket.vehicleCategoryId, vehicleCategory.id))
  .innerJoin(entryGate, eq(ticket.entryGateId, entryGate.id))
  .innerJoin(exitGate, eq(ticket.exitGateId, exitGate.id))
  .where(eq(ticket.id, ticketId));

  return result[0];
}